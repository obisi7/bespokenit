"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import MediaSlotTile from "@/components/MediaSlotTile";

export default function AppEditorCard({ app }: { app: Doc<"apps"> }) {
  const updateApp = useMutation(api.apps.update);
  const removeApp = useMutation(api.apps.remove);
  const [name, setName] = useState(app.name);
  const [description, setDescription] = useState(app.description);
  const [saveLabel, setSaveLabel] = useState("Save");

  const handleSave = async () => {
    await updateApp({ id: app._id, name, description });
    setSaveLabel("Saved ✓");
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${app.name}"? This also removes its QR code images.`)) return;
    await removeApp({ id: app._id });
  };

  return (
    <div className="card elev-sm" style={{ gap: "var(--space-3)" }}>
      <div className="field">
        <label htmlFor={`app-name-${app._id}`}>App name</label>
        <input
          id={`app-name-${app._id}`}
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSaveLabel("Save");
          }}
        />
      </div>
      <div className="field">
        <label htmlFor={`app-desc-${app._id}`}>Description</label>
        <textarea
          id={`app-desc-${app._id}`}
          className="input"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setSaveLabel("Save");
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "var(--space-4)" }}>
        <div style={{ width: 120 }}>
          <MediaSlotTile slotKey={`qr-${app._id}-ios`} label="iOS QR" />
          <p className="text-muted" style={{ fontSize: 11, textAlign: "center", margin: "4px 0 0" }}>
            iOS QR
          </p>
        </div>
        <div style={{ width: 120 }}>
          <MediaSlotTile slotKey={`qr-${app._id}-android`} label="Android QR" />
          <p className="text-muted" style={{ fontSize: 11, textAlign: "center", margin: "4px 0 0" }}>
            Android QR
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <button className="btn btn-primary" onClick={handleSave} style={{ alignSelf: "flex-start" }}>
          {saveLabel}
        </button>
        <button className="btn btn-ghost" onClick={handleDelete} style={{ alignSelf: "flex-start" }}>
          Delete app
        </button>
      </div>
    </div>
  );
}
