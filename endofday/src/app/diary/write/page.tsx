import React from "react";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import MoodRadio from "@/components/ui/MoodRadio";
import WeatherRadio from "@/components/ui/WeatherRadio";

const WritePage = () => {
    return (
        <div>
            <div className="text-center">
                <Heading tag="h2">오늘의 일기</Heading>
                <Heading
                    tag="p"
                    className="mt-2"
                >
                    오늘의 기분은 어떠셨나요? <br />
                    하루를 정리하며 기록해보세요.
                </Heading>
            </div>
            <form className="space-y-4">
                <Input
                    id="user_email"
                    label="제목"
                    type="email"
                    placeholder="제목을 입력해주세요"
                />
                <Input
                    id="date"
                    label="날짜"
                    type="date"
                    placeholder="날짜를 입력해주세요"
                />
                <MoodRadio />
                <WeatherRadio />
                <div className="flex flex-col !mt-[3.25rem] space-y-4 items-center">
                    <Button
                        type="submit"
                        variant="sand"
                    >
                        작성
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WritePage;
