"use client";

import React, {useState} from "react";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import WriteButton from "@/components/diary/WriteButton";
import DiaryItem from "@/components/diary/DiaryItem";
import {getFriendData} from "@/utils/getFreindData";
import Pagination from "@/components/friend/Pagination";
import {getExTurn} from "@/utils/getExTurn";
import {useParams} from "next/navigation";
import {useExFetchDiary, useExGetFriend} from "@/hooks/useExDiary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const ExchangeDiaryList = () => {
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState<number>(1);

    // url 파라미터 값 갖고오기
    const params = useParams();
    const id = params?.friendId;
    const friendId = Number(id);

    // 해당친구와의 리스트 조회
    const {data: diaryList, isPending, isError} = useExFetchDiary(friendId);
    const {data: friendList} = useExGetFriend();
    console.log(diaryList, "다이어리리스트 너누군데");

    const pageSize = 6;
    const totalItems = diaryList?.diaries?.length ?? 0;
    const totalPages = diaryList?.diaries?.length ? Math.ceil(totalItems / pageSize) : 0;
    console.log(totalPages)
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const exDiaryList = diaryList?.diaries?.slice(startIndex, endIndex) ?? [];

    // 친구 데이터
    const {ex_diary_cnt = 0, friend_nickname = "알 수 없음"} = getFriendData(friendList?.friends ?? [], friendId) ?? {};

    const turn = getExTurn(diaryList, ex_diary_cnt);

    // 로딩
    if (isPending) {
        return <LoadingSpinner />;
    }
    // 에러
    if (isError) {
        return <div>일기를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="pt-[1rem] flex-1">
                <div className="text-center">
                    <Heading tag="h2">{friend_nickname} 님과의 소중한 교환일기</Heading>
                    <Heading
                        tag="p"
                        className="mt-2"
                    >
                        {ex_diary_cnt}개의 교환일기가 있습니다.
                    </Heading>
                    {ex_diary_cnt > 0 &&
                        (turn === "내 차례" ? (
                            <Heading
                                tag="p"
                                className="mt-2 text-green-600"
                            >
                                ✅ 내 차례입니다! 작성 완료 후 수정이 불가능합니다.
                            </Heading>
                        ) : (
                            <Heading
                                tag="p"
                                className="mt-2 text-blue-600"
                            >
                                📖 친구의 차례입니다!
                            </Heading>
                        ))}
                </div>
                <ul className="flex flex-col gap-4 pt-[3rem]">
                    {exDiaryList && exDiaryList.length > 0 ? (
                        exDiaryList.map(item => (
                            <li key={item.id}>
                                <Link href={`/exchange/${friendId}/${item.id}`}>
                                    <DiaryItem
                                        data={item}
                                        type="exchange"
                                    />
                                </Link>
                            </li>
                        ))
                    ) : (
                        <div className="text-center">
                            친구님과 작성하신 교환일기가 없습니다.
                            <br />
                            지금 {friend_nickname}님과 교환일기 작성하러 가볼까요?
                        </div>
                    )}
                </ul>
            </div>
            {totalPages > 0 && (
                <div className="text-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {turn === "내 차례" ? (
                <Link href={`/exchange/${friendId}/write`}>
                    <WriteButton />
                </Link>
            ) : (
                <WriteButton disabled={true} />
            )}
        </div>
    );
};

export default ExchangeDiaryList;
