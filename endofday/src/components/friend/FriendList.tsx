"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend, fetchFriends } from "@/api/friendApi";
import ProfileCard from "./ProfileCard";
import Pagination from "./Pagination";

interface FriendItem {
  id: number;
  is_accept: boolean;
  ex_diary_cnt: number;
  last_ex_date: string;
  created_at: string;
  // API 예시에 따르면: "user1_nickname", "user2_nickname" 있을 수 있음
  user1_nickname?: string;
  user2_nickname?: string;
}

const FriendList = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = React.useState(1);

  // 친구 목록 조회
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  // 친구 삭제
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

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>친구 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

  // data 구조: { friends: FriendItem[] }
  const friendList: FriendItem[] = data?.friends || [];

  // 페이지네이션 (프론트에서 slicing)
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
          {/* 예: user2_nickname이 내 친구의 닉네임일 수도 있음 */}
          <ProfileCard
            profileImage="https://via.placeholder.com/50"
            name={friend.user2_nickname ?? "친구"}
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
