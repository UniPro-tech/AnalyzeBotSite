import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "招待リンク",
};

export default function PostPage() {
  redirect(
    "https://discord.com/oauth2/authorize?client_id=1480956404880904232&permissions=4505798919802000&integration_type=0&scope=bot+applications.commands",
  );
}
