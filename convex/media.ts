import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const save = mutation({
  args: { slotKey: v.string(), storageId: v.id("_storage"), label: v.string() },
  handler: async (ctx, { slotKey, storageId, label }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("media")
      .withIndex("by_slot", (q) => q.eq("slotKey", slotKey))
      .unique();
    if (existing) {
      await ctx.storage.delete(existing.storageId);
      await ctx.db.patch(existing._id, { storageId, label });
    } else {
      await ctx.db.insert("media", { slotKey, storageId, label });
    }
  },
});

export const listForAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const items = await ctx.db.query("media").collect();
    return await Promise.all(
      items.map(async (item) => ({
        ...item,
        url: await ctx.storage.getUrl(item.storageId),
      }))
    );
  },
});

export const getBySlot = query({
  args: { slotKey: v.string() },
  handler: async (ctx, { slotKey }) => {
    const item = await ctx.db
      .query("media")
      .withIndex("by_slot", (q) => q.eq("slotKey", slotKey))
      .unique();
    if (!item) return null;
    return { url: await ctx.storage.getUrl(item.storageId), label: item.label };
  },
});
