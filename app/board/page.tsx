import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "Board of Directors",
};

const MEMBERS = [
  { title: "Board Member", name: "Board Member Name 1", bio: "Bio placeholder: professional background and area of expertise." },
  { title: "Board Member", name: "Board Member Name 2", bio: "Bio placeholder: professional background and area of expertise." },
  { title: "Executive Officer", name: "Board Member Name 3", bio: "Bio placeholder: professional background and area of expertise." },
  { title: "Executive Officer", name: "Board Member Name 4", bio: "Bio placeholder: professional background and area of expertise." },
  { title: "Board Member", name: "Board Member Name 5", bio: "Bio placeholder: professional background and area of expertise." },
  { title: "Board Member", name: "Board Member Name 6", bio: "Bio placeholder: professional background and area of expertise." },
];

export default function Board() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-8)" }}>
        <p className="tag tag-outline" style={{ marginBottom: "var(--space-3)" }}>
          Governance
        </p>
        <h1 style={{ marginBottom: "var(--space-2)" }}>Board of Directors</h1>
        <p className="text-muted" style={{ maxWidth: "60ch", marginBottom: "var(--space-8)" }}>
          The people guiding BespokenIT across both of our practices.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
          <div className="card elev-md" style={{ flexDirection: "row", gap: "var(--space-4)", padding: "var(--space-4)" }}>
            <div className="halftone" style={{ width: 120, height: 120, flex: "none", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <ImageSlot placeholder="Founder photo" />
            </div>
            <div>
              <span className="card-kicker">Founder</span>
              <h3 className="card-title" style={{ fontSize: 19 }}>
                Founder Name
              </h3>
              <p className="card-body" style={{ fontSize: 13 }}>
                Bio placeholder: founding vision, background in software and education, years of
                experience.
              </p>
              <a href="#" aria-label="LinkedIn profile" style={{ fontSize: 12 }}>
                LinkedIn →
              </a>
            </div>
          </div>
          <div className="card elev-md" style={{ flexDirection: "row", gap: "var(--space-4)", padding: "var(--space-4)" }}>
            <div className="halftone" style={{ width: 120, height: 120, flex: "none", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <ImageSlot placeholder="Chairwoman photo" />
            </div>
            <div>
              <span className="card-kicker" style={{ color: "var(--color-accent-2)" }}>
                Chairwoman
              </span>
              <h3 className="card-title" style={{ fontSize: 19 }}>
                Chairwoman Name
              </h3>
              <p className="card-body" style={{ fontSize: 13 }}>
                Bio placeholder: governance experience, strategic oversight, community leadership.
              </p>
              <a href="#" aria-label="LinkedIn profile" style={{ fontSize: 12 }}>
                LinkedIn →
              </a>
            </div>
          </div>
        </div>

        <h6 style={{ marginBottom: "var(--space-4)" }}>Executive &amp; Board Members</h6>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)" }}>
          {MEMBERS.map((m, i) => (
            <div className="card elev-sm" key={i}>
              <div
                className="halftone"
                style={{ width: "100%", aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "var(--space-2)" }}
              >
                <ImageSlot placeholder={`${m.name} photo`} />
              </div>
              <span className="card-kicker">{m.title}</span>
              <h4 className="card-title" style={{ fontSize: 16 }}>
                {m.name}
              </h4>
              <p className="card-body" style={{ fontSize: 13 }}>
                {m.bio}
              </p>
              <a href="#" aria-label="LinkedIn profile" style={{ fontSize: 12 }}>
                LinkedIn →
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
