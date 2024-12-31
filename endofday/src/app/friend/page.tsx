"use client";

import React, { useState } from "react";
import FriendList from "@/components/friend/FriendList";
import FriendRequests from "@/components/friend/FriendRequests";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FriendPage = () => {
  const [activeTab, setActiveTab] = useState<"myFriends" | "requests">("myFriends");
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/friend/search");
  };

  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold mb-4">친구목록</h2>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "myFriends" ? "bg-gray-200 font-bold" : ""
          }`}
          onClick={() => setActiveTab("myFriends")}
        >
          내 친구
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "requests" ? "bg-gray-200 font-bold" : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          친구 신청
        </button>
      </div>

      <div className="p-4">
        {activeTab === "myFriends" ? <FriendList /> : <FriendRequests />}
      </div>

      {activeTab === "myFriends" && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleSearchClick}
            className="p-4 bg-white rounded-full"
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
