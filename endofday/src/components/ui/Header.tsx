"use client";
import { useState } from 'react'
import Image from 'next/image'

interface HeaderProps {
  profileUrl?: string
  onLogout?: () => void
}

export default function Header({ profileUrl, onLogout }: HeaderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // 채팅 아이콘 클릭 시 열고 닫기
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen)
  }

  // 프로필 아이콘 클릭 시 열고 닫기
  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  // 로그아웃
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="fixed top-0 right-0 h-16 flex items-center bg-FDFBF8 justify-end px-2 z-50">
      <div className="flex items-center gap-1">

        <div className="relative">
          <button
            onClick={handleChatToggle}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/chat.png"
              alt="채팅 아이콘"
              width={40}
              height={40}
            />
          </button>
          {/* 채팅창 열림 */}
          {isChatOpen && (
            <div className="absolute right-0 mt-2 w-72 h-96 border shadow-md p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">채팅</h3>
              <div className="text-sm text-gray-500">
                {/* 채팅 내용 또는 채팅 목록을 여기에 표시 */}
                채팅 목록 또는 내용이 들어갈 공간
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/alarm.png"
              alt="알림 아이콘"
              width={40}
              height={40}
            />
          </button>
        </div>

        {/* 프로필 아이콘 */}
        <div className="relative">
          <button
            onClick={handleProfileToggle}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="profile"
                className="w-8 h-8 object-cover rounded-full"
              />
            ) : (
              <Image
                src="/icons/my.png"
                alt="프로필 아이콘"
                width={40}
                height={40}
              />
            )}
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-36 border shadow-md py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                로그아웃
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                내정보
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
