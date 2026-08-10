import { v } from "convex/values";
import { action } from "./_generated/server";
import {
  getAuthUserId,
  modifyAccountCredentials,
  retrieveAccount,
} from "@convex-dev/auth/server";

export const changePassword = action({
  args: { currentPassword: v.string(), newPassword: v.string() },
  handler: async (ctx, { currentPassword, newPassword }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const identity = await ctx.auth.getUserIdentity();
    const email = identity?.email;
    if (!email) throw new Error("No email on this account");

    if (newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters");
    }

    // Throws if currentPassword doesn't match the stored credential.
    await retrieveAccount(ctx, {
      provider: "password",
      account: { id: email, secret: currentPassword },
    });

    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: email, secret: newPassword },
    });
  },
});
