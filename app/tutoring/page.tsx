import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PublicImageSlot from "@/components/PublicImageSlot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutoring & IEP Services — K-12 Academic Support",
};

function CategoryCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="card elev-sm">
      <span className="card-title" style={{ fontSize: 17 }}>
        {title}
      </span>
      <p className="card-body">{body}</p>
    </div>
  );
}

export default function Tutoring() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "var(--space-8) var(--space-4) var(--space-6)",
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "var(--space-6)",
            alignItems: "center",
          }}
        >
          <div>
            <p className="tag tag-accent-2" style={{ marginBottom: "var(--space-3)" }}>
              Tutoring &amp; IEP Services
            </p>
            <h1 style={{ maxWidth: "22ch", textWrap: "pretty" }}>
              K-12 tutoring, exam prep, and special-education guidance built around your student.
            </h1>
            <p style={{ maxWidth: "56ch", fontSize: 16, opacity: 0.85 }}>
              One-on-one and small-group instruction in math and English, targeted Virginia SOL
              and SAT prep, and hands-on support for educators and families navigating IEPs and
              learning disabilities.
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
              <Link href="/booking" className="btn btn-primary">
                Book a Trial Session
              </Link>
              <Link href="#iep" className="btn btn-secondary">
                IEP &amp; Special Education
              </Link>
            </div>
          </div>
          <div className="halftone" style={{ aspectRatio: "4/3", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <PublicImageSlot
              slotKey="tutoring-hero"
              placeholder="Recommended: a tutor working one-on-one with a student, or a small study group"
            />
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-6) var(--space-4)" }}>
          <h6 style={{ color: "var(--color-accent-2)" }}>Math</h6>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <CategoryCard title="Algebra" body="Foundational through Algebra II — building fluency, not just answers." />
            <CategoryCard title="Trigonometry" body="Unit circle, identities, and graphing, tied to what's tested in class." />
          </div>

          <h6 style={{ color: "var(--color-accent-2)" }}>English</h6>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <CategoryCard title="ESL" body="English as a Second Language support for reading, writing and conversation fluency." />
            <CategoryCard title="Reading & Writing" body="Comprehension and composition skills that carry across every subject." />
          </div>

          <h6 style={{ color: "var(--color-accent-2)" }}>Exam Prep</h6>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <CategoryCard title="Virginia SOL" body="Standards of Learning prep in math and reading, mapped to the actual test blueprint." />
            <CategoryCard title="SAT" body="Section-by-section strategy, timed practice, and score tracking." />
          </div>

          <h6 id="iep" style={{ color: "var(--color-accent-2)" }}>
            Special Education &amp; Educators
          </h6>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)" }}>
            <CategoryCard title="Lesson Plan Development" body="Standards-aligned lesson plans built with K-12 teachers." />
            <CategoryCard title="Learning Disability Assistance" body="Individualized strategies for dyslexia, ADHD and other learning differences." />
            <CategoryCard title="IEP Navigation" body="Coaching parents and educators through IEP meetings, goals and advocacy." />
          </div>
        </section>

        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-8) var(--space-4)" }}>
          <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: 20, maxWidth: "60ch" }}>
            &ldquo;Our son&apos;s IEP meetings finally felt manageable. They came prepared with
            language we didn&apos;t know we needed.&rdquo;
            <footer className="text-muted" style={{ fontStyle: "normal", fontSize: 12, marginTop: "var(--space-2)" }}>
              — Parent, Chesterfield County
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
              <h3 style={{ marginBottom: 4 }}>Not sure where to start?</h3>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>
                Book a free trial session or an IEP review — we&apos;ll recommend a plan.
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
