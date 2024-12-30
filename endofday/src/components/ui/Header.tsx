"use client";
import { useState } from "react";
import Image from "next/image";

import Modal from "@/components/ui/Modal";
import Heading from "@/components/ui/Heading";

// --------------------------------------------------------------------------
// 예시 데이터
// --------------------------------------------------------------------------

// (1) 알림 데이터 예시
interface NotificationItem {
  id: number;
  profileUrl: string;
  text: string;
  unread: boolean;   // 읽지 않은 여부
}
const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    profileUrl: "/icons/my.svg",
    text: "홍길동님이 댓글을 남겼습니다.",
    unread: true,
  },
  {
    id: 2,
    profileUrl: "/icons/my.svg",
    text: "김코딩님이 메시지를 보냈습니다.",
    unread: false,
  },
  {
    id: 3,
    profileUrl: "/icons/my.svg",
    text: "이하루님이 친구신청 보냈다. 빋이리",
    unread: true,
  },
];

// (2) 친구 목록 예시
const mockFriends = [
  {
    id: 1,
    name: "홍길동",
    profileUrl: "/icons/my.svg",
  },
  {
    id: 2,
    name: "김코딩",
    profileUrl: "/icons/my.svg",
  },
  {
    id: 3,
    name: "이하루",
    profileUrl: "/icons/my.svg",
  },
];

// (3) 채팅방 데이터 예시
const mockChatRooms = [
  {
    id: 101,
    friendId: 1, // 홍길동
    friendName: "홍길동",
    friendProfile: "/icons/my.svg",
    lastMessage: "안녕하세요!",
  },
  {
    id: 102,
    friendId: 2, // 김코딩
    friendName: "김코딩",
    friendProfile: "/icons/my.svg",
    lastMessage: "오늘은 같이 코딩해요.",
  },
];

