"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

import FriendList from "@/components/chat/FriendList";
import RoomList from "@/components/chat/RoomList";
import ChatRoom from "@/components/chat/ChatRoom";
import NotificationPanel from "@/components/NotificationPanel";

interface NotificationItem {
  id: number;
  profileUrl: string;
  text: string;
  unread: boolean;
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

interface ChatRoomItem {
  id: number;
  friendId: number;
  friendName: string;
  friendProfile: string;
  lastMessage: string;
}
const mockChatRooms: ChatRoomItem[] = [
  {
    id: 101,
    friendId: 1,
    friendName: "홍길동",
    friendProfile: "/icons/my.svg",
    lastMessage: "안녕하세요!",
  },
  {
    id: 102,
    friendId: 2,
    friendName: "김코딩",
    friendProfile: "/icons/my.svg",
    lastMessage: "오늘은 같이 코딩해요.",
  },
];

export default function Header() {
  // ------------------ 알림 상태 ------------------
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [notificationFilter, setNotificationFilter] = useState<"all" | "unread">("all");
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const filteredNotifications = notifications.filter((n) => {
    if (notificationFilter === "all") return true;
    return n.unread;
  });

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };
  const handleNotificationFilter = (filter: "all" | "unread") => {
    setNotificationFilter(filter);
  };

  // ------------------ 채팅 상태 ------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTab, setChatTab] = useState<"friend" | "room">("friend");
  const [friendSearch, setFriendSearch] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [activeChatRoomId, setActiveChatRoomId] = useState<number | null>(null);
  const activeChatRoom = mockChatRooms.find((r) => r.id === activeChatRoomId);

  const handleSwitchTab = (tab: "friend" | "room") => {
    setChatTab(tab);
  };
  const handleFriendClick = (friend: { id: number; name: string }) => {
    const foundRoom = mockChatRooms.find((room) => room.friendId === friend.id);
    if (foundRoom) {
      setActiveChatRoomId(foundRoom.id);
    } else {
      alert(`${friend.name}님과의 채팅방이 없습니다 (데모)`);
    }
  };
  const handleRoomClick = (roomId: number) => {
    setActiveChatRoomId(roomId);
  };
  const handleGoBack = () => {
    setActiveChatRoomId(null);
  };

  // 채팅방 나가기 2단계 모달
  const [isLeaveChatModalOpen, setIsLeaveChatModalOpen] = useState(false);
  const [isLeftChatConfirmModalOpen, setIsLeftChatConfirmModalOpen] = useState(false);

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
  const finalConfirmLeftChat = () => {
    setIsLeftChatConfirmModalOpen(false);
    console.log(`${activeChatRoom?.friendName}님과의 채팅방에서 나갔습니다.`);
    setActiveChatRoomId(null);
  };
  const finalCloseLeftChatModal = () => {
    setIsLeftChatConfirmModalOpen(false);
  };

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

  // ------------------ 프로필(로그아웃 & 마이페이지) 상태 ------------------
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 2단계 로그아웃 모달
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggedOutConfirmModalOpen, setIsLoggedOutConfirmModalOpen] = useState(false);

  // ------------------ 패널/아이콘 ref ------------------
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  const notificationIconRef = useRef<HTMLButtonElement>(null);
  const notificationPanelRef = useRef<HTMLDivElement>(null);

  const profileIconRef = useRef<HTMLButtonElement>(null);
  const profilePanelRef = useRef<HTMLDivElement>(null);

  // ------------------ 토글 함수 ------------------
  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
    setActiveChatRoomId(null);
  };
  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsChatOpen(false);
    setIsProfileOpen(false);
  };
  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsChatOpen(false);
    setIsNotificationOpen(false);
  };

  // ------------------ 로그아웃 로직 ------------------
  const handleGotoMyPage = () => {
    console.log("마이페이지로 이동 (미구현)");
  };
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };
  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    setIsLoggedOutConfirmModalOpen(true);
  };
  const handleLoggedOutConfirm = () => {
    setIsLoggedOutConfirmModalOpen(false);
    console.log("로그아웃 완료 (실제 로직 처리)");
  };

  // ------------------ 바깥 클릭 감지 => 패널 닫기 ------------------
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      // 채팅
      if (
        isChatOpen &&
        chatIconRef.current &&
        chatPanelRef.current &&
        !chatIconRef.current.contains(target) &&
        !chatPanelRef.current.contains(target)
      ) {
        setIsChatOpen(false);
      }

      // 알림
      if (
        isNotificationOpen &&
        notificationIconRef.current &&
        notificationPanelRef.current &&
        !notificationIconRef.current.contains(target) &&
        !notificationPanelRef.current.contains(target)
      ) {
        setIsNotificationOpen(false);
      }

      // 프로필
      if (
        isProfileOpen &&
        profileIconRef.current &&
        profilePanelRef.current &&
        !profileIconRef.current.contains(target) &&
        !profilePanelRef.current.contains(target)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen, isNotificationOpen, isProfileOpen]);

  return (
    <header className="fixed top-0 right-0 h-16 flex items-center bg-FDFBF8 justify-end px-2 z-50 w-full">
      <div className="flex items-center gap-2">
        {/* 채팅 아이콘 + 패널 */}
        <div>
          <button
            ref={chatIconRef}
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
              ref={chatPanelRef}
              className="absolute right-0 mt-2 w-80 bg-white z-10 border shadow"
              style={{ maxHeight: "80vh" }}
            >
              {activeChatRoomId === null ? (
                <div className="p-4 relative" style={{ minHeight: "400px" }}>
                  {chatTab === "friend" && (
                    <FriendList
                      friendSearch={friendSearch}
                      setFriendSearch={setFriendSearch}
                      onFriendClick={handleFriendClick}
                      // 만약 실제 friends 데이터가 있다면 props로 전달
                      friends={[
                        { id: 1, name: "홍길동", profileUrl: "/icons/my.svg" },
                        { id: 2, name: "김코딩", profileUrl: "/icons/my.svg" },
                        { id: 3, name: "이하루", profileUrl: "/icons/my.svg" },
                      ]}
                    />
                  )}
                  {chatTab === "room" && (
                    <RoomList
                      roomSearch={roomSearch}
                      setRoomSearch={setRoomSearch}
                      onRoomClick={handleRoomClick}
                      // 실제 rooms 데이터
                      rooms={mockChatRooms.map((item) => ({
                        id: item.id,
                        friendName: item.friendName,
                        friendProfile: item.friendProfile,
                        lastMessage: item.lastMessage,
                      }))}
                    />
                  )}

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

        {/* 알림 아이콘 + 패널 */}
        <div>
          <button
            ref={notificationIconRef}
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
              ref={notificationPanelRef}
              className="absolute right-0 mt-2 w-72 bg-white z-10 p-4 border shadow"
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

        {/* 프로필 아이콘 + 패널 */}
        <div>
          <button
            ref={profileIconRef}
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
              ref={profilePanelRef}
              className="absolute right-0 mt-2 w-48 py-2 bg-white z-10 border shadow-md"
            >
              <div className="flex items-center p-4">
                <Image
                  src="/icons/my.svg"
                  alt="프로필"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-bold flex-1 text-center">
                  내닉네임
                </span>
              </div>

              <hr className="my-2 w-4/5 mx-auto" />

              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleGotoMyPage();
                  setIsProfileOpen(false);
                }}
              >
                마이페이지
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleLogoutClick();
                  setIsProfileOpen(false);
                }}
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
