"use client";

import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ProfileCard from "./ProfileCard";
import { fetchFriends, deleteFriend } from "@/api/friendApi";

interface FriendItem {
  id: number;
  is_accept: boolean;
  ex_diary_cnt: number;
  last_ex_date: string | null;
  created_at: string;
  friend_nickname: string | null;
  friend_profile_img: string | null;
}

const FriendList = () => {
  const [friends, setFriends] = useState<FriendItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchFriends()
      .then((data: any) => {
        setFriends(data?.friends || []);
      })
      .catch((err) => {
        setError(err.message || "오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (friendId: number) => {
    try {
      await deleteFriend(friendId);
      alert("친구가 삭제되었습니다.");
      setFriends((prev) => prev.filter((f) => f.id !== friendId));
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        alert("로그인이 필요합니다!");
      } else {
        alert("친구 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) {
    console.error("FriendList error:", error);
    return <div>친구 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (friends.length === 0) {
    return <div className="text-center p-4">친구가 없습니다.</div>;
  }

  const pageSize = 5;
  const totalPages = Math.ceil(friends.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentFriends = friends.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {currentFriends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg"
        >
          <ProfileCard
            profileImage={friend.friend_profile_img || ""}
            name={friend.friend_nickname || "친구"}
            statusMessage={`id: ${friend.id}`}
          />
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-[#E7CCA9] rounded-full hover:bg-[#D1B696] transition-colors duration-200"
              onClick={() => alert(`교환일기 보기 (friendId = ${friend.id})`)}
            >
              교환일기
            </button>
            <button
              className="px-3 py-1 bg-[#E7CCA9] rounded-full hover:bg-[#D1B696] transition-colors duration-200"
              onClick={() => handleDelete(friend.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default FriendList;
