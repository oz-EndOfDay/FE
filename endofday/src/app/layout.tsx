import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;
    return (
        <html suppressHydrationWarning>
            <body>
                <div className="flex h-screen">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                </div>
            </body>
        </html>
    );
}
