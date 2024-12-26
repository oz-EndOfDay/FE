import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;
    return (
        <html suppressHydrationWarning>
            <body className="overflow-auto">
                <div className="flex h-screen">
                    <Sidebar />
                    <main className="flex-1 p-10 pb-[10rem] md:p-20">{children}</main>
                </div>
            </body>
        </html>
    );
}
