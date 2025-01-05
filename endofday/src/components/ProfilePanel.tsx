"use client";
import Image from "next/image";

interface ProfilePanelProps {
  nickname: string;              // 닉네임
  profileUrl: string;            // 프로필 이미지
  onClose: () => void;           // 프로필 패널 닫기
  onGotoMyPage: () => void;      // 마이페이지 이동
  onLogoutClick: () => void;     // 로그아웃 (2단계 모달 열기)
}

export default function ProfilePanel({
                                       nickname,
                                       profileUrl,
                                       onClose,
                                       onGotoMyPage,
                                       onLogoutClick,
                                     }: ProfilePanelProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 py-2 bg-white z-10 border shadow-md">
      {/* (1) 프로필 + 닉네임 */}
      <div className="flex items-center p-4">
        <Image
          src={profileUrl}
          alt="프로필"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="font-bold flex-1 text-center">{nickname}</span>
      </div>

      {/* hr (80% width) */}
      <hr className="my-2 w-4/5 mx-auto" />

      {/* (2) 마이페이지 / (3) 로그아웃 */}
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          onGotoMyPage();
          onClose();
        }}
      >
        마이페이지
      </button>

      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          onLogoutClick();
          onClose();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
