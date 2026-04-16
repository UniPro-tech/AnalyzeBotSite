"use server";

import { dataDB } from "@/lib/db";

export const enablePremium = async (guildId: string) => {
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
