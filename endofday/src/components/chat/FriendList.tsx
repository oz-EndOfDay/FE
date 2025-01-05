"use client";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

// 친구 데이터 예시와 동일한 구조
interface Friend {
  id: number;
  name: string;
  profileUrl: string;
}

interface FriendListProps {
  friendSearch: string;
  setFriendSearch: (val: string) => void;
  onFriendClick: (friend: { id: number; name: string }) => void;
  friends?: Friend[]; // 필요시 외부에서 주입 가능
}

export default function FriendList({
                                     friendSearch,
                                     setFriendSearch,
                                     onFriendClick,
                                     friends = [],
                                   }: FriendListProps) {
  // 여기서는 mockFriends를 직접 써도 되지만, 상위에서 props로 받을 수도 있음
  // 임시로 mockFriends 사용하려면 import 해서 대체 가능
  const mockFriends = [
    { id: 1, name: "홍길동", profileUrl: "/icons/my.svg" },
    { id: 2, name: "김코딩", profileUrl: "/icons/my.svg" },
    { id: 3, name: "이하루", profileUrl: "/icons/my.svg" },
  ];
  const filtered = mockFriends.filter((f) => f.name.includes(friendSearch));

  return (
    <>
      <Heading tag="h2" className="text-xl font-bold mb-3">
        친구목록
      </Heading>

      <div className="mb-3">
        <input
          type="text"
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
          placeholder="닉네임 검색"
          className="px-3 py-2 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none w-full"
        />
      </div>

      {filtered.length === 0 && (
        <div className="text-sm text-gray-500">친구가 없습니다.</div>
      )}

      <ul className="space-y-2">
        {filtered.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50"
            onClick={() => onFriendClick(friend)}
          >
            <Image
              src={friend.profileUrl}
              alt="프로필"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm">{friend.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
