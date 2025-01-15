"use client";

import React, {useState} from "react";
import Link from "next/link";
import ProfileCard from "@/components/friend/ProfileCard";
import {ExFriendList} from "@/types/diary";
import Pagination from "@/components/friend/Pagination";

interface ExchangeFriendListProps {
    friends: ExFriendList[];
}

const ExchangeFriendList: React.FC<ExchangeFriendListProps> = ({friends}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 6; // 한 페이지에 몇 명 표시할지
    const totalItems = friends.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const exFriendList = friends.slice(startIndex, endIndex);
    return (
        <div className="h-full flex flex-col mt-5">
            <ul className="flex flex-col gap-4 flex-1">
                {exFriendList.map(friend => (
                    <li
                        key={friend.id}
                        className="p-4 bg-white rounded-lg shadow-sm"
                    >
                        <Link
                            href={`/exchange/${friend.id}/list`}
                            className="w-full flex items-center justify-between"
                        >
                            <ProfileCard
                                profileImage={friend.friend_profile_img ?? "/icons/ProfileExample.png"}
                                name={friend.friend_nickname}
                                statusMessage={`id: ${friend.id}`}
                            />
                            <div className="text-right space-y-1">
                                <p>마지막 교환 날짜: {friend.last_ex_date ? new Date(friend.last_ex_date).toLocaleDateString() : "없음"}</p>
                                <p>교환한 일기 수: {friend.ex_diary_cnt}</p>
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
