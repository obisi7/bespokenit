"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const DEFAULTS = {
  heroHeadline: "Bespoke software for your business. Specialized tutoring for your student.",
  heroSub:
    "One team, two disciplines: we build custom mobile apps and digital growth strategy for companies, and we coach K-12 students — including IEP navigation and learning-disability support — toward measurable academic gains.",
};

export default function HomeHero() {
  const content = useQuery(api.pageContent.getHome);
  const heroHeadline = content?.heroHeadline ?? DEFAULTS.heroHeadline;
  const heroSub = content?.heroSub ?? DEFAULTS.heroSub;

  return (
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
        {heroHeadline}
      </h1>
      <p style={{ fontSize: 16, maxWidth: "46ch", opacity: 0.85 }}>{heroSub}</p>
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-3)" }}>
        <Link href="/it-services" className="btn btn-primary">
          For Businesses
        </Link>
        <Link href="/tutoring" className="btn btn-secondary">
          For Students &amp; Parents
        </Link>
      </div>
    </div>
  );
}
