import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "招待リンク",
};

export default function PostPage() {
  redirect(
    "https://discord.com/oauth2/authorize?client_id=1140576058765234238&permissions=4503599627570320&integration_type=0&scope=applications.commands+bot",
  );
}
