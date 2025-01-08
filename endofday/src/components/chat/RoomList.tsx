"use client";

import Image from "next/image";
import { IoMdSearch } from "react-icons/io";

interface Room {
  id: number;
  friendName: string;
  friendProfile: string;
  lastMessage: string;
}

interface RoomListProps {
  roomSearch: string;
  setRoomSearch: (val: string) => void;
  onRoomClick: (roomId: number) => void;
  rooms: Room[];
}

export function RoomList({
                           roomSearch,
                           setRoomSearch,
                           onRoomClick,
                           rooms,
                         }: RoomListProps) {
  const filtered = rooms.filter((r) => r.friendName.includes(roomSearch));

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={roomSearch}
          onChange={(e) => setRoomSearch(e.target.value)}
          placeholder="채팅방 검색"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-4">채팅방이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((room) => (
            <li
              key={room.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => onRoomClick(room.id)}
            >
              <Image
                src={room.friendProfile}
                alt={room.friendName}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{room.friendName}</p>
                <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

