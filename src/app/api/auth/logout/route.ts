import { NextResponse } from "next/server";
import { getCookieName } from "@/lib/abAuth";

export async function POST() {
  const resp = NextResponse.json({ ok: true });
  resp.cookies.set(getCookieName(), "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return resp;
}
