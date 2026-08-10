"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ChangePasswordForm() {
  const changePassword = useAction(api.account.changePassword);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }
    setStatus("saving");
    try {
      await changePassword({ currentPassword, newPassword });
      setStatus("done");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Current password is incorrect, or the new one is too short (8+ characters).");
      setStatus("idle");
    }
  };

  return (
    <div className="card elev-sm" style={{ maxWidth: 420, gap: "var(--space-3)" }}>
      <h4 className="card-title" style={{ fontSize: 16, marginBottom: 0 }}>
        Change password
      </h4>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <div className="field">
          <label htmlFor="cur-pw">Current password</label>
          <input
            id="cur-pw"
            type="password"
            className="input"
            required
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setStatus("idle");
            }}
            autoComplete="current-password"
          />
        </div>
        <div className="field">
          <label htmlFor="new-pw">New password</label>
          <input
            id="new-pw"
            type="password"
            className="input"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setStatus("idle");
            }}
            autoComplete="new-password"
          />
        </div>
        <div className="field">
          <label htmlFor="confirm-pw">Confirm new password</label>
          <input
            id="confirm-pw"
            type="password"
            className="input"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setStatus("idle");
            }}
            autoComplete="new-password"
          />
        </div>
        {error && (
          <p style={{ color: "var(--color-accent-2-700)", fontSize: 13, margin: 0 }}>{error}</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={status === "saving"} style={{ alignSelf: "flex-start" }}>
          {status === "saving" ? "Updating…" : status === "done" ? "Updated ✓" : "Update password"}
        </button>
      </form>
    </div>
  );
}
