import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 space-y-20">
      <section className="text-center flex flex-col items-center justify-center lg:flex-row gap-12">
        <div>
          <div>
            <h2 className="text-4xl font-bold mb-8">活動解析くん(仮)</h2>
            <p className="text-lg text-gray-600 mb-12">
              Discordサーバーの活動を解析するツールです。
            </p>
          </div>
          <div className="flex space-x-4 justify-center">
            <Link
              href="#"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              導入する
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              使い方を見る
            </Link>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-bold mb-4">ニュース</h3>
        <ul className="list-disc list-inside text-left text-gray-700"></ul>
      </section>
    </main>
  );
}
