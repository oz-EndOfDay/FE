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
                    <main className="flex-1 px-10 pt-12 pb-[10rem] md:p-20 overflow-auto h-full">{children}</main>
                </div>
            </body>
        </html>
    );
}
