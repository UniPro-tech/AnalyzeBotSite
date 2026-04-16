import { headers } from "next/headers";
import { notFound, redirect, unauthorized } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDataDB } from "@/lib/db";
import { DISCORD_API_BASE, type Guild } from "@/types/discord";

export const dynamic = "force-dynamic";

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
  const dataDB = getDataDB();
  const collection = dataDB.collection("messages");
  const guildIdsInDb = await collection.distinct("guild_id");
  const guildIdSet = new Set(guildIdsInDb);

  const filteredGuilds = ((await discordGuildsRes.json()) as Guild[]).filter(
    (guild) => guildIdSet.has(guild.id),
  );
  if (filteredGuilds.length === 0) {
    // ギルドが見つからない場合の処理
    redirect("/invite");
  }
  const firstGuildId = filteredGuilds[0].id;
  redirect(`/dashboard/${firstGuildId}`);
}