// --------------------------------------------------------------------------
// 메인 Header 컴포넌트
// --------------------------------------------------------------------------
export default function Header() {
  // --------------------------------------------------------------------------
  // 1. 알림(Notifications) 상태
  // --------------------------------------------------------------------------
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 전체 알림 목록
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // “모두 / 읽지않음” 필터
  const [notificationFilter, setNotificationFilter] = useState<"all" | "unread">("all");

  // 알림 on/off 스위치 (전역)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  // 알림 아이콘 클릭
  const handleNotificationToggle = () => {
    setIsNotificationOpen((prev) => !prev);
    // 다른 패널 닫기
    if (isChatOpen) setIsChatOpen(false);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // 알림 클릭 → 읽음 처리
  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  // “모두/읽지않음” 필터 버튼
  const handleNotificationFilter = (filter: "all" | "unread") => {
    setNotificationFilter(filter);
  };

  // 필터된 알림 목록
  const filteredNotifications = notifications.filter((n) => {
    if (notificationFilter === "all") return true;
    return n.unread;
  });

  // --------------------------------------------------------------------------
  // 2. 채팅(Chat) 상태
  // --------------------------------------------------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 탭: 'friend' | 'room'
  const [chatTab, setChatTab] = useState<"friend" | "room">("friend");

  // 친구/채팅방 검색어
  const [friendSearch, setFriendSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");

  // 현재 들어가 있는 채팅방 ID(없으면 null)
  const [activeChatRoomId, setActiveChatRoomId] = useState<number | null>(null);

  // 채팅방 나가기 2단계 모달
  const [isLeaveChatModalOpen, setIsLeaveChatModalOpen] = useState(false);
  const [isLeftChatConfirmModalOpen, setIsLeftChatConfirmModalOpen] = useState(false);

  // 현재 채팅방 정보
  const activeChatRoom = mockChatRooms.find((r) => r.id === activeChatRoomId);

  // 채팅 아이콘 클릭
  const handleChatToggle = () => {
    setIsChatOpen((prev) => !prev);
    // 알림/프로필 닫기
    if (isNotificationOpen) setIsNotificationOpen(false);
    if (isProfileOpen) setIsProfileOpen(false);
    setActiveChatRoomId(null);
  };

  // 탭 전환(친구목록 / 참여중인 채팅방)
  const handleSwitchTab = (tab: "friend" | "room") => {
    setChatTab(tab);
  };

  // 친구목록에서 친구 클릭 → 채팅방 진입
  const handleFriendClick = (friend: { id: number; name: string }) => {
    const foundRoom = mockChatRooms.find((room) => room.friendId === friend.id);
    if (foundRoom) {
      setActiveChatRoomId(foundRoom.id);
    } else {
      alert(`${friend.name}님과의 채팅방이 없습니다 (데모)`);
    }
  };

  // 채팅방 목록에서 채팅방 클릭
  const handleRoomClick = (roomId: number) => {
    setActiveChatRoomId(roomId);
  };

  // 뒤로가기
  const handleGoBack = () => {
    setActiveChatRoomId(null);
  };

  // 채팅방 나가기 (첫 모달)
  const handleLeaveChatRoom = () => {
    setIsLeaveChatModalOpen(true);
  };
  const confirmLeaveChatRoom = () => {
    setIsLeaveChatModalOpen(false);
    setIsLeftChatConfirmModalOpen(true);
  };
  const cancelLeaveChatRoom = () => {
    setIsLeaveChatModalOpen(false);
  };
  // 두 번째 모달
  const finalConfirmLeftChat = () => {
    setIsLeftChatConfirmModalOpen(false);
    console.log(`${activeChatRoom?.friendName}님과의 채팅방에서 나갔습니다.`);
    setActiveChatRoomId(null);
  };
  const finalCloseLeftChatModal = () => {
    setIsLeftChatConfirmModalOpen(false);
  };

  // 채팅 예시 메시지
  const chatMessages = [
    {
      id: 1,
      isMe: true,
      profileUrl: "/icons/my.svg",
      nickname: "나",
      text: "안녕하세요!",
      time: "오전 9:00",
    },
    {
      id: 2,
      isMe: false,
      profileUrl: activeChatRoom?.friendProfile,
      nickname: activeChatRoom?.friendName,
      text: "안녕하세요! 반갑습니다.",
      time: "오전 9:02",
    },
    {
      id: 3,
      isMe: true,
      profileUrl: "/icons/my.svg",
      nickname: "나",
      text: "오늘 날씨 좋네요!",
      time: "오전 9:05",
    },
  ];

  // --------------------------------------------------------------------------
  // 3. 프로필 (하단: 프로필+닉네임 / 내정보 / 로그아웃)
  // --------------------------------------------------------------------------
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 로그아웃 모달(2단계)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggedOutConfirmModalOpen, setIsLoggedOutConfirmModalOpen] = useState(false);

  // 프로필 아이콘 클릭
  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
    // 알림/채팅 닫기
    if (isNotificationOpen) setIsNotificationOpen(false);
    if (isChatOpen) setIsChatOpen(false);
  };

  // 내정보 클릭 → 마이페이지
  const handleGotoMyPage = () => {
    console.log("마이페이지로 이동 (미구현)");
    // router.push("/mypage") 등 실제 라우팅
  };

  // 로그아웃
  const handleLogoutClick = () => {
    // 첫 번째 모달
    setIsLogoutModalOpen(true);
  };
  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };
  const handleLogoutConfirm = () => {
    // 첫 번째 모달 닫고, 두 번째 모달 열기
    setIsLogoutModalOpen(false);
    setIsLoggedOutConfirmModalOpen(true);
  };
  // 두 번째 모달 확인 버튼
  const handleLoggedOutConfirm = () => {
    setIsLoggedOutConfirmModalOpen(false);
    console.log("로그아웃 완료");
    // 실제 로그아웃 로직
  };

  // --------------------------------------------------------------------------
  // JSX
  // --------------------------------------------------------------------------
  return (
    <header className="fixed top-0 right-0 h-16 flex items-center bg-FDFBF8 justify-end px-2 z-50 w-full">
      <div className="flex items-center gap-2">
        {/* 채팅 아이콘 */}
        <div>
          <button
            onClick={handleChatToggle}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/chat.svg"
              alt="채팅 아이콘"
              width={40}
              height={40}
            />
          </button>

          {isChatOpen && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white z-10"
              style={{ maxHeight: "80vh" }}
            >
              {activeChatRoomId === null ? (
                <div className="p-4 relative" style={{ minHeight: "400px" }}>
                  {chatTab === "friend" && (
                    <FriendList
                      friendSearch={friendSearch}
                      setFriendSearch={setFriendSearch}
                      onFriendClick={handleFriendClick}
                    />
                  )}
                  {chatTab === "room" && (
                    <RoomList
                      roomSearch={roomSearch}
                      setRoomSearch={setRoomSearch}
                      onRoomClick={handleRoomClick}
                    />
                  )}

                  {/* 하단 버튼 (친구목록 / 현재 채팅방) */}
                  <div className="absolute bottom-2 left-0 w-full px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSwitchTab("friend")}
                        className={`flex-1 py-2 text-sm ${
                          chatTab === "friend"
                            ? "bg-blue-200"
                            : "bg-gray-100 hover:bg-gray-200"
                        } rounded`}
                      >
                        친구목록
                      </button>
                      <button
                        onClick={() => handleSwitchTab("room")}
                        className={`flex-1 py-2 text-sm ${
                          chatTab === "room"
                            ? "bg-blue-200"
                            : "bg-gray-100 hover:bg-gray-200"
                        } rounded`}
                      >
                        현재 채팅방
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <ChatRoom
                  friendName={activeChatRoom?.friendName ?? "친구"}
                  friendProfile={activeChatRoom?.friendProfile ?? "/icons/my.svg"}
                  onGoBack={handleGoBack}
                  onLeave={handleLeaveChatRoom}
                  messages={chatMessages}
                />
              )}
            </div>
          )}
        </div>

        {/* 알림 아이콘 */}
        <div>
          <button
            onClick={handleNotificationToggle}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/alarm.svg"
              alt="알림 아이콘"
              width={40}
              height={40}
            />
          </button>

          {isNotificationOpen && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white z-10 p-4"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <NotificationPanel
                notifications={filteredNotifications}
                filter={notificationFilter}
                onFilter={handleNotificationFilter}
                onClickNotification={handleNotificationClick}
                isNotificationEnabled={isNotificationEnabled}
                setIsNotificationEnabled={setIsNotificationEnabled}
              />
            </div>
          )}
        </div>

        {/* 프로필 아이콘 */}
        <div>
          <button
            onClick={handleProfileToggle}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/my.svg"
              alt="프로필 아이콘"
              width={40}
              height={40}
            />
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 py-2 bg-white z-10"
            >
              {/* (1) 프로필 + 닉네임 */}
              <div className="flex items-center p-4">
                <Image
                  src="/icons/my.svg"
                  alt="프로필"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-bold justify-center w-full items-center flex">내닉네임</span>
              </div>

              {/* hr with 80% width */}
              <hr className="my-2 w-4/5 mx-auto" />

              {/* (2) 내정보 / (3) 로그아웃 */}
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleGotoMyPage}
              >
                내정보
              </button>

              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogoutClick}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 로그아웃 1단계 모달 */}
      {isLogoutModalOpen && (
        <Modal
          title="로그아웃 하시겠습니까?"
          description="정말 로그아웃 하시겠습니까?"
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          cancelText="취소"
          confirmText="확인"
        />
      )}

      {/* 로그아웃 2단계 모달 */}
      {isLoggedOutConfirmModalOpen && (
        <Modal
          title="로그아웃되었습니다."
          onCancel={() => setIsLoggedOutConfirmModalOpen(false)}
          onConfirm={handleLoggedOutConfirm}
          cancelText="닫기"
          confirmText="확인"
        />
      )}

      {/* 채팅방 나가기: 첫 번째 모달 */}
      {isLeaveChatModalOpen && (
        <Modal
          title="채팅방을 나가시겠습니까?"
          description="모든 채팅 내용이 삭제됩니다."
          onCancel={cancelLeaveChatRoom}
          onConfirm={confirmLeaveChatRoom}
          cancelText="취소"
          confirmText="확인"
        />
      )}
      {/* 채팅방 나가기: 두 번째 모달 */}
      {isLeftChatConfirmModalOpen && (
        <Modal
          title={`${activeChatRoom?.friendName}님과의 채팅방에서 나갔습니다.`}
          onCancel={finalCloseLeftChatModal}
          onConfirm={finalConfirmLeftChat}
          cancelText="닫기"
          confirmText="확인"
        />
      )}
    </header>
  );
}

