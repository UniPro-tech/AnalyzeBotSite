import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "招待リンク",
};

export default function PostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <meta
        httpEquiv="refresh"
        content="0; URL='https://discord.com/oauth2/authorize?client_id=1480956404880904232&permissions=4505798919802000&integration_type=0&scope=bot+applications.commands'"
      />
      <span>リダイレクト中...</span>
    </main>
  );
}
