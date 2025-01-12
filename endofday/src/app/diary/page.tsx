"use client";
import {useState} from "react";
import Link from "next/link";
import Pagination from "@/components/friend/Pagination";
import Select from "@/components/ui/Select";
import SearchInput from "@/components/ui/SearchInput";
import Heading from "@/components/ui/Heading";
import WriteButton from "@/components/diary/WriteButton";
import DiaryItem from "@/components/diary/DiaryItem";
import {useFetchDiary} from "@/hooks/useDiary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {DiaryListEntry} from "@/types/diary";

const DiaryPage = () => {
    // 선택된 값 관리 (년도, 월, 검색어, 페이지)
    const [year, setYear] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [searchWord, setSearchWord] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 6;

    // api 호출
    const {data, isPending} = useFetchDiary({
        page: currentPage,
        size: pageSize,
        year: year ? parseInt(year) : undefined,
        month: month ? parseInt(month) : undefined,
        word: searchWord,
    });

    // 로딩
    if (isPending) {
        return <LoadingSpinner />;
    }

    // 년도, 월 선택
    const handleYearChange = (value: string) => {
        setYear(value);
        setCurrentPage(1); // 필터 변경 시 페이지 초기화
    };
    const handleMonthChange = (value: string) => {
        setMonth(value);
        setCurrentPage(1); // 필터 변경 시 페이지 초기화
    };

    const yearOptions = [
        {value: "년도", label: "년도"},
        {value: "2025", label: "2025"},
        {value: "2024", label: "2024"},
    ];
    const monthOptions = [
        {value: "월", label: "월"}, // 기본값
        ...Array.from({length: 12}, (_, i) => ({
            value: String(12 - i), // 12부터 1까지
            label: String(12 - i),
        })),
    ];

    // 검색
    const handleSearchChange = (value: string) => {
        setSearchWord(value);
        setCurrentPage(1);
    };

    // 페이지네이션
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center below540:flex-col-reverse below540:items-end">
                <SearchInput
                    placeholder="제목으로 검색해 보세요"
                    value={searchWord}
                    onChange={value => setSearchWord(value)}
                    className="below540:max-w-full"
                    onSearch={() => handleSearchChange(searchWord)}
                />
                <div className="flex">
                    <Select
                        options={yearOptions}
                        onChange={handleYearChange}
                        value={year}
                    />
                    <Select
                        options={monthOptions}
                        onChange={handleMonthChange}
                        value={month}
                    />
                </div>
            </div>
            <div className="pt-[3rem] flex-1">
                <Heading tag="h2">
                    {year || "년도"} - {month || "월"}
                </Heading>
                <ul className="flex flex-col gap-4 pt-[1rem]">
                    {data && data.items && data.items.length > 0 ? (
                        data.items.map((item: DiaryListEntry) => {
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
                    totalPages={data?.pages ?? 1} // page가 undefined면 기본값 1
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
