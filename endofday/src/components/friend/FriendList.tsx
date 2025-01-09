"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend, fetchFriends } from "@/api/friendApi";
import ProfileCard from "./ProfileCard";
import Pagination from "./Pagination";

interface FriendItem {
  id: number;
  user_id1: number;
  user_id2: number;
  is_accept: boolean;
  ex_diary_cnt: number;
  last_ex_date: string;
  created_at: string;
}

const FriendList = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  const deleteFriendMutation = useMutation({
    mutationFn: (friendId: number) => deleteFriend(friendId),
    onSuccess: () => {
      alert("친구가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: () => {
      alert("친구 삭제 중 오류가 발생했습니다.");
    },
  });

  // 그리고 나서 조건문(early return)을 둡니다.
  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>친구 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  const friendList: FriendItem[] = data?.friends || [];

  // 페이지네이션 로직
  const pageSize = 5;
  const totalPages = Math.ceil(friendList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentFriends = friendList.slice(startIndex, endIndex);

  return (
    <div>
      {currentFriends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between border-b py-2"
        >
          <ProfileCard
            profileImage="https://via.placeholder.com/50"
            name={`친구ID: ${friend.user_id2}`}
            statusMessage={`is_accept: ${friend.is_accept}`}
          />
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() =>
                alert(`교환일기 보기 (friendId = ${friend.id})`)
              }
            >
              교환일기
            </button>
            <button
              className="px-3 py-1 bg-red-100 rounded hover:bg-red-200"
              onClick={() => deleteFriendMutation.mutate(friend.id)}
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
