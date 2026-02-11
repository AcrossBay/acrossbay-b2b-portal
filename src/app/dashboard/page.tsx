import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CUSTOMERS } from "@/config/customers";
import { getCookieName, verifySession } from "@/lib/abAuth";

export default function DashboardPage() {
  const token = cookies().get(getCookieName())?.value;
  if (!token) redirect("/login");

  const session = verifySession(token);
  if (!session) redirect("/login");

  const cfg = CUSTOMERS[session.customerId] || {
    name: session.customerId,
    notes: "Cliente non configurato ancora (aggiungilo in src/config/customers.ts)",
  };

  return (
    <main style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <p>
        Cliente: <b>{cfg.name}</b> ({session.customerId})
      </p>

      <div style={{ padding: 12, border: "1px solid #ddd" }}>
        <p style={{ marginTop: 0 }}>
          <b>Note / Configurazione (placeholder)</b>
        </p>
        <p style={{ marginBottom: 0 }}>{cfg.notes}</p>
      </div>

      <form action="/api/auth/logout" method="post" style={{ marginTop: 16 }}>
        <button type="submit" style={{ padding: 10, cursor: "pointer" }}>
          Logout
        </button>
      </form>
    </main>
  );
}
