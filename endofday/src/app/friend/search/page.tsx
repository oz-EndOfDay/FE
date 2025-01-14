"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addFriend } from "@/api/friendApi";
import { searchUsers, SearchedUser } from "@/api/searchApi";
import SearchInput from "@/components/ui/SearchInput";
import Pagination from "@/components/friend/Pagination";
import ProfileCard from "@/components/friend/ProfileCard";

const FriendSearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<SearchedUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 친구추가 mutation
  const addFriendMut = useMutation({
    mutationFn: (userId: number) => addFriend(userId),
    onSuccess: () => {
      alert("친구 요청을 보냈습니다!");
    },
    onError: (err: any) => {
      if (err instanceof Error && err.message.includes("Unauthorized")) {
        alert("로그인이 필요합니다.");
      } else {
        alert(`친구 신청에 실패했습니다. ${err.message}`);
      }
    },
  });

  // 검색
  const handleSearch = async () => {
    try {
      const data = await searchUsers(searchText);
      setResults(data);
      setCurrentPage(1);
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("Unauthorized")) {
        alert("로그인이 필요합니다.");
      } else {
        alert(`검색 오류가 발생했습니다. ${err.message}`);
      }
    }
  };

  // 페이지네이션
  const pageSize = 5;
  const totalItems = results.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = results.slice(startIndex, startIndex + pageSize);

  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold mb-4">친구 찾기</h2>

      <SearchInput
        placeholder="닉네임/이메일 검색"
        value={searchText}
        onChange={(val) => setSearchText(val)}
        onSearch={handleSearch}
        className="mb-4"
      />

      <div className="flex flex-col gap-4 px-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg"
          >
            <ProfileCard
              profileImage="" // 필요 시
              name={user.nickname}
              statusMessage={`이메일: ${user.email}`}
            />
            <button
              className="px-4 py-2 bg-[#E7CCA9] rounded-full hover:bg-[#C9A782] font-semibold"
              onClick={() => addFriendMut.mutate(user.id)}
            >
              친구추가
            </button>
          </div>
        ))}
        <div className="mt-4 text-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendSearchPage;
