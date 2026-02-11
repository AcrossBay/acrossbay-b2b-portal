"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        setErr("Credenziali non valide");
        return;
      }

      window.location.href = "/dashboard";
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px", display: "flex", alignItems: "center", justifyContent: "flex-start", backgroundImage: "url(/acrossbay-logo.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div style={{ maxWidth: "420px", width: "100%", backgroundColor: "rgba(255,255,255,0.85)", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px", backgroundColor: "black", color: "white", border: "none", cursor: "pointer" }}
          >
            {loading ? "..." : "Accedi"}
          </button>

          {err && <div style={{ color: "crimson" }}>{err}</div>}
        </form>
      </div>
    </main>
  );
}
