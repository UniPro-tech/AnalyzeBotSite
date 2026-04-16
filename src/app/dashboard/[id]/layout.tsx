import type { Metadata } from "next";
import "../../globals.css";
import { headers } from "next/headers";
import { notFound, redirect, unauthorized } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";
import { dataDB } from "@/lib/db";
import { DISCORD_API_BASE, type Guild } from "@/types/discord";

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
  const tokenSets = await auth.api.getAccessToken({
    body: { providerId: "discord" },
    headers: await headers(),
  });
  const discordGuildsRes = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${tokenSets.accessToken}`,
    },
  });
  if (!discordGuildsRes.ok) {
    switch (discordGuildsRes.status) {
      case 404:
        notFound();
        break;
      case 401:
      case 403:
        await auth.api.signOut({ headers: await headers() });
        redirect("/login");
        break;
      default:
        console.log(
          `Discord API Error: ${discordGuildsRes.status} - ${await discordGuildsRes.text()}`,
        );
        throw new Error(`Discord API Error`);
    }
  }
  const collection = dataDB.collection("messages");
  const guildIdsInDb = await collection.distinct("guild_id");
  const guildIdSet = new Set(guildIdsInDb);

  const filteredGuilds = ((await discordGuildsRes.json()) as Guild[]).filter(
    (guild) => guildIdSet.has(guild.id),
  );

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
