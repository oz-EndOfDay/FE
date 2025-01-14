"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Pagination from "./Pagination";
import { fetchReceivedRequests, acceptFriendRequest } from "@/api/friendApi";

interface RequestItem {
  id: number;
  friend_nickname: string | null;
  friend_profile_img: string | null;
  created_at: string;
}

const FriendRequests = () => {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);

    fetchReceivedRequests()
      .then((data) => {
        setRequests(data.sent_requests);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("오류가 발생했습니다.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAccept = async (friendId: number) => {
    try {
      await acceptFriendRequest(friendId);
      alert("친구 요청을 수락했습니다.");
      setRequests((prev) => prev.filter((r) => r.id !== friendId));
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Unauthorized") {
        alert("로그인이 필요합니다!");
      } else {
        alert("친구 요청 수락에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) {
    console.error("FriendRequests error:", error);
    return <div>친구 요청을 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (requests.length === 0) {
    return <div className="text-center p-4">아직 받은 친구 요청이 없습니다.</div>;
  }

  const totalPages = Math.ceil(requests.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentRequests = requests.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {currentRequests.map((req) => (
        <div
          key={req.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg mb-4"
        >
          <ProfileCard
            profileImage={req.friend_profile_img || ""}
            name={req.friend_nickname || "유저"}
            statusMessage={`id: ${req.id}`}
          />
          <button
            className="px-3 py-1 bg-[#E7CCA9] rounded-full hover:bg-[#D1B696] transition-colors duration-200"
            onClick={() => handleAccept(req.id)}
          >
            수락
          </button>
        </div>
      ))}

      <div className="mt-4 text-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default FriendRequests;
