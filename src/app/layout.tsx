import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "活動解析くん(仮) - Discordサーバーの活動を解析するツール",
    template: "%s - 活動解析くん(仮)",
  },
  description:
    "活動解析くん(仮)は、Discordサーバーの活動を解析するツールです。サーバーの活動状況を可視化し、管理者がサーバー運営に役立てることができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between flex-row">
          <h1 className="text-2xl font-bold">活動解析くん(仮)</h1>
          <nav className="flex flex-row items-center space-x-2">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className="underline hover:no-underline hover:text-blue-400"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="underline hover:no-underline hover:text-blue-400"
                >
                  使い方
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="underline hover:no-underline hover:text-blue-400"
                >
                  コマンド一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/invite"
                  className="underline hover:no-underline hover:text-blue-400"
                >
                  導入する
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
