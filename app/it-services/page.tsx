import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bespoke IT Services — Mobile Apps & Digital Audits",
};

export default function ItServices() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-6)" }}>
          <p className="tag tag-accent" style={{ marginBottom: "var(--space-3)" }}>
            Bespoke IT Services
          </p>
          <h1 style={{ maxWidth: "20ch", textWrap: "pretty" }}>
            Custom software and digital strategy built to grow revenue.
          </h1>
          <p style={{ maxWidth: "56ch", fontSize: 16, opacity: 0.85 }}>
            We design and build mobile apps for iOS and Android, and we audit your digital
            presence to find exactly where customers are dropping off — then fix it.
          </p>
          <Link href="/booking" className="btn btn-primary" style={{ marginTop: "var(--space-2)" }}>
            Book an IT Consultation
          </Link>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-6) var(--space-4)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "start" }}>
            <div className="card elev-sm" style={{ gap: "var(--space-3)" }}>
              <span className="card-kicker">Mobile App Development</span>
              <h3 className="card-title" style={{ fontSize: 22 }}>
                Custom iOS &amp; Android apps
              </h3>
              <p className="card-body" style={{ fontSize: 14, opacity: 0.85 }}>
                From concept to launch: native and cross-platform apps built around your
                workflow, not a template.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.85, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Product discovery &amp; UX architecture</li>
                <li>Native iOS &amp; Android engineering</li>
                <li>Backend, APIs &amp; integrations</li>
                <li>App Store / Play Store launch &amp; support</li>
              </ul>
            </div>
            <div className="card elev-sm" style={{ gap: "var(--space-3)" }}>
              <span className="card-kicker" style={{ color: "var(--color-accent-2)" }}>
                Digital Presence &amp; Business Audit
              </span>
              <h3 className="card-title" style={{ fontSize: 22 }}>
                Find the deficiency. Fix the revenue.
              </h3>
              <p className="card-body" style={{ fontSize: 14, opacity: 0.85 }}>
                A full audit of your website, funnels and customer experience — with a
                prioritized plan to close the gaps.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.85, display: "flex", flexDirection: "column", gap: 6 }}>
                <li>Website &amp; funnel deficiency review</li>
                <li>Customer experience (CX) evaluation</li>
                <li>Competitive &amp; SEO positioning</li>
                <li>Revenue-growth roadmap</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-8) var(--space-4)" }}>
          <h6 style={{ color: "var(--color-accent)" }}>How it works</h6>
          <h2 style={{ marginBottom: "var(--space-6)" }}>A straightforward path from audit to launch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-4)" }}>
            <div>
              <h4 style={{ fontSize: 17 }}>1. Consultation</h4>
              <p className="text-muted" style={{ fontSize: 13 }}>
                A free call to understand your goals and current setup.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 17 }}>2. Audit &amp; scope</h4>
              <p className="text-muted" style={{ fontSize: 13 }}>
                We document deficiencies and propose a fixed scope.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 17 }}>3. Build</h4>
              <p className="text-muted" style={{ fontSize: 13 }}>
                Design and development, with regular checkpoints.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 17 }}>4. Launch &amp; support</h4>
              <p className="text-muted" style={{ fontSize: 13 }}>
                We ship, monitor, and keep improving with you.
              </p>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-6) var(--space-4) var(--space-8)" }}>
          <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 20, maxWidth: "60ch" }}>
            &ldquo;Our new app doubled repeat orders in a single quarter. They understood our
            customers better than we did.&rdquo;
            <footer className="text-muted" style={{ fontStyle: "normal", fontSize: 12, marginTop: "var(--space-2)" }}>
              — Owner, local retail chain
            </footer>
          </blockquote>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 var(--space-4) var(--space-8)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              padding: "var(--space-6)",
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div>
              <h3 style={{ marginBottom: 4 }}>Ready for a digital audit?</h3>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
                Bring your current site or app — we&apos;ll tell you what&apos;s costing you
                customers.
              </p>
            </div>
            <Link href="/booking" className="btn btn-primary">
              Book a Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
