"use client";

import "../styles/globals.css";
import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import ProfileToggle from "@/components/ui/ProfileToggle";
import MyInfoSidebar from "@/components/ui/MyInfoSidebar";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "@/store/store";

export default function RootLayout(props: {children: React.ReactNode}) {
    const pathname = usePathname();
    const {children} = props;
    const isMyPage = pathname.includes("/my");
    const [queryClient] = useState(() => new QueryClient());
    return (
        <html suppressHydrationWarning>
            <body>
                <ReduxProvider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <div className="flex min-h-full flex-col">
                            <Header />
                            <div className="flex flex-1">
                                <Sidebar />
                                {/* "/my" 경로일 때 MyInfoSidebar, 아닐 때 ProfileToggle */}
                                {isMyPage ? <MyInfoSidebar /> : <ProfileToggle />}
                                <main className="flex-1 flex justify-center overflow-y-auto px-[2rem] pb-[7rem] pt-[6rem] md:pb-[2.5rem] md:py-[2.5rem] md:pl-[3rem]">
                                    <div className="max-w-[68.75rem] w-full min-h-0 flex flex-col">{children}</div>
                                </main>
                            </div>
                        </div>
                    </QueryClientProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
