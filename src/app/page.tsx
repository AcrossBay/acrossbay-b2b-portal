import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Image
        src="/acrossbay-logo.jpg"
        alt="AcrossBay Logo"
        width={180}
        height={180}
        priority
      />

      <h1 style={{ marginTop: "20px" }}>
        AcrossBay B2B Portal
      </h1>

      <p style={{ maxWidth: "600px", marginTop: "15px" }}>
        Private business platform dedicated to professional operators.
        Access reserved to registered partners for order management,
        documentation and commercial materials.
      </p>

      <div style={{ marginTop: "25px", fontSize: "14px", color: "#555" }}>
        <p><strong>AcrossBay Pure & Co. Ltd</strong></p>
        <p>Company No: 16873154</p>
        <p>United Kingdom</p>
        <p>Email: info@acrossbay.com</p>
      </div>

      <a
        href="/login"
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "black",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Area Clienti
      </a>
    </main>
  );
}
