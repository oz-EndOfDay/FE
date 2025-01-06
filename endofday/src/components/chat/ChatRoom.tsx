"use client";
import Image from "next/image";

interface MessageItem {
  id: number;
  isMe: boolean;
  profileUrl?: string;
  nickname?: string;
  text: string;
  time: string;
}

interface ChatRoomProps {
  friendName: string;
  friendProfile: string;
  onGoBack: () => void;
  onLeave: () => void;
  messages: MessageItem[];
}

export default function ChatRoom({
                                   friendName,
                                   friendProfile,
                                   onGoBack,
                                   onLeave,
                                   messages,
                                 }: ChatRoomProps) {
  return (
    <div className="flex flex-col" style={{ height: "80vh" }}>
      {/* 상단 바 */}
      <div className="flex items-center justify-between p-2 border-b">
        <button
          onClick={onGoBack}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        >
          <span className="text-xl">&lt;</span>
        </button>
        <div className="flex items-center gap-2">
          <Image
            src={friendProfile}
            alt="상대방 프로필"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold">{friendName}</span>
        </div>
        <button
          onClick={onLeave}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          나가기
        </button>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.isMe ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="flex flex-col items-center">
              <Image
                src={msg.profileUrl || "/icons/my.svg"}
                alt="프로필"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xs text-gray-500 mt-1">
                {msg.nickname}
              </span>
            </div>
            <div
              className={`max-w-[60%] p-2 rounded text-sm ${
                msg.isMe ? "bg-gray-200 text-left" : "bg-blue-100 text-right"
              }`}
            >
              <div className="break-all">{msg.text}</div>
              <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 입력창 */}
      <div className="border-t p-2 flex gap-2">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          className="flex-1 px-3 py-2 rounded-lg bg-[#F2F4F8] placeholder:text-gray text-black focus:outline-none w-full"
        />
        <button className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
          전송
        </button>
      </div>
    </div>
  );
}
