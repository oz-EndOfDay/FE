import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;
    return (
        <html suppressHydrationWarning>
            <body>
                <div className="flex h-screen">
                    <Sidebar />
                    <Header />
                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                </div>
            </body>
        </html>
    );
}
