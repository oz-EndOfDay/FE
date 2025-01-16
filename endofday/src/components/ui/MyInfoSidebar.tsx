"use client";
import React, {useState} from "react";
import Link from "next/link";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {SlUser} from "react-icons/sl";
import {SlTrash} from "react-icons/sl";
import {RiMoreLine} from "react-icons/ri";
const MyInfoSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            {/* 웹 */}
            <nav className={`min-h-screen bg-warmgray px-10 flex-col items-center md:flex hidden ml-[8rem] z-50 relative`}>
                <ul className="space-y-10 sticky top-[200px] left-0 w-full text-center">
                    <li>
                        <Link href="/my">
                            <span className="font-bold">내 정보</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/my/record">
                            <span className="font-bold">나의 기록</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/my/remove">
                            <span className="font-bold">휴지통</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <button
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsMenuOpen(true)}
            >
                <RiMoreLine size={20} />
            </button>

            {/* 모바일 */}
            <nav
                className={`fixed top-1/2 left-1/2 bg-warmgray rounded-lg p-[2.3rem] flex-col items-center z-50 transition-transform duration-500 ease-in-out translate-x-[-50%] translate-y-[-50%] 
    ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} md:hidden`}
            >
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-3 right-4 text-xl text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                <ul className="text-center space-y-6">
                    <li>
                        <Link
                            href="/my"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                내 정보 <SlUser size={20} />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/my/record"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                나의 기록 <IoCalendarNumberOutline size={20} />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/my/remove"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                휴지통 <SlTrash size={20} />
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* 배경 클릭 시 메뉴 닫기 */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </>
    );
};
export default MyInfoSidebar;
