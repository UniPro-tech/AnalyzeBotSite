import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "招待リンク",
};

export default function PostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <meta
        httpEquiv="refresh"
        content="0; URL='https://discord.com/oauth2/authorize?client_id=1140576058765234238&permissions=4503599627570320&integration_type=0&scope=applications.commands+bot'"
      />
      <span>リダイレクト中...</span>
    </main>
  );
}
