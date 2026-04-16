"use server";
import { revalidateTag } from "next/cache";

export const revalidateCache = async () => {
  revalidateTag("discord-guilds", "max");
};
