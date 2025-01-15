"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import FriendList from "@/components/friend/FriendList";
import FriendRequests from "@/components/friend/FriendRequests";

const FriendPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"myFriends" | "requests">("myFriends");

    const handleSearchClick = () => {
        router.push("/friend/search");
    };

    return (
        <div className="mt-8 h-full flex flex-col">
            <h2 className="text-center text-2xl font-bold mb-4">친구목록</h2>

            <div className="flex gap-2 mb-4 justify-center">
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === "myFriends" ? "bg-gray-200 font-bold" : ""}`}
                    onClick={() => setActiveTab("myFriends")}
                >
                    내 친구
                </button>
                <button
                    className={`px-4 py-2 rounded-full ${activeTab === "requests" ? "bg-gray-200 font-bold" : ""}`}
                    onClick={() => setActiveTab("requests")}
                >
                    친구 신청
                </button>
            </div>

            <div className="flex flex-col gap-4 flex-1">{activeTab === "myFriends" ? <FriendList /> : <FriendRequests />}</div>

            {activeTab === "myFriends" && (
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleSearchClick}
                        className="p-4 bg-white rounded-full hover:shadow"
                    >
                        <Image
                            src="/icons/search.svg"
                            alt="검색 아이콘"
                            width={40}
                            height={40}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FriendPage;
