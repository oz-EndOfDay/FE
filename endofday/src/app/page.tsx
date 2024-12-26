"use client";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import LoginForm from "@/components/ui/LoginForm";

export default function Home() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(20rem,1fr)_minmax(20rem,1fr)] md:py-[5rem] md:gap-[12.5rem] gap-[5rem]">
            <div className="flex flex-col md:h-full h-[18.75rem]">
                <Heading tag="h1">
                    하루 끝, <br />
                    당신만의 이야기를 채워보세요
                </Heading>
                <Heading
                    tag="p"
                    className="mt-10 text-xl"
                >
                    아직 회원이 아니시라면, <br />
                    오늘의 첫 기록을 남겨보세요
                </Heading>
                <Button className="mt-auto">회원가입하러 가기</Button>
            </div>
            <div className="flex flex-col md:h-full">
                <LoginForm />
            </div>
        </div>
    );
}
