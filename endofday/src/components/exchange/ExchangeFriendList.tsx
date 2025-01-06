"use client";

import React, {useState} from "react";
import Link from "next/link";
import ProfileCard from "@/components/friend/ProfileCard";
import Pagination from "@/components/friend/Pagination";

interface Friend {
    id: number;
    name: string;
    statusMessage: string;
    profileImage: string;
}

const mockFriends: Friend[] = [
    {
        id: 1,
        name: "홍길동",
        statusMessage: "안녕하세요!",
        profileImage: "",
    },
    {
        id: 2,
        name: "김철수",
        statusMessage: "반갑습니다",
        profileImage: "",
    },
    {
        id: 3,
        name: "이영희",
        statusMessage: "오늘도 화이팅!",
        profileImage: "",
    },
];

const ExchangeFriendList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 2; // 한 페이지에 몇명 표시할건지
    const totalItems = mockFriends.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFriends = mockFriends.slice(startIndex, endIndex);

    return (
        <div className="h-full flex flex-col">
            <ul className="flex flex-col gap-4 flex-1">
                {currentFriends.map(friend => (
                    <li
                        key={friend.id}
                        className="p-4 bg-white rounded-lg shadow-sm"
                    >
                        <Link
                            href="/"
                            className="w-full flex items-center justify-between "
                        >
                            <ProfileCard
                                profileImage={friend.profileImage}
                                name={friend.name}
                                statusMessage={friend.statusMessage}
                            />
                            <div className="text-right space-x-2">
                                <p>마지막 교환 날짜 : 2024-12-20</p>
                                <p>교환한 일기 수 : 3</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-4 text-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ExchangeFriendList;
