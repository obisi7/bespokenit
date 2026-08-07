"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type InquiryType = "it" | "academic" | "iep" | "other";

export default function ContactClient() {
  const sendMessage = useMutation(api.messages.send);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("it");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await sendMessage({
        name,
        email,
        phone: phone || undefined,
        inquiryType,
        message,
      });
      setSent(true);
    } catch {
      setError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "var(--space-8) var(--space-4) var(--space-8)" }}>
        <p className="tag tag-outline" style={{ marginBottom: "var(--space-3)" }}>
          Get in touch
        </p>
        <h1 style={{ marginBottom: "var(--space-2)" }}>Contact Us</h1>
        <p className="text-muted" style={{ maxWidth: "60ch", marginBottom: "var(--space-6)" }}>
          Questions about IT services or tutoring? Send us a note and we&apos;ll route it to the
          right team.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "var(--space-8)" }}>
          {sent ? (
            <div className="card elev-md" style={{ padding: "var(--space-6)", gap: "var(--space-2)" }}>
              <h3 style={{ marginBottom: 0 }}>Message sent</h3>
              <p className="card-body">Thanks, {name} — we&apos;ll reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div className="field">
                <label htmlFor="cname">Full name</label>
                <input id="cname" className="input" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="cemail">Email</label>
                <input id="cemail" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="cphone">Phone</label>
                <input id="cphone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="ctype">Inquiry type</label>
                <select
                  id="ctype"
                  className="input"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                >
                  <option value="it">IT Services</option>
                  <option value="academic">Academic / Tutoring</option>
                  <option value="iep">IEP / Special Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="cmsg">Message</label>
                <textarea id="cmsg" className="input" required value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              {error && (
                <p style={{ color: "var(--color-accent-2-700)", fontSize: 13, margin: 0 }}>{error}</p>
              )}
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ alignSelf: "flex-start" }}>
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}

          <div>
            <h6 style={{ marginBottom: "var(--space-2)" }}>Reach us directly</h6>
            <p style={{ fontSize: 14, marginBottom: 4 }}>General: hello@bespokenit.example</p>
            <p style={{ fontSize: 14, marginBottom: 4 }}>IT Services: it@bespokenit.example</p>
            <p style={{ fontSize: 14, marginBottom: "var(--space-4)" }}>Tutoring &amp; IEP: tutoring@bespokenit.example</p>
            <p style={{ fontSize: 14, marginBottom: 4 }}>(804) 555-0142</p>
            <p style={{ fontSize: 14 }} className="text-muted">
              Richmond, Virginia — remote &amp; in-person by appointment
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
