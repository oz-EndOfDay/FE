"use client";
import React from "react";
import Link from "next/link";
import SmallButton from "@/components/ui/SmallButton";
import ExchangeFriendList from "@/components/exchange/ExchangeFriendList";
import Heading from "@/components/ui/Heading";
const ExchangeFriendPage = () => {
    return (
        <div className="flex-1 flex flex-col md:mt-8">
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
            <ExchangeFriendList />
        </div>
    );
};

export default ExchangeFriendPage;
