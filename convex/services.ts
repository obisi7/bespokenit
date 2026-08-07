import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const DEFAULT_SERVICES = [
  { name: "Mobile App Development", category: "IT Services", active: true },
  { name: "Digital Presence Audit", category: "IT Services", active: true },
  { name: "Algebra Tutoring", category: "Tutoring", active: true },
  { name: "Trigonometry Tutoring", category: "Tutoring", active: true },
  { name: "ESL", category: "Tutoring", active: true },
  { name: "Virginia SOL Prep", category: "Exam Prep", active: true },
  { name: "SAT Prep", category: "Exam Prep", active: true },
  { name: "Lesson Plan Development", category: "Educator Support", active: true },
  { name: "IEP Navigation", category: "Special Education", active: false },
];

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

export const activeCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const services = await ctx.db.query("services").collect();
    return services.filter((s) => s.active).length;
  },
});

export const toggle = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const service = await ctx.db.get(id);
    if (!service) throw new Error("Service not found");
    await ctx.db.patch(id, { active: !service.active });
  },
});

export const add = mutation({
  args: { name: v.string(), category: v.string() },
  handler: async (ctx, { name, category }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db.query("services").collect();
    return await ctx.db.insert("services", {
      name,
      category,
      active: true,
      order: existing.length,
    });
  },
});

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("services").first();
    if (existing) return;
    for (let i = 0; i < DEFAULT_SERVICES.length; i++) {
      await ctx.db.insert("services", { ...DEFAULT_SERVICES[i], order: i });
    }
  },
});
