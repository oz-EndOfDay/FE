"use client";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

export default function FriendList({
                                     friendSearch,
                                     setFriendSearch,
                                     onFriendClick,
                                     friends,
                                   }: {
  friendSearch: string;
  setFriendSearch: (val: string) => void;
  onFriendClick: (friend: { id: number; name: string }) => void;
  friends: { id: number; name: string; profileUrl: string }[];
}) {
  // 이제 mockFriends 대신 props인 friends 사용
  const filtered = friends.filter((f) => f.name.includes(friendSearch));

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
