"use client";

import React, { useState } from "react";
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
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "김철수",
    statusMessage: "반갑습니다",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "이영희",
    statusMessage: "오늘도 화이팅!",
    profileImage: "https://via.placeholder.com/50",
  },
];

const FriendList = () => {
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
    <div className="flex flex-col gap-4">
      {currentFriends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg"
        >
          <ProfileCard
            profileImage={friend.profileImage}
            name={friend.name}
            statusMessage={friend.statusMessage}
          />
          <div className="text-right space-x-2">
            <button
              className="px-4 py-2 bg-[#E7CCA9] rounded-full hover:bg-[#C9A782] font-semibold"
              onClick={() => alert(`${friend.name} 님과 교환일기 보기`)}
            >
              교환일기
            </button>
            <button
              className="px-4 py-2 bg-[#E7CCA9] rounded-full hover:bg-[#C9A782] font-semibold"
              onClick={() => alert(`${friend.name} 님을 삭제`)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 text-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default FriendList;
