import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "./auth";

export interface Guild {
  id: string;
  name: string;
  icon: string;
  banner: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export const DISCORD_API_BASE = "https://discord.com/api/v10";

export const getOAuth2Guilds = async (
  accessToken: string,
): Promise<Guild[]> => {
  const discordGuildsRes = await fetch(`${DISCORD_API_BASE}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 500, tags: ["discord-guilds"] },
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
  return (await discordGuildsRes.json()) as Guild[];
};
