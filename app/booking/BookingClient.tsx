"use client";

import { useMemo, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLOT_LABELS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
const INQUIRY_LABELS: Record<string, string> = {
  it: "an IT Consultation",
  tutoring: "a Tutoring Trial",
  iep: "an IEP Review",
};

type Inquiry = "it" | "tutoring" | "iep";

type Day = {
  key: string;
  weekday: string;
  dayNum: number;
  full: Date;
};

function buildDays(): Day[] {
  const out: Day[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < 10) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      out.push({
        key: d.toISOString().slice(0, 10),
        weekday: WEEKDAYS[d.getDay()],
        dayNum: d.getDate(),
        full: new Date(d),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export default function BookingClient() {
  const days = useMemo(buildDays, []);
  const [inquiry, setInquiry] = useState<Inquiry>("it");
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [selectedDayLabel, setSelectedDayLabel] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectDay = (d: Day) => {
    setSelectedDayKey(d.key);
    setSelectedDayLabel(`${d.weekday} ${d.full.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`);
    setSelectedSlot(null);
  };

  const confirmationText = `You're set for ${INQUIRY_LABELS[inquiry]} on ${selectedDayLabel} at ${selectedSlot}.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "var(--space-8) var(--space-4)" }}>
        <p className="tag tag-outline" style={{ marginBottom: "var(--space-3)" }}>
          Free consultation
        </p>
        <h1 style={{ marginBottom: "var(--space-2)" }}>Book a Consultation</h1>
        <p className="text-muted" style={{ maxWidth: "60ch", marginBottom: "var(--space-6)" }}>
          Tell us what you need, pick a time, and we&apos;ll confirm by email.
        </p>

        {submitted ? (
          <div className="card elev-md" style={{ maxWidth: 520, padding: "var(--space-6)", gap: "var(--space-3)" }}>
            <h3 style={{ marginBottom: 0 }}>You&apos;re booked</h3>
            <p className="card-body" style={{ fontSize: 14 }}>
              {confirmationText}
            </p>
            <p className="text-muted" style={{ fontSize: 13 }}>
              A confirmation email is on its way to {email}.
            </p>
            <Link href="/" className="btn btn-secondary" style={{ alignSelf: "flex-start" }}>
              Back to home
            </Link>
          </div>
        ) : (
          <div>
            <h6 style={{ marginBottom: "var(--space-2)" }}>1. What do you need?</h6>
            <div className="seg" style={{ marginBottom: "var(--space-6)" }}>
              <label className="seg-opt">
                <input type="radio" name="inq" checked={inquiry === "it"} onChange={() => setInquiry("it")} />
                <span className="dot" />
                IT Consultation
              </label>
              <label className="seg-opt">
                <input type="radio" name="inq" checked={inquiry === "tutoring"} onChange={() => setInquiry("tutoring")} />
                <span className="dot" />
                Tutoring Trial
              </label>
              <label className="seg-opt">
                <input type="radio" name="inq" checked={inquiry === "iep"} onChange={() => setInquiry("iep")} />
                <span className="dot" />
                IEP Review
              </label>
            </div>

            <h6 style={{ marginBottom: "var(--space-2)" }}>2. Pick a day</h6>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "var(--space-6)" }}>
              {days.map((d) => (
                <button
                  key={d.key}
                  className={`btn ${selectedDayKey === d.key ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => selectDay(d)}
                  style={{ flexDirection: "column", minWidth: 64, padding: "10px 6px" }}
                >
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7 }}>
                    {d.weekday}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{d.dayNum}</span>
                </button>
              ))}
            </div>

            {selectedDayKey && (
              <>
                <h6 style={{ marginBottom: "var(--space-2)" }}>3. Pick a time</h6>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "var(--space-6)" }}>
                  {SLOT_LABELS.map((label) => (
                    <button
                      key={label}
                      className={`btn ${selectedSlot === label ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => setSelectedSlot(label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {selectedSlot && (
              <>
                <h6 style={{ marginBottom: "var(--space-2)" }}>4. Your details</h6>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", maxWidth: 560 }}
                >
                  <div className="field" style={{ gridColumn: "span 2" }}>
                    <label htmlFor="bname">Full name</label>
                    <input id="bname" className="input" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="bemail">Email</label>
                    <input id="bemail" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="bphone">Phone</label>
                    <input id="bphone" type="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ gridColumn: "span 2", justifySelf: "start" }}>
                    Confirm booking
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
