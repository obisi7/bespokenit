import { v } from "convex/values";
import { internalMutation, mutation, query, MutationCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const DEFAULT_APPS = [
  { name: "App Name 1", description: "Placeholder description — replace with this app's value proposition and a reason to download it." },
  { name: "App Name 2", description: "Placeholder description — replace with this app's value proposition and a reason to download it." },
  { name: "App Name 3", description: "Placeholder description — replace with this app's value proposition and a reason to download it." },
  { name: "App Name 4", description: "Placeholder description — replace with this app's value proposition and a reason to download it." },
];

async function deleteSlotIfExists(ctx: MutationCtx, slotKey: string) {
  const existing = await ctx.db
    .query("media")
    .withIndex("by_slot", (q) => q.eq("slotKey", slotKey))
    .unique();
  if (existing) {
    await ctx.storage.delete(existing.storageId);
    await ctx.db.delete(existing._id);
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const apps = await ctx.db.query("apps").collect();
    return apps.sort((a, b) => a.order - b.order);
  },
});

export const add = mutation({
  args: { name: v.string(), description: v.string() },
  handler: async (ctx, { name, description }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db.query("apps").collect();
    return await ctx.db.insert("apps", { name, description, order: existing.length });
  },
});

export const update = mutation({
  args: { id: v.id("apps"), name: v.string(), description: v.string() },
  handler: async (ctx, { id, name, description }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(id, { name, description });
  },
});

export const remove = mutation({
  args: { id: v.id("apps") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await deleteSlotIfExists(ctx, `qr-${id}-ios`);
    await deleteSlotIfExists(ctx, `qr-${id}-android`);
    await ctx.db.delete(id);
  },
});

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("apps").first();
    if (existing) return;
    for (let i = 0; i < DEFAULT_APPS.length; i++) {
      await ctx.db.insert("apps", { ...DEFAULT_APPS[i], order: i });
    }
  },
});
