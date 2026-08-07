"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ImageSlot from "@/components/ImageSlot";

export default function PublicImageSlot({ slotKey, placeholder }: { slotKey: string; placeholder: string }) {
  const media = useQuery(api.media.getBySlot, { slotKey });

  if (media?.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={media.url}
        alt={media.label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }

  return <ImageSlot placeholder={placeholder} />;
}
