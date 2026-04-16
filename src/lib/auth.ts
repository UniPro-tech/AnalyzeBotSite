import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { genericOAuth } from "better-auth/plugins";
import { authDB } from "@/lib/db";

export const auth = betterAuth({
  database: mongodbAdapter(authDB),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      scope: ["guilds", "openid"],
      disableIdTokenSignIn: false,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "unique",
          clientId: process.env.UNIQUE_CLIENT_ID!,
          clientSecret: process.env.UNIQUE_CLIENT_SECRET!,
          scopes: ["openid", "profile", "email"],
          discoveryUrl:
            "https://auth.uniproject.jp/.well-known/openid-configuration",
          overrideUserInfo: true,
        },
      ],
    }),
  ],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["unique"],
      allowDifferentEmails: true,
    },
  },
});
