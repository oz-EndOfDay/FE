import React from "react";

export default function RootLayout(props: {children: React.ReactNode}) {
    const {children} = props;
    return (
        <html suppressHydrationWarning>
            <body>
                <div className="flex h-screen">
                    {/* Sidebar */}

                    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
                </div>
            </body>
        </html>
    );
}
