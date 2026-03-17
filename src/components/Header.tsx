import Link from "next/link";
import "../app/globals.css";
import { HeaderFooterStyles } from "@/constants/styles";

export const dynamic = "force-static";

export default function Header() {
  return (
    <header
      className={`${HeaderFooterStyles.base.common} ${HeaderFooterStyles.base.header}`}
    >
      <h1 className="text-2xl font-bold">活動解析くん(仮)</h1>
      <nav className="flex flex-row items-center space-x-2">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={`${HeaderFooterStyles.link}`}>
              ホーム
            </Link>
          </li>
          <li>
            <Link href="#" className={`${HeaderFooterStyles.link}`}>
              使い方
            </Link>
          </li>
          <li>
            <Link href="#" className={`${HeaderFooterStyles.link}`}>
              コマンド一覧
            </Link>
          </li>
          <li>
            <Link href="/invite" className={`${HeaderFooterStyles.link}`}>
              導入する
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
