import Image from "next/image";
import Link from "next/link";

const upperItemClassName =
  "mb-4 md:mb-0 flex flex-col items-start w-[30%] h-full";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 text-white text-center flex flex-col items-center justify-center space-y-8">
      <div
        id="footer-upper"
        className="flex flex-col md:flex-row justify-between items-start max-w-6xl px-4 w-full"
      >
        <div id="footer-left" className={`${upperItemClassName}`}>
          <h4 className="text-lg font-bold mb-2">活動解析くん(仮)</h4>
          <p className="text-sm text-gray-400 text-left wrap-anywhere">
            Discordサーバーの活動を解析するツールです。
            <br />
            サーバーの活動状況を可視化し、管理者がサーバー運営に役立てることができます。
          </p>
        </div>
        <div id="footer-center" className={`${upperItemClassName}`}>
          <nav className="flex flex-col space-y-2 items-start">
            <Link href="/invite" className="hover:underline">
              導入する
            </Link>
            <Link href="#" className="hover:underline">
              使い方を見る
            </Link>
            <Link href="#" className="hover:underline">
              利用規約
            </Link>
            <Link href="#" className="hover:underline">
              プライバシー・ポリシー
            </Link>
          </nav>
        </div>
        <div id="footer-right" className={`${upperItemClassName}`}>
          <h2 className="text-lg font-bold mb-2">関連リンク</h2>
          <Link href="https://uniproject.jp">
            <Image
              src={"/imgs/common/powered_by_unipro_White.webp"}
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
    </footer>
  );
}
