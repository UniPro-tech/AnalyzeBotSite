import Image from "next/image";
import Link from "next/link";
import "../app/globals.css";
import { HeaderFooterStyles } from "@/constants/styles";

export const dynamic = "force-static";

const upperItemClassName =
  "mb-4 md:mb-0 flex flex-col items-start w-[30%] h-full";

export default function Footer() {
  return (
    <footer className={`${HeaderFooterStyles.base.wrapper}`}>
      <div
        className={`${HeaderFooterStyles.base.common} ${HeaderFooterStyles.base.footer}`}
      >
        <div
          id="footer-upper"
          className="flex flex-col md:flex-row justify-between items-start max-w-6xl px-2 w-full"
        >
          <div id="footer-left" className={`${upperItemClassName}`}>
            <h4 className="text-lg font-bold mb-2">活動解析くん(仮)</h4>
            <p className={`${HeaderFooterStyles.paragraph} wrap-`}>
              Discordサーバーの活動を解析するツールです。
              <br />
              サーバーの活動状況を可視化し、
              <wbr />
              管理者がサーバー
              <wbr />
              運営に役立てることができます。
            </p>
          </div>
          <div id="footer-center" className={`${upperItemClassName}`}>
            <nav className="flex flex-col space-y-2 items-start">
              <Link href="/invite" className={`${HeaderFooterStyles.link}`}>
                導入する
              </Link>
              <Link href="#" className={`${HeaderFooterStyles.link}`}>
                使い方を見る
              </Link>
              <Link
                href="/legal/terms"
                className={`${HeaderFooterStyles.link}`}
              >
                利用規約
              </Link>
              <Link
                href="/legal/privacy"
                className={`${HeaderFooterStyles.link}`}
              >
                プライバシー・ポリシー
              </Link>
            </nav>
          </div>
          <div id="footer-right" className={`${upperItemClassName}`}>
            <h2 className="text-lg font-bold mb-2">関連リンク</h2>
            <Link href="https://uniproject.jp">
              <Image
                src={"/imgs/common/powered_by_unipro_Black.webp"}
                alt="Powered by UniProject"
                width={200}
                height={50}
              />
            </Link>
          </div>
        </div>
        <div id="footer-under">
          <span>
            &copy;{" "}
            {new Date().getFullYear() > 2026
              ? `2026-${new Date().getFullYear()}`
              : "2026"}{" "}
            UniProject. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
