"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import FriendList from "@/components/friend/FriendList";
import FriendRequests from "@/components/friend/FriendRequests";
import SmallButton from "@/components/ui/SmallButton";

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
                <div className="fixed md:bottom-5 md:right-5 bottom-[6rem] right-[2rem] animate-bounceY">
                    <SmallButton
                        onClick={handleSearchClick}
                        variant="icon"
                        className="bg-white w-[3.5rem] h-[3.5rem] md:w-[5rem] md:h-[5rem] border border-lightgray shadow-md rounded-full !static !top-0 !right-0 flex justify-center items-center disabled:bg-gray disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="relative w-[2rem] h-[2rem]">
                            <Image
                                src="/icons/search.svg"
                                alt="검색"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </SmallButton>
                </div>
            )}
        </div>
    );
};

export default FriendPage;
