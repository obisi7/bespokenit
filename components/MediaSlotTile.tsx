"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ImageSlot from "@/components/ImageSlot";

export default function MediaSlotTile({ slotKey, label }: { slotKey: string; label: string }) {
  const media = useQuery(api.media.getBySlot, { slotKey });
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.save);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      await saveMedia({ slotKey, storageId, label });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "block",
          width: "100%",
          aspectRatio: "1",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
        aria-label={`Upload ${label}`}
      >
        {media?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.url}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <ImageSlot placeholder={uploading ? "Uploading…" : label} />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
