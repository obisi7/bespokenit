"use client";

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import MediaSlotTile from "@/components/MediaSlotTile";

type Section = "dashboard" | "content" | "services" | "bookings" | "media";

const NAV: { key: Section; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "content", label: "Page Content" },
  { key: "services", label: "Service Listings" },
  { key: "bookings", label: "Bookings" },
  { key: "media", label: "Media Library" },
];

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  it: "IT Consultation",
  tutoring: "Tutoring Trial",
  iep: "IEP Review",
};

export default function AdminClient() {
  const [section, setSection] = useState<Section>("dashboard");
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();

  const bookingCount = useQuery(api.bookings.count, isAuthenticated ? {} : "skip");
  const unreadMessages = useQuery(api.messages.unreadCount, isAuthenticated ? {} : "skip");
  const activeServiceCount = useQuery(api.services.activeCount, isAuthenticated ? {} : "skip");

  const heroContent = useQuery(api.pageContent.getHome);
  const updateHome = useMutation(api.pageContent.updateHome);
  const [heroHeadline, setHeroHeadline] = useState<string | null>(null);
  const [heroSub, setHeroSub] = useState<string | null>(null);
  const [saveLabel, setSaveLabel] = useState("Save changes");
  const headlineValue = heroHeadline ?? heroContent?.heroHeadline ?? "";
  const subValue = heroSub ?? heroContent?.heroSub ?? "";

  const services = useQuery(api.services.list, isAuthenticated ? {} : "skip");
  const toggleService = useMutation(api.services.toggle);
  const addService = useMutation(api.services.add);

  const bookings = useQuery(api.bookings.list, isAuthenticated ? {} : "skip");

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/sign-in");
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
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <Link href="/" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
            ← Back to site
          </Link>
          <button onClick={handleSignOut} className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
            Sign out
          </button>
        </div>
      </aside>

      <main style={{ padding: "var(--space-6) var(--space-6)" }}>
        {section === "dashboard" && (
          <>
            <h2 style={{ marginBottom: "var(--space-4)" }}>Dashboard</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              <div className="card elev-sm">
                <span className="card-kicker">Upcoming bookings</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  {bookingCount ?? "…"}
                </h3>
              </div>
              <div className="card elev-sm">
                <span className="card-kicker">New messages</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  {unreadMessages ?? "…"}
                </h3>
              </div>
              <div className="card elev-sm">
                <span className="card-kicker">Active service listings</span>
                <h3 className="card-title" style={{ fontSize: 26 }}>
                  {activeServiceCount ?? "…"}
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
              Edit homepage copy.
            </p>
            <div className="card elev-sm" style={{ maxWidth: 640, gap: "var(--space-3)" }}>
              <div className="field">
                <label htmlFor="hh">Hero headline</label>
                <input
                  id="hh"
                  className="input"
                  value={headlineValue}
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
                  value={subValue}
                  onChange={(e) => {
                    setHeroSub(e.target.value);
                    setSaveLabel("Save changes");
                  }}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ alignSelf: "flex-start" }}
                onClick={async () => {
                  await updateHome({ heroHeadline: headlineValue, heroSub: subValue });
                  setSaveLabel("Saved ✓");
                }}
              >
                {saveLabel}
              </button>
            </div>
          </>
        )}

        {section === "services" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <h2 style={{ marginBottom: 0 }}>Service Listings</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const name = window.prompt("Service name?");
                  if (!name) return;
                  const category = window.prompt("Category?") || "General";
                  addService({ name, category });
                }}
              >
                + Add listing
              </button>
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
                {(services ?? []).map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>
                      <span className={`tag ${s.active ? "tag-accent" : "tag-neutral"}`}>
                        {s.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost" onClick={() => toggleService({ id: s._id })}>
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
                {(bookings ?? []).map((b) => (
                  <tr key={b._id}>
                    <td>{b.dayLabel}</td>
                    <td>{b.slot}</td>
                    <td>{INQUIRY_TYPE_LABELS[b.inquiryType] ?? b.inquiryType}</td>
                    <td>
                      {b.name} ({b.email})
                    </td>
                    <td>
                      <span className="tag tag-accent">
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
                {bookings && bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {section === "media" && (
          <>
            <h2 style={{ marginBottom: "var(--space-2)" }}>Media Library</h2>
            <p className="text-muted" style={{ fontSize: 13, marginBottom: "var(--space-4)" }}>
              Click a tile to upload or replace images used across the site.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-4)" }}>
              <MediaSlotTile slotKey="hero-photo" label="Homepage hero" />
              <MediaSlotTile slotKey="it-services-hero" label="IT Solutions hero" />
              <MediaSlotTile slotKey="tutoring-hero" label="Tutoring & IEP hero" />
              <MediaSlotTile slotKey="founder-photo" label="Founder photo" />
              <MediaSlotTile slotKey="chair-photo" label="Chairwoman photo" />
              <MediaSlotTile slotKey="general-1" label="Add new asset" />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
