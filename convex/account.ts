import { ConvexError, v } from "convex/values";
import { action, internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  getAuthUserId,
  modifyAccountCredentials,
  retrieveAccount,
} from "@convex-dev/auth/server";

// Matches Convex Auth's own Password provider default rule exactly
// (see validateDefaultPasswordRequirements in @convex-dev/auth): at least
// 8 characters, no other format requirement.
export const MIN_PASSWORD_LENGTH = 8;

export const getEmail = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    return user?.email ?? null;
  },
});

export const changePassword = action({
  args: { currentPassword: v.string(), newPassword: v.string() },
  handler: async (ctx, { currentPassword, newPassword }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    // The JWT identity doesn't reliably carry an email claim for the
    // Password provider, so read it straight from the users table instead
    // of trusting ctx.auth.getUserIdentity().
    const email = await ctx.runQuery(internal.account.getEmail, { userId });
    if (!email) throw new ConvexError("No email on this account");

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      throw new ConvexError(
        `New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
    }

    try {
      // Throws if currentPassword doesn't match the stored credential.
      await retrieveAccount(ctx, {
        provider: "password",
        account: { id: email, secret: currentPassword },
      });
    } catch {
      throw new ConvexError("Current password is incorrect.");
    }

    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: email, secret: newPassword },
    });
  },
});

// CLI-only recovery path for a fully forgotten password (bypasses the
// current-password check on purpose — only reachable via `npx convex run`,
// never exposed to the app's public API). Run:
// npx convex run account:resetPassword '{"email":"...","newPassword":"..."}'
export const resetPassword = internalAction({
  args: { email: v.string(), newPassword: v.string() },
  handler: async (ctx, { email, newPassword }) => {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      throw new ConvexError(
        `New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
    }
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: email, secret: newPassword },
    });
  },
});
