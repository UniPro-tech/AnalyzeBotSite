import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) unauthorized();
  return <Dashboard session={session.session} user={session.user} />;
}
