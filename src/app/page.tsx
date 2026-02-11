import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f5f7f8",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <Image
          src="/acrossbay-logo.jpg"
          alt="AcrossBay Logo"
          width={160}
          height={160}
          priority
        />

        <h1 style={{ marginTop: "20px" }}>
          AcrossBay B2B Portal
        </h1>

        <p style={{ maxWidth: "600px", marginTop: "15px", color: "#555" }}>
          Reserved business platform for professional partners.
          Secure access to orders, documentation and commercial materials.
        </p>

        <a
          href="/login"
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            backgroundColor: "black",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "500",
          }}
        >
          Access Area
        </a>
      </div>

      <footer
        style={{
          borderTop: "1px solid #e2e2e2",
          padding: "20px",
          textAlign: "center",
          fontSize: "13px",
          color: "#666",
        }}
      >
        <p><strong>AcrossBay Pure & Co. Ltd</strong></p>
        <p>Company No: 16873154 · United Kingdom</p>
        <p>Email: info@acrossbay.com</p>
        <p>© {new Date().getFullYear()} AcrossBay. All rights reserved.</p>
      </footer>
    </main>
  );
}
