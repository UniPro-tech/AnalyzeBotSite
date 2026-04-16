import type { Metadata } from "next";
import "../../globals.css";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";
import { getDataDB } from "@/lib/db";
import { getOAuth2Guilds } from "@/lib/discord";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Discordサーバーの活動を解析するBot - 活動分析くん",
    template: "%s - 活動分析くん",
  },
  description:
    "活動分析くんは、Discordサーバーの活動を解析するDiscordBotです。サーバーの活動状況を可視化し、管理者がサーバー運営に役立てることができます。",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id: currentId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) unauthorized();
  const tokenSet = await auth.api.getAccessToken({
    headers: await headers(),
    body: { providerId: "discord" },
  });

  const guilds = await getOAuth2Guilds(tokenSet.accessToken);
  const dataDB = getDataDB();
  const collection = dataDB.collection("messages");
  const guildIdsInDb = await collection.distinct("guild_id");
  const guildIdSet = new Set(guildIdsInDb);

  const filteredGuilds = guilds.filter((guild) => guildIdSet.has(guild.id));

  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const isPremiumUser = accounts.some(
    (account) => account.providerId === "unique",
  );

  if (!filteredGuilds.some((guild) => guild.id === currentId)) {
    unauthorized();
  }

  return (
    <Dashboard
      session={session.session}
      user={session.user}
      guilds={filteredGuilds}
      currentId={currentId}
      isPremiumUser={isPremiumUser}
    >
      {children}
    </Dashboard>
  );
}
