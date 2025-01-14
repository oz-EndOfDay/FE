"use client";

import React from "react";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import WriteButton from "@/components/diary/WriteButton";
import DiaryItem from "@/components/diary/DiaryItem";
// import Pagination from "@/components/friend/Pagination";
import {useParams} from "next/navigation";
import {useExFetchDiary} from "@/hooks/useExDiary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const ExchangeDiaryList = () => {
    // url 파라미터 값 갖고오기
    const params = useParams();
    const id = params?.friendId;
    const friendId = Number(id);
    console.log(friendId, "id");
    // 해당친구와의 리스트 조회
    const {data, isPending, isError} = useExFetchDiary(friendId);

    // 로딩
    if (isPending) {
        return <LoadingSpinner />;
    }
    // 에러
    if (isError) {
        return <div>일기를 찾을 수 없습니다.</div>;
    }
    console.log(data);
    return (
        <div className="h-full flex flex-col">
            <div className="pt-[1rem] flex-1">
                <div className="text-center">
                    <Heading tag="h2">친구이름 님과의 소중한 교환일기</Heading>
                    <Heading
                        tag="p"
                        className="mt-1"
                    >
                        5개의 교환일기가 있습니다.
                    </Heading>
                    <Heading
                        tag="p"
                        className="mt-1"
                    >
                        현재는 친구의 차례입니다.
                    </Heading>
                    <Heading
                        tag="p"
                        className="mt-1"
                    >
                        현재는 내 차례입니다.
                    </Heading>
                </div>
                <ul className="flex flex-col gap-4 pt-[3rem]">
                    {data && data.diaries && data.diaries.length > 0 ? (
                        data.diaries.map(item => (
                            <li key={item.id}>
                                <Link href={`/exchange/${item.id}`}>
                                    <DiaryItem
                                        data={item}
                                        type="exchange"
                                    />
                                </Link>
                            </li>
                        ))
                    ) : (
                        <div>친구님과 작성하신 교환일기가 없습니다.</div>
                    )}
                </ul>
            </div>
            {/* <div className="text-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div> */}

            {/* 비활성화 */}
            {/* <WriteButton disabled={true} /> */}
            {/* 활성화 */}
            <Link href="/exchange/write">
                <WriteButton />
            </Link>
        </div>
    );
};

export default ExchangeDiaryList;
