"use client";
import React, {useEffect, useState} from "react";
import SmallButton from "@/components/ui/SmallButton";
import {fetchDeletedDiaries, handleRestore} from "@/api/fetchDeletedDiary";
import LoadingSpinner from "./LoadingSpinner";

interface Diary {
    id: number;
    title: string;
    write_date: string;
    content: string;
}

export const DiaryRemoveTable = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);

    // 컴포넌트가 마운트될 때 API 호출

    useEffect(() => {
        const loadDiaries = async () => {
            const data = await fetchDeletedDiaries();
            if (data) {
                setDiaries(data);
            }
        };

        loadDiaries();
    }, []);

    if (!diaries) {
        return <LoadingSpinner />;
    }
    const completedRestore = async (diary_id: number) => {
        try {
            await handleRestore(diary_id); // 복구 함수 호출

            // 복구 완료 후 메시지 상태 업데이트
            alert("일기가 복구되었습니다.");

            // 일정 시간 후 메시지 제거 (선택 사항)
            setTimeout(() => {
                alert(null);
            }, 2000); // 3초 후 메시지 사라짐

            // 페이지 새로 고침
            window.location.reload();
        } catch (error) {
            console.error("복구 실패:", error);
            alert("일기 복구에 실패했습니다."); // 실패 메시지 표시
        }
    };

    return (
        <div className=" bg-white p-5 w-full shadow-md rounded-md ">
            {diaries.length === 0 ? (
                <div className="p-4 text-center text-gray-500">휴지통이 비었습니다.</div>
            ) : (
                <table className="w-full border-separate border-spacing-y-3">
                    <thead className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-300">
                        <tr>
                            <th className="p-1">No</th>
                            <th className="min-w-16">제목</th>
                            <th className="min-w-16">내용</th>
                            <th className="md:w-36 min-w-16 ">날짜</th>
                            <th className="min-w-16">복구</th>
                        </tr>
                    </thead>

                    <tbody>
                        {diaries.map((diary, index) => (
                            <tr
                                key={diary.id}
                                className="w-full"
                            >
                                <td className="text-center p-1">{index + 1}</td>
                                <td className=" p-2 font-bold">{diary.title}</td>
                                <td className="text-ellipsis line-clamp-2 px-2 md:mt-2 mt-5">{diary.content.replace(/<[^>]*>/g, "")}</td>
                                <td className="text-center">{diary.write_date}</td>
                                <td className="text-center">
                                    <SmallButton
                                        className="p-2"
                                        type="button"
                                        variant="sand"
                                        onClick={() => completedRestore(diary.id)}
                                    >
                                        복구
                                    </SmallButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
