import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;
    return (
        <html suppressHydrationWarning>
            <body className="h-full">
                <div className="flex h-full">
                    <Sidebar />
                    <Header />
                    <main className="flex-1 p-10 pb-[10rem] md:p-20 md:pl-[13rem] overflow-auto h-full">{children}</main>
                </div>
            </body>
        </html>
    );
}
