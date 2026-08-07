import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "var(--space-6) var(--space-4) var(--space-4)",
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "var(--space-6)",
            alignItems: "center",
          }}
        >
          <div>
            <p className="tag tag-outline" style={{ marginBottom: "var(--space-2)" }}>
              Serving businesses and students across Virginia
            </p>
            <h1
              style={{
                fontSize: 44,
                lineHeight: 1.12,
                maxWidth: "23ch",
                textWrap: "pretty",
                marginBottom: "var(--space-3)",
              }}
            >
              Bespoke software for your business. Specialized tutoring for your student.
            </h1>
            <p style={{ fontSize: 16, maxWidth: "46ch", opacity: 0.85 }}>
              One team, two disciplines: we build custom mobile apps and digital growth strategy
              for companies, and we coach K-12 students — including IEP navigation and
              learning-disability support — toward measurable academic gains.
            </p>
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-3)" }}>
              <Link href="/it-services" className="btn btn-primary">
                For Businesses
              </Link>
              <Link href="/tutoring" className="btn btn-secondary">
                For Students &amp; Parents
              </Link>
            </div>
          </div>
          <div className="halftone" style={{ aspectRatio: "4/3", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <ImageSlot placeholder="Recommended: advisor reviewing a mobile app mockup with a small-business owner, or a tutor working with a student" />
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "var(--space-6) var(--space-4)" }}>
          <h6 style={{ color: "var(--color-accent)" }}>Two pillars</h6>
          <h2 style={{ maxWidth: "24ch", marginBottom: "var(--space-4)" }}>
            Whichever brought you here, we&apos;ve built a practice around it.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <div className="card elev-sm" style={{ gap: "var(--space-3)" }}>
              <span className="card-kicker">Bespoke IT Services</span>
              <h3 className="card-title" style={{ fontSize: 22 }}>
                Technology that moves revenue
              </h3>
              <p className="card-body" style={{ fontSize: 14, opacity: 0.85 }}>
                Custom iOS &amp; Android apps and a full audit of your digital presence — where
                you&apos;re losing customers, and how to fix it.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "var(--space-2)" }}>
                <Link href="/it-services">Mobile App Development →</Link>
                <Link href="/it-services">Digital Presence &amp; CX Audit →</Link>
              </div>
            </div>
            <div className="card elev-sm" style={{ gap: "var(--space-3)" }}>
              <span className="card-kicker" style={{ color: "var(--color-accent-2)" }}>
                Academic &amp; Special Ed
              </span>
              <h3 className="card-title" style={{ fontSize: 22 }}>
                Tutoring built around the student
              </h3>
              <p className="card-body" style={{ fontSize: 14, opacity: 0.85 }}>
                Math, ESL, Virginia SOL &amp; SAT prep, plus lesson-plan development and hands-on
                IEP navigation for families and educators.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "var(--space-2)" }}>
                <Link href="/tutoring">Math &amp; Exam Prep →</Link>
                <Link href="/tutoring">IEP &amp; Special Education Support →</Link>
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "var(--space-6) var(--space-4)" }}>
          <h6 style={{ color: "var(--color-accent)" }}>What clients &amp; families say</h6>
          <h2 style={{ marginBottom: "var(--space-4)" }}>Trusted on both sides of the business</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)" }}>
            <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 16, borderLeft: "none" }}>
              &ldquo;Our new app doubled repeat orders in a single quarter. They understood our
              customers better than we did.&rdquo;
              <footer className="text-muted" style={{ fontStyle: "normal", fontSize: 12, marginTop: "var(--space-2)" }}>
                — Owner, local retail chain
              </footer>
            </blockquote>
            <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 16 }}>
              &ldquo;Our son&apos;s IEP meetings finally felt manageable. They came prepared with
              language we didn&apos;t know we needed.&rdquo;
              <footer className="text-muted" style={{ fontStyle: "normal", fontSize: 12, marginTop: "var(--space-2)" }}>
                — Parent, Chesterfield County
              </footer>
            </blockquote>
            <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 16 }}>
              &ldquo;My daughter went from dreading the SOL math test to finishing early. The
              tutor found exactly where she&apos;d gotten stuck.&rdquo;
              <footer className="text-muted" style={{ fontStyle: "normal", fontSize: 12, marginTop: "var(--space-2)" }}>
                — Parent, Henrico County
              </footer>
            </blockquote>
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "var(--space-4) var(--space-4) var(--space-6)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              padding: "var(--space-4)",
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div>
              <h3 style={{ marginBottom: 4 }}>Ready to talk?</h3>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
                Book a free consultation — for a business audit, a tutoring trial, or an IEP
                review.
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
