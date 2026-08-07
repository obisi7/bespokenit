import { v } from "convex/values";
import { internalAction } from "./_generated/server";

const FROM = "BespokenIT <no-reply@getbespokenit.com>";

async function send(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set; skipping email send.");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Resend send failed (${res.status}): ${body}`);
  }
}

export const sendBookingConfirmation = internalAction({
  args: {
    email: v.string(),
    name: v.string(),
    inquiryLabel: v.string(),
    dayLabel: v.string(),
    slot: v.string(),
  },
  handler: async (_ctx, { email, name, inquiryLabel, dayLabel, slot }) => {
    await send(
      email,
      "You're booked with BespokenIT",
      `<p>Hi ${name},</p>
       <p>You're set for <strong>${inquiryLabel}</strong> on <strong>${dayLabel} at ${slot}</strong>.</p>
       <p>We'll follow up if anything changes. See you then!</p>
       <p>— BespokenIT</p>`
    );
  },
});

export const sendContactAck = internalAction({
  args: { email: v.string(), name: v.string() },
  handler: async (_ctx, { email, name }) => {
    await send(
      email,
      "We received your message — BespokenIT",
      `<p>Hi ${name},</p>
       <p>Thanks for reaching out — we've received your message and will reply within one business day.</p>
       <p>— BespokenIT</p>`
    );
  },
});
