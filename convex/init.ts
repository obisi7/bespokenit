import { v } from "convex/values";
import { action } from "./_generated/server";
import { createAccount } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

// One-time bootstrap: creates the first (and, for now, only) admin
// account, since there is no public sign-up UI. Run via
// `npx convex run init:bootstrapAdmin '{"email":"...","password":"..."}'`.
export const bootstrapAdmin = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, { email, password }) => {
    await createAccount(ctx, {
      provider: "password",
      account: { id: email, secret: password },
      profile: { email },
    });
    await ctx.runMutation(internal.services.seed, {});
    await ctx.runMutation(internal.pageContent.seed, {});
  },
});
