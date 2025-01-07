"use client";
import React from "react";
import Link from "next/link";
import SmallButton from "@/components/ui/SmallButton";
import ExchangeFriendList from "@/components/exchange/ExchangeFriendList";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

interface Friend {
    id: number;
    name: string;
    statusMessage: string;
    profileImage: string;
}

const mockFriends: Friend[] = [
    {
        id: 1,
        name: "홍길동",
        statusMessage: "안녕하세요!",
        profileImage: "",
    },
    {
        id: 2,
        name: "김철수",
        statusMessage: "반갑습니다",
        profileImage: "",
    },
    {
        id: 3,
        name: "이영희",
        statusMessage: "오늘도 화이팅!",
        profileImage: "",
    },
];

const ExchangeFriendPage = () => {
    const friends: Friend[] = mockFriends;
    const isListEmpty = friends.length === 0;
    return (
        <div className="flex-1 flex flex-col md:mt-8">
            {isListEmpty ? (
                <div className="flex h-full flex-col justify-center items-center text-center">
                    <Heading
                        tag="p"
                        className="pb-10"
                    >
                        아직 교환한 친구가 없습니다.
                        <br />
                        교환일기를 나눌 친구를 추가해보세요!
                    </Heading>
                    <Link href="/friend/search">
                        <Button
                            type="submit"
                            variant="sand"
                            className="!w-[17rem]"
                        >
                            친구 찾기
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="text-center mb-4">
                        <Heading tag="h2">교환일기 친구 목록</Heading>
                    </div>
                    <div className="text-right mb-3">
                        <SmallButton variant="text">이름순</SmallButton>
                        <SmallButton variant="text">최신순</SmallButton>
                        <SmallButton variant="text">교환갯수순</SmallButton>
                    </div>
                    <Link href="/exchange/list">
                        <button type="button">리스트</button>
                    </Link>
                    <ExchangeFriendList friends={friends} />
                </>
            )}
        </div>
    );
};

export default ExchangeFriendPage;
