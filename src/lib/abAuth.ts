import crypto from "crypto";

const COOKIE_NAME = "ab_sess";

export function getCookieName() {
  return COOKIE_NAME;
}

function secret() {
  const s = process.env.AB_AUTH_SECRET;
  if (!s) throw new Error("Missing AB_AUTH_SECRET");
  return s;
}

export function parseUsersEnv() {
  const raw = process.env.AB_USERS || "";
  // email|password|customerId ; email|password|customerId
  return raw
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((row) => {
      const [email, password, customerId] = row.split("|").map((p) => (p || "").trim());
      return { email: (email || "").toLowerCase(), password, customerId };
    })
    .filter((u) => u.email && u.password && u.customerId);
}

export function signSession(payload: { email: string; customerId: string }) {
  const data = JSON.stringify({
    email: payload.email.toLowerCase(),
    customerId: payload.customerId,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 giorni
  });

  const sig = crypto.createHmac("sha256", secret()).update(data).digest("base64url");
  return Buffer.from(data).toString("base64url") + "." + sig;
}

export function verifySession(token: string): { email: string; customerId: string } | null {
  const [b64, sig] = (token || "").split(".");
  if (!b64 || !sig) return null;

  const data = Buffer.from(b64, "base64url").toString("utf8");
  const expected = crypto.createHmac("sha256", secret()).update(data).digest("base64url");
  if (sig !== expected) return null;

  const parsed = JSON.parse(data) as { email: string; customerId: string; exp: number };
  if (!parsed?.email || !parsed?.customerId || !parsed?.exp) return null;
  if (Date.now() > parsed.exp) return null;

  return { email: parsed.email, customerId: parsed.customerId };
}
