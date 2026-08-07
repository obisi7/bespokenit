"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/it-services", label: "IT Solutions" },
  { href: "/tutoring", label: "Tutoring & IEP" },
  { href: "/board", label: "Board" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div
        className="nav"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-3) var(--space-4)",
          flexWrap: "wrap",
          rowGap: "var(--space-2)",
        }}
      >
        <Link
          href="/"
          className="nav-brand"
          style={{ textDecoration: "none", color: "var(--color-text)", display: "block" }}
        >
          <Image
            src="/assets/logo-banner.png"
            alt="BespokenIT"
            height={96}
            width={320}
            style={{ height: 96, width: "auto", objectFit: "contain", display: "block" }}
            priority
          />
        </Link>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            flexWrap: "wrap",
            fontSize: 13,
          }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              style={{ fontSize: 13 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="btn btn-primary"
            aria-current={pathname === "/booking" ? "page" : undefined}
            style={{ fontSize: 13, padding: "8px 14px" }}
          >
            Book a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
