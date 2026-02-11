import { NextResponse } from "next/server";
import { getCookieName, parseUsersEnv, signSession } from "@/lib/abAuth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email || "").toString().trim().toLowerCase();
  const password = (body?.password || "").toString();

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const users = parseUsersEnv();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession({ email: user.email, customerId: user.customerId });

  const resp = NextResponse.json({ ok: true, customerId: user.customerId });
  resp.cookies.set(getCookieName(), token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return resp;
}
