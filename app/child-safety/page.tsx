import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LuvAcross — Child Safety Statement",
};

export default function ChildSafety() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-8)", fontSize: 14, lineHeight: 1.7 }}>
        <h1>LuvAcross — Child Safety Statement</h1>
        <p className="text-muted" style={{ fontSize: 12 }}>
          BespokenIT / LuvAcross — Last updated: August 9, 2026
        </p>

        <h3>Adult-Only Service</h3>
        <p>
          LuvAcross is a dating and cultural exchange platform intended exclusively for adults
          aged 18 and older. The service is not designed for, directed to, or targeted at
          children, and we prohibit any use by persons under 18.
        </p>

        <h3>Age Assurance</h3>
        <p>
          Users must confirm they are at least 18 years old and provide their date of birth at
          sign-up. Accounts that misrepresent age, or any account we later identify as belonging
          to a minor, are removed immediately and permanently. We do not knowingly collect
          personal information from children.
        </p>

        <h3>Prohibited Content and Conduct</h3>
        <p>
          LuvAcross has a zero-tolerance policy for any sexual, abusive, exploitative, or grooming
          content involving minors, in text, photos, video, audio, or messages. Any such content
          or behaviour is grounds for immediate account termination, and we report suspected
          child sexual abuse material (CSAM) to the National Center for Missing &amp; Exploited
          Children (NCMEC) where required by applicable law.
        </p>

        <h3>Reporting</h3>
        <p>
          Users can report any profile, message, or behaviour via the in-app reporting flow or at
          support@getbespokenit.com. All child-safety reports are escalated to our moderation team
          and actioned promptly, including content removal, account bans, and referral to law
          enforcement when appropriate.
        </p>

        <h3>Moderation and Compliance</h3>
        <p>
          We combine automated screening with human review, and we align our practices with the
          principles of age-appropriate design, robust content moderation, and safety-by-default
          published by recognised child-safety frameworks, including the Family Online Safety
          Institute. We comply with applicable data-protection and child-safety obligations in
          every country where the service operates.
        </p>

        <h3>Contact</h3>
        <p>
          For child-safety concerns: support@getbespokenit.com. Our moderation team confirms
          receipt and response to all child-safety queries.
        </p>
      </main>
      <Footer />
    </>
  );
}
