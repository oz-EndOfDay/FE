"use client";

import React, {useState} from "react";
import Link from "next/link";
import ProfileCard from "@/components/friend/ProfileCard";
import {ExFriendList} from "@/types/diary";

interface ExchangeFriendListProps {
    friends: ExFriendList[];
}

const ExchangeFriendList: React.FC<ExchangeFriendListProps> = ({friends}) => {
    return (
        <div className="h-full flex flex-col">
            <ul className="flex flex-col gap-4 flex-1">
                {friends.map(friend => (
                    <li
                        key={friend.id}
                        className="p-4 bg-white rounded-lg shadow-sm"
                    >
                        <Link
                            href="/"
                            className="w-full flex items-center justify-between"
                        >
                            <ProfileCard
                                profileImage={friend.friend_profile_img ?? "/default-profile.png"}
                                name={friend.friend_nickname}
                                statusMessage={`상태메세지`}
                            />
                            <div className="text-right space-y-1">
                                <p>마지막 교환 날짜: {friend.last_ex_date ? new Date(friend.last_ex_date).toLocaleDateString() : "없음"}</p>
                                <p>교환한 일기 수: {friend.ex_diary_cnt}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* <div className="mt-4 text-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div> */}
        </div>
    );
};

export default ExchangeFriendList;
