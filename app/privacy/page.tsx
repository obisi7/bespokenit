import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Privacy() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-8)", fontSize: 14, lineHeight: 1.7 }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted" style={{ fontSize: 12 }}>
          Last updated: August 7, 2026
        </p>

        <h3>1. Information we collect</h3>
        <p>
          We collect information you provide directly — such as your name, email, phone number,
          and messages submitted through our contact and booking forms — along with basic usage
          data from visiting this website.
        </p>

        <h3>2. How we use information</h3>
        <p>
          We use the information you provide to respond to inquiries, schedule consultations and
          tutoring sessions, deliver our IT and academic services, and improve our website. For
          minors enrolled in tutoring or IEP services, information is collected and used only
          with parent or guardian consent.
        </p>

        <h3>3. Sharing of information</h3>
        <p>
          We do not sell personal information. We may share information with service providers
          who help us operate (such as scheduling or email tools), or when required by law.
        </p>

        <h3>4. Student &amp; educational records</h3>
        <p>
          Where applicable, we handle student information consistent with FERPA and comparable
          state privacy protections, and only as needed to deliver tutoring, lesson-plan, or
          IEP-navigation services.
        </p>

        <h3>5. Data security</h3>
        <p>
          We use reasonable administrative and technical safeguards to protect information in our
          care. No method of transmission or storage is completely secure.
        </p>

        <h3>6. Your choices</h3>
        <p>
          You may request access to, correction of, or deletion of your personal information by
          contacting us at privacy@bespokenit.example.
        </p>

        <h3>7. Changes to this policy</h3>
        <p>
          We may update this policy periodically. Material changes will be posted on this page
          with an updated effective date.
        </p>

        <h3>8. Contact us</h3>
        <p>Questions about this policy can be directed to privacy@bespokenit.example.</p>
      </main>
      <Footer />
    </>
  );
}
