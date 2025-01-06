"use client";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

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

export default function RoomList({
                                   roomSearch,
                                   setRoomSearch,
                                   onRoomClick,
                                   rooms,
                                 }: RoomListProps) {
  const filtered = rooms.filter((r) =>
    r.friendName.includes(roomSearch)
  );

  return (
    <>
      <Heading tag="h2" className="text-xl font-bold mb-3">
        참여중인 채팅방
      </Heading>

      <div className="mb-3">
        <input
          type="text"
          value={roomSearch}
          onChange={(e) => setRoomSearch(e.target.value)}
          placeholder="닉네임 검색"
          className="px-3 py-2 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none w-full"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-sm text-gray-500">
          현재 참여중인 채팅방이 없습니다.
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((room) => (
            <li
              key={room.id}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => onRoomClick(room.id)}
            >
              <Image
                src={room.friendProfile}
                alt="프로필"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1 text-sm">
                <div className="font-semibold">{room.friendName}</div>
                <div className="text-xs text-gray-500">{room.lastMessage}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
