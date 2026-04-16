"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { dataDB } from "@/lib/db";
import { DISCORD_API_BASE, type Guild } from "@/types/discord";

export const enablePremium = async (guildId: string) => {
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
  const filteredGuilds = ((await discordGuildsRes.json()) as Guild[]).filter(
    (guild) => guild.owner,
  );
  const isOwner = filteredGuilds.some((guild) => {
    return guild.id === guildId;
  });

  if (!isOwner) {
    throw new Error("Forbidden");
  }

  const collection = dataDB.collection("guild_settings");
  // 1. データを取得（awaitを忘れずに）
  const settings = await collection.findOne({ guild_id: guildId });

  if (settings) {
    // 2. データを更新
    await collection.updateOne(
      { guild_id: guildId },
      { $set: { is_premium: true } },
    );
  } else {
    // データが存在しない場合の新規作成（必要であれば）
    await collection.insertOne({ guild_id: guildId, is_premium: true });
  }
};
