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
