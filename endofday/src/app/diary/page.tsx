"use client";
import {useState} from "react";
import Link from "next/link";
import {DiaryListEntry} from "@/types/diary";
import Pagination from "@/components/friend/Pagination";
import Select from "@/components/ui/Select";
import SearchInput from "@/components/ui/SearchInput";
import Heading from "@/components/ui/Heading";
import WriteButton from "@/components/diary/WriteButton";
import DiaryItem from "@/components/diary/DiaryItem";

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

const DiaryPage = () => {
    // select
    const [value, setValue] = useState("년도");
    const [value2, setValue2] = useState("월");
    const handleSelectChange = (value: string) => {
        setValue(value);
    };
    const handleSelectChange2 = (value2: string) => {
        setValue2(value2);
    };
    const options = [
        {value: "년도", label: "년도"},
        {value: "2024", label: "2024"},
        {value: "2023", label: "2023"},
    ];
    const options2 = [
        {value: "월", label: "월"},
        {value: "12", label: "12"},
        {value: "11", label: "11"},
        {value: "10", label: "10"},
        {value: "9", label: "9"},
        {value: "8", label: "8"},
    ];

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
            <div className="flex items-center below540:flex-col-reverse below540:items-end">
                <SearchInput
                    placeholder="제목으로 검색해 보세요"
                    className="below540:max-w-full"
                />
                <div className="flex">
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={value}
                    />
                    <Select
                        options={options2}
                        onChange={handleSelectChange2}
                        value={value2}
                    />
                </div>
            </div>
            <div className="pt-[3rem] flex-1">
                <Heading tag="h2">
                    {value}-{value2}
                </Heading>
                <ul className="flex flex-col gap-4 pt-[1rem]">
                    {diaryList ? (
                        diaryList.map(item => {
                            return (
                                <li key={item.id}>
                                    <Link href={`/diary/${item.id}`}>
                                        <DiaryItem data={item} />
                                    </Link>
                                </li>
                            );
                        })
                    ) : (
                        <div>작성하신 일기가 없습니다.</div>
                    )}
                </ul>
            </div>
            <div className="mt-4 text-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <Link href="/diary/write">
                <WriteButton />
            </Link>
        </div>
    );
};

export default DiaryPage;
