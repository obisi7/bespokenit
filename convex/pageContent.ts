import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const DEFAULT_HERO = {
  key: "home",
  heroHeadline: "Bespoke software for your business. Specialized tutoring for your student.",
  heroSub:
    "One team, two disciplines: we build custom mobile apps and digital growth strategy for companies, and we coach K-12 students — including IEP navigation and learning-disability support — toward measurable academic gains.",
};

export const getHome = query({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("pageContent")
      .withIndex("by_key", (q) => q.eq("key", "home"))
      .unique();
    return existing ?? DEFAULT_HERO;
  },
});

export const updateHome = mutation({
  args: { heroHeadline: v.string(), heroSub: v.string() },
  handler: async (ctx, { heroHeadline, heroSub }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("pageContent")
      .withIndex("by_key", (q) => q.eq("key", "home"))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { heroHeadline, heroSub });
    } else {
      await ctx.db.insert("pageContent", { key: "home", heroHeadline, heroSub });
    }
  },
});

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("pageContent")
      .withIndex("by_key", (q) => q.eq("key", "home"))
      .unique();
    if (existing) return;
    await ctx.db.insert("pageContent", DEFAULT_HERO);
  },
});
