import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function Terms() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-8)", fontSize: 14, lineHeight: 1.7 }}>
        <h1>Terms &amp; Conditions</h1>
        <p className="text-muted" style={{ fontSize: 12 }}>
          Last updated: August 7, 2026
        </p>

        <h3>1. Services</h3>
        <p>
          BespokenIT provides custom mobile application development, digital-presence audits, and
          K-12 academic tutoring, exam preparation, lesson-plan development, and IEP/special-education
          navigation support. Specific deliverables, timelines and fees are set out in individual
          service agreements.
        </p>

        <h3>2. Bookings &amp; cancellations</h3>
        <p>
          Consultations and tutoring sessions booked through this site may be rescheduled or
          canceled with at least 24 hours&apos; notice. Late cancellations or no-shows may be
          subject to a fee as described in your service agreement.
        </p>

        <h3>3. Educational disclaimer</h3>
        <p>
          Tutoring and IEP-navigation services are educational and advisory in nature. We do not
          represent families in legal proceedings and do not guarantee specific academic
          outcomes, test scores, or IEP decisions.
        </p>

        <h3>4. IT services disclaimer</h3>
        <p>
          Software estimates and audit recommendations are based on information available at the
          time of review. Actual results, including revenue outcomes, will vary by business.
        </p>

        <h3>5. Payment</h3>
        <p>
          Fees for services are outlined in your engagement agreement or invoice and are due on
          the schedule specified there.
        </p>

        <h3>6. Intellectual property</h3>
        <p>
          Custom software developed for a client transfers to that client upon final payment, as
          detailed in the applicable service agreement. Our internal tools, frameworks and
          training materials remain our property.
        </p>

        <h3>7. Limitation of liability</h3>
        <p>
          To the maximum extent permitted by law, BespokenIT is not liable for indirect or
          consequential damages arising from use of our services or this website.
        </p>

        <h3>8. Governing law</h3>
        <p>These terms are governed by the laws of the Commonwealth of Virginia.</p>

        <h3>9. Contact</h3>
        <p>Questions about these terms can be directed to legal@bespokenit.example.</p>
      </main>
      <Footer />
    </>
  );
}
