import "../styles/globals.css";
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";
import AuthProvider from "@/store/authProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="flex min-h-full flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />

              <main className="flex-1 flex justify-center overflow-y-auto px-[2rem] pb-[7rem] pt-[6rem] md:pb-[2.5rem] md:py-[2.5rem] md:pl-[10.5rem]">
                <div className="max-w-[68.75rem] w-full min-h-0 flex flex-col">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
