import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  bookings: defineTable({
    inquiryType: v.union(v.literal("it"), v.literal("tutoring"), v.literal("iep")),
    dayKey: v.string(),
    dayLabel: v.string(),
    slot: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("pending"), v.literal("cancelled")),
  }),

  messages: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    inquiryType: v.union(
      v.literal("it"),
      v.literal("academic"),
      v.literal("iep"),
      v.literal("other")
    ),
    message: v.string(),
    read: v.boolean(),
  }),

  services: defineTable({
    name: v.string(),
    category: v.string(),
    active: v.boolean(),
    order: v.number(),
  }),

  pageContent: defineTable({
    key: v.string(),
    heroHeadline: v.string(),
    heroSub: v.string(),
  }).index("by_key", ["key"]),

  media: defineTable({
    slotKey: v.string(),
    storageId: v.id("_storage"),
    label: v.string(),
  }).index("by_slot", ["slotKey"]),

  apps: defineTable({
    name: v.string(),
    description: v.string(),
    order: v.number(),
  }),
});
