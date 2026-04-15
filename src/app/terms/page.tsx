import { redirect } from "next/navigation";

export default function PrivacyPolicyRedirect() {
  redirect("/legal/terms");
}
