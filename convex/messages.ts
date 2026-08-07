import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const send = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", { ...args, read: false });
    await ctx.scheduler.runAfter(0, internal.email.sendContactAck, {
      email: args.email,
      name: args.name,
    });
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.query("messages").order("desc").collect();
  },
});

export const unreadCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const messages = await ctx.db.query("messages").collect();
    return messages.filter((m) => !m.read).length;
  },
});

export const markRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(id, { read: true });
  },
});
