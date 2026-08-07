import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-divider)", marginTop: "var(--space-8)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-8) var(--space-4) var(--space-4)",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "var(--space-6)",
        }}
      >
        <div>
          <Image
            src="/assets/logo-seal-transparent.png"
            alt="BespokenIT seal"
            width={84}
            height={84}
            style={{ height: 84, width: 84, objectFit: "contain", marginBottom: "var(--space-2)" }}
          />
          <p className="text-muted" style={{ fontSize: 13, maxWidth: "32ch", margin: 0 }}>
            Custom software for growing businesses. Specialized tutoring and IEP guidance for K-12
            students.
          </p>
        </div>
        <div>
          <h6 style={{ marginBottom: "var(--space-2)" }}>IT Solutions</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <Link href="/it-services">Mobile App Development</Link>
            <Link href="/it-services">Digital Presence Audit</Link>
            <Link href="/booking">Book a Consultation</Link>
          </div>
        </div>
        <div>
          <h6 style={{ marginBottom: "var(--space-2)" }}>Tutoring &amp; IEP</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <Link href="/tutoring">Math &amp; Exam Prep</Link>
            <Link href="/tutoring">ESL</Link>
            <Link href="/tutoring">IEP Navigation</Link>
          </div>
        </div>
        <div>
          <h6 style={{ marginBottom: "var(--space-2)" }}>Company</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <Link href="/board">Board of Directors</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
      <div
        className="text-muted"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-4)",
          borderTop: "1px solid var(--color-divider)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          fontSize: 12,
        }}
      >
        <span>© 2026 BespokenIT. All rights reserved.</span>
        <span>Richmond, Virginia</span>
      </div>
    </footer>
  );
}
