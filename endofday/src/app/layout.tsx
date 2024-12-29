import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;

    return (
        <html suppressHydrationWarning>
            <body className="h-full">
                <div className="flex h-full flex-col">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto p-8 pt-[4rem] md:p-10">
                            <div className="mx-auto max-w-[1200px] md:pl-[8rem] pb-[5rem]">{children}</div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
