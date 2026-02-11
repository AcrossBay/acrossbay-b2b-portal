import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CUSTOMERS } from "@/config/customers";

function Card(props: { title: string; desc: string; status?: string }) {
  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{props.title}</h3>
        {props.status ? (
          <span style={{ fontSize: 12, opacity: 0.7 }}>{props.status}</span>
        ) : null}
      </div>
      <p style={{ marginTop: 10, marginBottom: 0, opacity: 0.85, lineHeight: 1.5 }}>
        {props.desc}
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  // Auth light: se manca cookie → fuori
  const cookieStore = await cookies();
  const token = cookieStore.get("acrossbay_session")?.value;
  if (!token) redirect("/login");

  // Placeholder customerId: oggi fisso, domani lo prendiamo dalla sessione/ENV/DB
  const customerId = "ACROSS001";
  const customer = CUSTOMERS[customerId];

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Dashboard B2B</h1>
          <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.8 }}>
            Cliente: <b>{customer?.name ?? customerId}</b> ({customerId})
          </p>
          <p style={{ marginTop: 6, opacity: 0.7 }}>
            {customer?.notes ?? "Configurazione cliente non presente (aggiungila in src/config/customers.ts)."}
          </p>
        </div>

        <form action="/api/auth/logout" method="post">
          <button style={{ padding: "10px 12px", cursor: "pointer" }} type="submit">
            Logout
          </button>
        </form>
      </header>

      <section style={{ marginTop: 26 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          <Card
            title="Catalogo / Listini"
            status="Placeholder"
            desc="Qui inserirai i prodotti per categoria, minimi d’ordine, sconti e condizioni."
          />
          <Card
            title="Ordini"
            status="Placeholder"
            desc="Qui andrà il modulo d’ordine (una categoria = un ordine = un fornitore)."
          />
          <Card
            title="Documenti"
            status="Placeholder"
            desc="Download brochure, certificazioni, schede tecniche, comunicazioni."
          />
          <Card
            title="Pagamenti"
            status="Fase 2"
            desc="In futuro: Stripe / bonifico / fattura. Ora solo struttura."
          />
          <Card
            title="Spedizioni"
            status="Placeholder"
            desc="Tracking e condizioni di consegna per categoria/cliente."
          />
          <Card
            title="Assistenza"
            status="Placeholder"
            desc="Messaggi, segnalazioni, reclami, richieste e storico comunicazioni."
          />
        </div>
      </section>
    </main>
  );
}
