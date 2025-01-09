"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchReceivedRequests,
  acceptFriendRequest,
} from "@/api/friendApi";
import ProfileCard from "./ProfileCard";
import Pagination from "./Pagination";

interface RequestItem {
  id: number;
  user_id1: number;
  user_id2: number;
  created_at: string;
}

const FriendRequests = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: receivedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["receivedRequests"],
    queryFn: fetchReceivedRequests,
  });

  // PATCH /friends/{friend_id}
  const acceptRequestMutation = useMutation({
    mutationFn: (friendId: number) => acceptFriendRequest(friendId),
    onSuccess: () => {
      alert("친구 요청을 수락했습니다.");
      // **변경**: invalidateQueries -> 객체
      queryClient.invalidateQueries({ queryKey: ["receivedRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: () => {
      alert("친구 요청 수락에 실패했습니다.");
    },
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>친구 요청을 불러오는 중 오류가 발생했습니다.</div>;

  // 응답 예시: { sent_requests: RequestItem[] }
  const requests: RequestItem[] = receivedData?.sent_requests || [];

  const totalPages = Math.ceil(requests.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentRequests = requests.slice(startIndex, endIndex);

  return (
    <div>
      {currentRequests.map((req) => (
        <div
          key={req.id}
          className="flex items-center justify-between border-b py-2"
        >
          <ProfileCard
            profileImage="https://via.placeholder.com/50"
            name={`유저: ${req.user_id1}`}
            statusMessage={`생성일: ${req.created_at}`}
          />
          <div>
            <button
              className="px-3 py-1 bg-green-100 rounded hover:bg-green-200"
              onClick={() => acceptRequestMutation.mutate(req.id)}
            >
              수락
            </button>
          </div>
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
