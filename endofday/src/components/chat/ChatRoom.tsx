"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";

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

export function ChatRoom({
                           friendName,
                           friendProfile,
                           onGoBack,
                           onLeave,
                           messages,
                         }: ChatRoomProps) {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={onGoBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <IoMdArrowBack className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <Image
            src={friendProfile}
            alt={friendName}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-lg">{friendName}</span>
        </div>
        <button
          onClick={onLeave}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors duration-200"
        >
          나가기
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex ${msg.isMe ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
              {!msg.isMe && (
                <div className="flex flex-col items-center space-y-1">
                  <Image
                    src={msg.profileUrl || "/placeholder.svg?height=50&width=50"}
                    alt={msg.nickname || ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-xs text-gray-500">{msg.nickname}</span>
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.isMe
                    ? "bg-slate-700 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInputMessage("");
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <IoMdSend className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

