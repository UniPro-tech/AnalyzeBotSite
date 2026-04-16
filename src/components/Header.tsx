"use client";

import Link from "next/link";
import { useState } from "react";
import "../app/globals.css";
import { HeaderFooterStyles } from "@/constants/styles";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/howto", label: "使い方" },
    { href: "/commands", label: "コマンド一覧" },
    { href: "/invite", label: "導入する" },
    { href: "/dashboard", label: "ダッシュボード" },
  ];

  return (
    <header className={`${HeaderFooterStyles.base.wrapper}`}>
      <div
        className={`${HeaderFooterStyles.base.common} ${HeaderFooterStyles.base.header}`}
      >
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-lg sm:text-2xl font-bold">
            <Link href="/">活動分析くん</Link>
          </h1>
          <button
            type="button"
            className="sm:hidden p-2 hover:opacity-75 transition-opacity"
            onClick={toggleMenu}
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>メニュー</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-4 sm:mt-0`}
        >
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${HeaderFooterStyles.link} block`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
