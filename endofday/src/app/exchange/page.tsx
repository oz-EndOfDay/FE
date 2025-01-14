"use client";
import React from "react";
import Link from "next/link";
import SmallButton from "@/components/ui/SmallButton";
import ExchangeFriendList from "@/components/exchange/ExchangeFriendList";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import {useExGetFriend} from "@/hooks/useExDiary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ExchangeFriendPage = () => {
    // API 호출
    const {data, isPending, error} = useExGetFriend();
    console.log(data);

    // 로딩 상태
    if (isPending) {
        return <LoadingSpinner />;
    }

    // 에러 처리
    if (error) {
        console.error("교환일기 친구목록 조회에 실패했습니다.", error);
        return (
            <div className="flex-1 flex justify-center items-center">
                <p>교환일기 친구목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col md:mt-8">
            {!data || data.friends.length === 0 ? (
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
                    <ExchangeFriendList friends={data.friends} />
                </>
            )}
        </div>
    );
};

export default ExchangeFriendPage;
