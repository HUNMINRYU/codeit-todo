import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/Gnb";

export const metadata: Metadata = {
  title: "do it; - Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 시안 폰트: NanumSquare */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body className="min-h-screen">
        <Gnb />
        {children}
      </body>
    </html>
  );
}
