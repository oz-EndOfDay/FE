"use client";
import Link from "next/link";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

type MenuItem = {
    id: number;
    label: string;
    path: string;
    icon: string;
};

const menuItems: MenuItem[] = [
    {
        id: 1,
        label: "Home",
        icon: "/icons/home.svg",
        path: "/",
    },
    {
        id: 2,
        label: "Diary",
        icon: "/icons/diary.svg",
        path: "/diary",
    },
    {
        id: 3,
        label: "My",
        icon: "/icons/me.svg",
        path: "/my",
    },
    {
        id: 4,
        label: "Exchange",
        icon: "/icons/exchange.svg",
        path: "/exchange",
    },
    {
        id: 5,
        label: "Friend",
        icon: "/icons/friend.svg",
        path: "/friend",
    },
    {
        id: 6,
        label: "example",
        icon: "",
        path: "/example",
    },
];

const Sidebar = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    console.log(token);
    return (
        <aside className="md:w-[8rem] w-full md:h-full h-[5rem] bg-primary text-base flex md:flex-col flex-row fixed left-0 bottom-0 justify-center z-50">
            <ul className="flex md:flex-col flex-row md:space-y-10 space-x-6 md:space-x-0 w-full justify-center items-center">
                {menuItems.map(item => (
                    <li
                        key={item.id}
                        className="flex items-center"
                    >
                        <Link
                            href={item.id === 1 && token ? "/main" : item.path}
                            //토큰이 있으면 메인 클릭시 로그인 페이지가 아닌 메인 페이지로 가게 설정
                            className="flex rounded-xl md:w-[5rem] md:h-[5rem] w-[3.5rem] h-[3.5rem] relative shadow-md justify-center items-center bg-beige"
                        >
                            <span className="md:w-[2rem] md:h-[2rem] w-[1.5rem] h-[1.5rem] relative">
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    fill
                                    className="object-contain"
                                />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
