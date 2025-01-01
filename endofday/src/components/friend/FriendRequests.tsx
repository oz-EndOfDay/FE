"use client";

import React, { useState } from "react";
import ProfileCard from "@/components/friend/ProfileCard";
import Pagination from "@/components/friend/Pagination";

interface Request {
  id: number;
  name: string;
  statusMessage: string;
  profileImage: string;
}

const mockRequests: Request[] = [
  {
    id: 1,
    name: "나를친구추가한사람1",
    statusMessage: "친구해주세요~",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "나를친구추가한사람2",
    statusMessage: "안녕?",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "나를친구추가한사람3",
    statusMessage: "우리친구해요!",
    profileImage: "https://via.placeholder.com/50",
  },
  // ... 필요 시 추가
];

const FriendRequests = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const totalItems = mockRequests.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRequests = mockRequests.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4">
      {currentRequests.map((req) => (
        <div
          key={req.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg"
        >
          <ProfileCard
            profileImage={req.profileImage}
            name={req.name}
            statusMessage={req.statusMessage}
          />
          <div>
            <button
              className="px-4 py-2 bg-[#E7CCA9] rounded-full hover:bg-[#C9A782] font-semibold"
              onClick={() => alert(`${req.name} 님의 친구신청 수락`)}
            >
              수락
            </button>
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
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

export default FriendRequests;
