import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";
import { dataDB } from "@/lib/db";
import { DISCORD_API_BASE, type Guild } from "@/types/discord";

export default async function RedirectToFirstGuild() {
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
  const firstGuildId = filteredGuilds[0].id;
  redirect(`/dashboard/${firstGuildId}`);
}
