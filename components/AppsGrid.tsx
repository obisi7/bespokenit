"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PublicImageSlot from "@/components/PublicImageSlot";

export default function AppsGrid() {
  const apps = useQuery(api.apps.list);

  if (!apps || apps.length === 0) return null;

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-6) var(--space-4) var(--space-8)" }}>
      <h6 style={{ color: "var(--color-accent)" }}>Apps we&apos;ve built</h6>
      <h2 style={{ marginBottom: "var(--space-6)" }}>Download and see the work for yourself</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {apps.map((app) => (
          <div key={app._id} className="card elev-sm" style={{ gap: "var(--space-3)" }}>
            <h4 className="card-title" style={{ fontSize: 17 }}>
              {app.name}
            </h4>
            <p className="card-body" style={{ fontSize: 13 }}>
              {app.description}
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: 4 }}>
                  <PublicImageSlot slotKey={`qr-${app._id}-ios`} placeholder="iOS QR code" />
                </div>
                <p className="text-muted" style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
                  iOS
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: 4 }}>
                  <PublicImageSlot slotKey={`qr-${app._id}-android`} placeholder="Android QR code" />
                </div>
                <p className="text-muted" style={{ fontSize: 11, textAlign: "center", margin: 0 }}>
                  Android
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
