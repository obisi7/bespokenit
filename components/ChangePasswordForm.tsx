"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "@/convex/_generated/api";

const MIN_PASSWORD_LENGTH = 8;

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="input"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          style={{ paddingRight: 56 }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="btn btn-ghost"
          style={{
            position: "absolute",
            right: 2,
            top: 2,
            bottom: 2,
            padding: "0 10px",
            fontSize: 12,
          }}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {hint && (
        <p className="text-muted" style={{ fontSize: 11, margin: "4px 0 0" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

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

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }
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
    } catch (err) {
      setError(err instanceof ConvexError ? (err.data as string) : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="card elev-sm" style={{ maxWidth: 420, gap: "var(--space-3)" }}>
      <h4 className="card-title" style={{ fontSize: 16, marginBottom: 0 }}>
        Change password
      </h4>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <PasswordField
          id="cur-pw"
          label="Current password"
          value={currentPassword}
          onChange={(v) => {
            setCurrentPassword(v);
            setStatus("idle");
          }}
          autoComplete="current-password"
        />
        <PasswordField
          id="new-pw"
          label="New password"
          value={newPassword}
          onChange={(v) => {
            setNewPassword(v);
            setStatus("idle");
          }}
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD_LENGTH} characters. No other format required — letters, numbers, symbols, spaces all fine.`}
        />
        <PasswordField
          id="confirm-pw"
          label="Confirm new password"
          value={confirmPassword}
          onChange={(v) => {
            setConfirmPassword(v);
            setStatus("idle");
          }}
          autoComplete="new-password"
        />
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
