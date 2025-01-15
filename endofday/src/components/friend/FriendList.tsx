"use client";

import React, {useState, useEffect} from "react";
import Pagination from "./Pagination";
import ProfileCard from "./ProfileCard";
import {fetchFriends, deleteFriend, FriendListResponse} from "@/api/friendApi";
import {useRouter} from "next/navigation";

interface FriendItem {
    id: number;
    is_accept: boolean;
    ex_diary_cnt: number;
    last_ex_date: string | null;
    created_at: string;
    friend_nickname: string | null;
    friend_profile_img: string | null;
    friend_introduce?: string | null;
}

const FriendList = () => {
    const router = useRouter();

    const [friends, setFriends] = useState<FriendItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchFriends()
            .then((data: FriendListResponse) => {
                // data.friends : FriendItem[]
                setFriends(data.friends);
                console.log(data);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("오류가 발생했습니다.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDelete = async (friendId: number) => {
        try {
            await deleteFriend(friendId);
            alert("친구가 삭제되었습니다.");
            setFriends(prev => prev.filter(f => f.id !== friendId));
        } catch (err: unknown) {
            if (err instanceof Error && err.message === "Unauthorized") {
                alert("로그인이 필요합니다!");
            } else {
                alert("친구 삭제 중 오류가 발생했습니다.");
            }
        }
    };
    // 교환일기 페이지 이동
    const handleNavigateDiary = (friend: FriendItem) => {
        if (friend.ex_diary_cnt > 0 && friend.last_ex_date !== null) {
            // ✅ 교환일기 리스트 페이지로 이동
            router.push(`/exchange/${friend.id}/list`);
        } else {
            // ✅ 교환일기 작성 페이지로 이동
            router.push(`/exchange/${friend.id}/write`);
        }
    };
    if (loading) return <div>로딩중...</div>;
    if (error) {
        console.error("FriendList error:", error);
        return <div>친구 목록을 불러오는 중 오류가 발생했습니다.</div>;
    }
    if (friends.length === 0) {
        return <div className="text-center p-4">친구가 없습니다.</div>;
    }

    const pageSize = 5;
    const totalPages = Math.ceil(friends.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentFriends = friends.slice(startIndex, startIndex + pageSize);

    return (
        <>
            <div>
                {currentFriends.map(friend => (
                    <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg mb-4"
                    >
                        <ProfileCard
                            profileImage={friend.friend_profile_img ?? "/icons/ProfileExample.png"}
                            name={friend.friend_nickname || "친구"}
                            statusMessage={friend.friend_introduce || ""}
                        />
                        <div className="space-x-2">
                            <button
                                className="px-3 py-1 bg-[#E7CCA9] rounded-full hover:bg-[#D1B696] transition-colors duration-200"
                                onClick={() => handleNavigateDiary(friend)}
                            >
                                교환일기
                            </button>
                            <button
                                className="px-3 py-1 bg-[#545f71] rounded-full hover:bg-[#D1B696] text-white transition-colors duration-200"
                                onClick={() => handleDelete(friend.id)}
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
        </>
    );
};

export default FriendList;
