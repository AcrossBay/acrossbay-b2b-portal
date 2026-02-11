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
    <main style={{ padding: "40px", maxWidth: "420px", margin: "0 auto" }}>
      <img src="/acrossbay-logo.jpg" alt="AcrossBay Logo" style={{ display: "block", margin: "0 auto 20px auto", maxWidth: "200px" }} />
      <h1>Login B2B</h1>

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
    </main>
  );
}
