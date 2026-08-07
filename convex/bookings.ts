import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

const INQUIRY_LABELS: Record<string, string> = {
  it: "an IT Consultation",
  tutoring: "a Tutoring Trial",
  iep: "an IEP Review",
};

export const create = mutation({
  args: {
    inquiryType: v.union(v.literal("it"), v.literal("tutoring"), v.literal("iep")),
    dayKey: v.string(),
    dayLabel: v.string(),
    slot: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("bookings", { ...args, status: "confirmed" });
    await ctx.scheduler.runAfter(0, internal.email.sendBookingConfirmation, {
      email: args.email,
      name: args.name,
      inquiryLabel: INQUIRY_LABELS[args.inquiryType],
      dayLabel: args.dayLabel,
      slot: args.slot,
    });
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const bookings = await ctx.db.query("bookings").order("desc").collect();
    return bookings;
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const bookings = await ctx.db.query("bookings").collect();
    return bookings.length;
  },
});
