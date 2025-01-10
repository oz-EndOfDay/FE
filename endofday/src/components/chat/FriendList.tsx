"use client";

import Image from "next/image";
import { IoMdSearch } from "react-icons/io";

interface Friend {
  id: number;
  name: string;
  profileUrl: string;
}

interface FriendListProps {
  friendSearch: string;
  setFriendSearch: (val: string) => void;
  onFriendClick: (friend: Friend) => void;
  friends: Friend[];
}

export function FriendList({
                             friendSearch,
                             setFriendSearch,
                             onFriendClick,
                             friends,
                           }: FriendListProps) {
  const filtered = friends.filter((f) => f.name.includes(friendSearch));

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={friendSearch}
          onChange={(e) => setFriendSearch(e.target.value)}
          placeholder="친구 검색"
          className="w-full pl-10 border pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-4">친구가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => onFriendClick(friend)}
            >
              <Image
                src={friend.profileUrl}
                alt={friend.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-medium">{friend.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