// =================================================================
// (A) 알림 패널
// =================================================================
function NotificationPanel({
                             notifications,
                             filter,
                             onFilter,
                             onClickNotification,
                             isNotificationEnabled,
                             setIsNotificationEnabled,
                           }: {
  notifications: {
    id: number;
    profileUrl: string;
    text: string;
    unread: boolean;
  }[];
  filter: "all" | "unread";
  onFilter: (filter: "all" | "unread") => void;
  onClickNotification: (id: number) => void;

  // 알림 전역 ON/OFF
  isNotificationEnabled: boolean;
  setIsNotificationEnabled: (val: boolean) => void;
}) {
  // isNotificationEnabled => "ON" / "OFF" 문자열
  const onOffLabel = isNotificationEnabled ? "ON" : "OFF";

  return (
    <div>
      {/* 상단 헤더 + 알림 on/off 스위치 (푸른색 반투명 테두리) */}
      <div className="flex items-center justify-between mb-3 p-2 rounded">
        <Heading tag="h2" className="text-xl font-bold">
          알림
        </Heading>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{onOffLabel}</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isNotificationEnabled}
              onChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none
                peer-focus:ring-1 peer-focus:ring-blue-300
                rounded-full border border-blue-300/60
                peer-checked:after:translate-x-full peer-checked:after:border-white
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-3 after:w-3 after:transition-all
                peer-checked:bg-blue-400"
            />
          </label>
        </div>
      </div>

      {/* 필터 버튼 */}
      <div className="flex gap-4 mb-3">
        <button
          className={`px-3 py-1 text-sm ${
            filter === "all" ? "text-blue-600 font-bold" : "hover:bg-gray-100"
          }`}
          onClick={() => onFilter("all")}
        >
          모두
        </button>
        <button
          className={`px-3 py-1 text-sm ${
            filter === "unread" ? "text-blue-600 font-bold" : "hover:bg-gray-100"
          }`}
          onClick={() => onFilter("unread")}
        >
          읽지않음
        </button>
      </div>

      {/* 알림 목록 */}
      <ul className="space-y-2">
        {notifications.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => onClickNotification(item.id)}
          >
            <Image
              src={item.profileUrl}
              alt="알림 프로필"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex-1 ml-2 text-sm">
              {item.text}
            </div>
            {item.unread && (
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block mr-1" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// =================================================================
// (B) 친구목록
// =================================================================
function FriendList({
                      friendSearch,
                      setFriendSearch,
                      onFriendClick,
                    }: {
  friendSearch: string;
  setFriendSearch: (val: string) => void;
  onFriendClick: (friend: { id: number; name: string }) => void;
}) {
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

// =================================================================
// (C) 채팅방 목록
// =================================================================
function RoomList({
                    roomSearch,
                    setRoomSearch,
                    onRoomClick,
                  }: {
  roomSearch: string;
  setRoomSearch: (val: string) => void;
  onRoomClick: (roomId: number) => void;
}) {
  const filteredRooms = mockChatRooms.filter((r) =>
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
      {filteredRooms.length === 0 && (
        <div className="text-sm text-gray-500">
          현재 참여중인 채팅방이 없습니다.
        </div>
      )}
      <ul className="space-y-2">
        {filteredRooms.map((room) => (
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
    </>
  );
}

// =================================================================
// (D) 채팅방 상세 화면
// =================================================================
function ChatRoom({
                    friendName,
                    friendProfile,
                    onGoBack,
                    onLeave,
                    messages,
                  }: {
  friendName: string;
  friendProfile: string;
  onGoBack: () => void;
  onLeave: () => void;
  messages: {
    id: number;
    isMe: boolean;
    profileUrl?: string;
    nickname?: string;
    text: string;
    time: string;
  }[];
}) {
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
      {/* 메시지 영역 */}
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
              <span className="text-xs text-gray-500 mt-1">{msg.nickname}</span>
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
