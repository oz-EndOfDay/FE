"use client";

import React, { useState } from "react";
import ProfileCard from "@/components/friend/ProfileCard";
import Pagination from "@/components/friend/Pagination";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  statusMessage: string;
  profileImage: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "검색결과유저1",
    statusMessage: "상태메시지1",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "검색결과유저2",
    statusMessage: "상태메시지2",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "검색결과유저3",
    statusMessage: "상태메시지3",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "검색결과유저4",
    statusMessage: "상태메시지4",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "검색결과유저5",
    statusMessage: "상태메시지5",
    profileImage: "https://via.placeholder.com/50",
  },
];

const FriendSearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 2;
  const totalItems = mockUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    alert(`검색어 "${searchText}"로 검색! (추후 API 연동)`);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = mockUsers.slice(startIndex, endIndex);

  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold mb-4">친구 찾기</h2>

      <div className="flex justify-center mb-4">
        <form onSubmit={handleFormSubmit} className="relative w-1/2">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="이메일과 닉네임으로 친구를 검색해보세요"
            className="px-4 py-2 pr-10 rounded-full focus:outline-none w-full"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={20}
              height={20}
            />
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg"
          >
            <ProfileCard
              profileImage={user.profileImage}
              name={user.name}
              statusMessage={user.statusMessage}
            />
            <div>
              <button
                className="px-4 py-2 bg-[#E7CCA9] rounded-full hover:bg-[#C9A782] font-semibold"
                onClick={() => alert(`${user.name} 님에게 친구추가 요청!`)}
              >
                친구추가
              </button>
            </div>
          </div>
        ))}

        <div className="mt-4 text-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendSearchPage;
