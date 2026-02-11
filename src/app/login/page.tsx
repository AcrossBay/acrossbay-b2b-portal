"use client";
export default function LoginPage() {
  return (
    <main style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login B2B</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/dashboard";
        }}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="email"
          placeholder="Email"
          required
          style={{ padding: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Accedi
        </button>
      </form>
    </main>
  );
}
