"use client";

import { useState } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";

type Section = "dashboard" | "content" | "services" | "bookings" | "media";

const NAV: { key: Section; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "content", label: "Page Content" },
  { key: "services", label: "Service Listings" },
  { key: "bookings", label: "Bookings" },
  { key: "media", label: "Media Library" },
];

type Service = { name: string; category: string; active: boolean };

const INITIAL_SERVICES: Service[] = [
  { name: "Mobile App Development", category: "IT Services", active: true },
  { name: "Digital Presence Audit", category: "IT Services", active: true },
  { name: "Algebra Tutoring", category: "Tutoring", active: true },
  { name: "Trigonometry Tutoring", category: "Tutoring", active: true },
  { name: "ESL", category: "Tutoring", active: true },
  { name: "Virginia SOL Prep", category: "Exam Prep", active: true },
  { name: "SAT Prep", category: "Exam Prep", active: true },
  { name: "Lesson Plan Development", category: "Educator Support", active: true },
  { name: "IEP Navigation", category: "Special Education", active: false },
];

const BOOKINGS = [
  { date: "Aug 10", time: "10:00 AM", type: "IT Consultation", client: "R. Nguyen", status: "Confirmed" },
  { date: "Aug 11", time: "2:30 PM", type: "Tutoring Trial", client: "M. Alvarez (parent)", status: "Confirmed" },
  { date: "Aug 12", time: "9:00 AM", type: "IEP Review", client: "T. Brooks", status: "Pending" },
  { date: "Aug 13", time: "1:00 PM", type: "IT Consultation", client: "J. Park", status: "Confirmed" },
];

export default function AdminClient() {
  const [section, setSection] = useState<Section>("dashboard");
  const [heroHeadline, setHeroHeadline] = useState(
    "Bespoke software for your business. Specialized tutoring for your student."
  );
  const [heroSub, setHeroSub] = useState(
    "One team, two disciplines: custom mobile apps and digital growth strategy for companies, plus K-12 tutoring and IEP navigation for students."
  );
  const [saveLabel, setSaveLabel] = useState("Save changes");
  const [services, setServices] = useState(INITIAL_SERVICES);

  const toggleService = (i: number) => {
    setServices((prev) => {
      const next = prev.slice();
      next[i] = { ...next[i], active: !next[i].active };
      return next;
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          borderRight: "1px solid var(--color-divider)",
          padding: "var(--space-4) var(--space-3)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: "var(--font-heading-weight)" as unknown as number,
            fontSize: 16,
            marginBottom: "var(--space-4)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ position: "relative", width: 18, height: 18, flex: "none" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 2,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--color-accent)",
                mixBlendMode: "multiply",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: 0,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--color-accent-2)",
                mixBlendMode: "multiply",
              }}
            />
          </span>
          Admin Portal
        </div>
        {NAV.map((n) => (
          <button
            key={n.key}
            onClick={() => setSection(n.key)}
            className={`btn ${section === n.key ? "btn-primary" : "btn-ghost"}`}
            style={{ justifyContent: "flex-start" }}
          >
            {n.label}
          </button>
        ))}
        <Link href="/" className="btn btn-ghost" style={{ justifyContent: "flex-start", marginTop: "auto" }}>
          ← Back to site
        </Link>
      </aside>

      <main style={{ padding: "var(--space-6) var(--space-6)" }}>
        {section === "dashboard" && (
          <>
            <h2 style={{ marginBottom: "var(--space-4)" }}>Dashboard</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              <div className="card elev-sm">
                <span className="card-kicker">Upcoming bookings</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  12
                </h3>
              </div>
              <div className="card elev-sm">
                <span className="card-kicker">New messages</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  4
                </h3>
              </div>
              <div className="card elev-sm">
                <span className="card-kicker">Active service listings</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  10
                </h3>
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: 13 }}>
              Use the sidebar to edit page content, manage service listings, review bookings, or
              upload media — no code required.
            </p>
          </>
        )}

        {section === "content" && (
          <>
            <h2 style={{ marginBottom: "var(--space-2)" }}>Page Content</h2>
            <p className="text-muted" style={{ fontSize: 13, marginBottom: "var(--space-4)" }}>
              Edit homepage copy. Changes save automatically.
            </p>
            <div className="card elev-sm" style={{ maxWidth: 640, gap: "var(--space-3)" }}>
              <div className="field">
                <label htmlFor="hh">Hero headline</label>
                <input
                  id="hh"
                  className="input"
                  value={heroHeadline}
                  onChange={(e) => {
                    setHeroHeadline(e.target.value);
                    setSaveLabel("Save changes");
                  }}
                />
              </div>
              <div className="field">
                <label htmlFor="hs">Hero subtext</label>
                <textarea
                  id="hs"
                  className="input"
                  value={heroSub}
                  onChange={(e) => {
                    setHeroSub(e.target.value);
                    setSaveLabel("Save changes");
                  }}
                />
              </div>
              <button className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => setSaveLabel("Saved ✓")}>
                {saveLabel}
              </button>
            </div>
          </>
        )}

        {section === "services" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <h2 style={{ marginBottom: 0 }}>Service Listings</h2>
              <button className="btn btn-primary">+ Add listing</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>
                      <span className={`tag ${s.active ? "tag-accent" : "tag-neutral"}`}>
                        {s.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost" onClick={() => toggleService(i)}>
                        {s.active ? "Hide" : "Show"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {section === "bookings" && (
          <>
            <h2 style={{ marginBottom: "var(--space-4)" }}>Bookings &amp; Schedule</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Client</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b, i) => (
                  <tr key={i}>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.type}</td>
                    <td>{b.client}</td>
                    <td>
                      <span className="tag tag-accent">{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {section === "media" && (
          <>
            <h2 style={{ marginBottom: "var(--space-2)" }}>Media Library</h2>
            <p className="text-muted" style={{ fontSize: 13, marginBottom: "var(--space-4)" }}>
              Drag and drop to upload or replace images used across the site.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-4)" }}>
              <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                <ImageSlot placeholder="Homepage hero" />
              </div>
              <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                <ImageSlot placeholder="Founder photo" />
              </div>
              <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                <ImageSlot placeholder="Chairwoman photo" />
              </div>
              <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                <ImageSlot placeholder="Add new asset" />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
