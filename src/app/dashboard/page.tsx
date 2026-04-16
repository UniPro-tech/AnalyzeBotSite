import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";
import type { Guild } from "@/types/discord";
import { dataDB } from "@/lib/db";

const DISCORD_API_BASE = "https://discord.com/api/v10";

export default async function Home() {
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
  const collection = dataDB.collection("messages");
  const guildIdsInDb = await collection.distinct("guild_id");
  const guildIdSet = new Set(guildIdsInDb);

  const filteredGuilds = ((await discordGuildsRes.json()) as Guild[]).filter(
    (guild) => guildIdSet.has(guild.id),
  );

  return (
    <Dashboard
      session={session.session}
      user={session.user}
      guilds={filteredGuilds}
    />
  );
}
