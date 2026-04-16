import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const path = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(path)}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/((?!login|_next|api|img).*)", "/dashboard"], // Specify the routes the middleware applies to
};
