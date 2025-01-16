"use client";

import React, {useState, useEffect} from "react";
import Pagination from "./Pagination";
import ProfileCard from "./ProfileCard";
import {fetchFriends, deleteFriend, FriendListResponse} from "@/api/friendApi";
import {useRouter} from "next/navigation";
import FriendModals from "./FriendModals";
import LoadingSpinner from "../ui/LoadingSpinner";
import {FriendItem} from "@/types/friend";

const FriendList = () => {
    const router = useRouter();
    const [selectedFriend, setSelectedFriend] = useState<FriendItem | null>(null);
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
    const [modalState, setModalState] = useState<"" | "confirm" | "success" | "alreadyExchanging" | "startExchange">("");
    const [friends, setFriends] = useState<FriendItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadFriends = async () => {
            setLoading(true);
            try {
                const data: FriendListResponse = await fetchFriends();
                setFriends(data.friends);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadFriends();
    }, []);
    console.log(selectedFriend, "?");
    const openDeleteModal = async (friendId: number) => {
        setSelectedFriendId(friendId);
        setModalState("confirm");
    };

    const handleDeleteConfirm = async () => {
        if (!selectedFriendId) return;
        try {
            await deleteFriend(selectedFriendId);
            setFriends(prev => prev.filter(f => f.id !== selectedFriendId));
            console.log(friends);
            setModalState("success");
        } catch (err) {
            if (err instanceof Error && err.message === "Unauthorized") {
                alert("로그인이 필요합니다!");
            } else {
                alert("친구 삭제 중 오류가 발생했습니다.");
            }
        }
    };
    // 교환일기 상태 확인 및 모달 오픈
    const openModalDiary = (friend: FriendItem) => {
        setSelectedFriend(friend);
        if (friend.ex_diary_cnt > 0 && friend.last_ex_date !== null) {
            setModalState("alreadyExchanging");
        } else {
            setModalState("startExchange");
        }
    };

    // 확인 버튼 클릭 시 이동
    const navigateModalDiary = () => {
        if (!selectedFriend) return;

        if (modalState === "alreadyExchanging") {
            router.push(`/exchange/${selectedFriend.id}/list`); // 교환일기 리스트
        } else if (modalState === "startExchange") {
            router.push(`/exchange/${selectedFriend.id}/write`); // 교환일기 작성
        }

        closeModal(); // 모달 닫기
    };
    const closeModal = () => {
        setModalState("");
        setSelectedFriend(null); // 친구 정보 초기화
    };

    if (loading) return <LoadingSpinner />;
    if (error) {
        console.error("FriendList error:", error);
        return <div className="text-center p-4">친구 목록을 불러오는 중 오류가 발생했습니다.</div>;
    }
    if (friends.length === 0) {
        return <div className="text-center p-4">친구가 없습니다.</div>;
    }

    const pageSize = 6;
    const totalPages = Math.ceil(friends.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentFriends = friends.slice(startIndex, startIndex + pageSize);

    return (
        <>
            <div className="space-y-4">
                {currentFriends.map(friend => (
                    <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg"
                    >
                        <ProfileCard
                            profileImage={friend.friend_profile_img ?? "/icons/ProfileExample.png"}
                            name={friend.friend_nickname || "친구"}
                            statusMessage={friend.friend_introduce || ""}
                        />
                        <div className="space-x-2 flex items-center justify-center flex-shrink-0">
                            <button
                                className="px-3 py-1 bg-[#E7CCA9] rounded-full hover:bg-[#D1B696] transition-colors duration-200"
                                onClick={() => openModalDiary(friend)}
                            >
                                교환일기
                            </button>
                            <button
                                className="px-3 py-1 bg-[#545f71] rounded-full hover:bg-[#D1B696] text-white transition-colors duration-200"
                                onClick={() => openDeleteModal(friend.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-auto text-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={p => setCurrentPage(p)}
                />
            </div>
            <FriendModals
                modalState={modalState}
                onClose={closeModal}
                onDeleteConfirm={handleDeleteConfirm}
                onNavigateDiary={navigateModalDiary}
                selectedFriend={selectedFriend}
            />
        </>
    );
};

export default FriendList;
