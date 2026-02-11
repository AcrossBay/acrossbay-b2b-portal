import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("acrossbay_session")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Accesso autorizzato.</p>
    </main>
  );
}
