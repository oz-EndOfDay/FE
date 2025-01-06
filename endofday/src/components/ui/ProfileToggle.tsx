"use client";
import React, {useState} from "react";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

const ProfileToggle = () => {
    const [isToggleOpen, setToggleOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setToggleOpen(prev => !prev);
    };

    return (
        <aside className={`min-h-screen bg-warmgray px-5 flex-col flex-shrink-0 items-center ${isToggleOpen ? "w-[15rem]" : "w-[3rem]"} md:flex hidden ml-[8rem] z-50 relative transition-all ease-out duration-300`}>
            <div className="sticky top-0 left-0 w-full">
                {isToggleOpen ? (
                    <button
                        type="button"
                        className="absolute top-3 right-0 rotate-180 w-[25px] h-[25px]"
                        onClick={handleToggle}
                    >
                        <Image
                            src="/icons/double_left.svg"
                            alt="화살표"
                            width={25}
                            height={25}
                        />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[25px] h-[25px] "
                        onClick={handleToggle}
                    >
                        <Image
                            src="/icons/double_left.svg"
                            alt="화살표"
                            width={25}
                            height={25}
                        />
                    </button>
                )}
            </div>

            <div className="flex flex-col items-center w-full sticky top-[150px] left-0">
                {isToggleOpen && (
                    <div className={`transition-all duration-400 ease-out opacity-0 flex flex-col items-center ${isToggleOpen ? "opacity-100 translate-y-0" : ""}`}>
                        <div className="bg-white w-[11.25rem] h-[11.25rem] rounded-[50%] flex justify-center items-center border overflow-hidden">
                            <Image
                                src="/icons/ProfileExample.png"
                                alt="프로필이미지"
                                width={180}
                                height={180}
                            />
                        </div>
                        <Heading
                            tag="h2"
                            className="text-center mt-7"
                        >
                            유저닉네임, 님 <br />
                            안녕하세요
                        </Heading>
                        <Button
                            type="button"
                            className="mt-5 rounded-[1.875rem] !py-2 w-[10rem]"
                            variant="sand"
                        >
                            로그아웃
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default ProfileToggle;
