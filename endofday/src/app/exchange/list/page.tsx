"use client";

import React, {useState} from "react";
import Link from "next/link";
import {DiaryListEntry} from "@/types/diary";
import Heading from "@/components/ui/Heading";
import WriteButton from "@/components/diary/WriteButton";
import DiaryItem from "@/components/diary/DiaryItem";
import Pagination from "@/components/friend/Pagination";

// 더미데이터
const diaryEntries: DiaryListEntry[] = [
    {
        id: 1,
        title: "12월 25일 일기",
        write_date: "2024-12-25",
        content: "오늘은 고기를 먹었다...",
    },
    {
        id: 2,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.",
    },
    {
        id: 3,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.",
    },
    {
        id: 4,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.",
    },
    {
        id: 5,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.",
    },
    {
        id: 6,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.",
    },
    {
        id: 7,
        title: "12월 26일 일기",
        write_date: "2024-12-26",
        content: "오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.오늘은 산책을 했다.",
    },
];

const ExchangeDiaryList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 6;
    const totalItems = diaryEntries.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const diaryList = diaryEntries.slice(startIndex, endIndex);

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
                    {diaryList.map(item => {
                        return (
                            <li key={item.id}>
                                <Link href={`/exchange/${item.id}`}>
                                    <DiaryItem
                                        data={item}
                                        type="exchange"
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="text-center mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

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
