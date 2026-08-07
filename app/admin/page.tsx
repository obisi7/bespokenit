import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin Portal — BespokenIT",
};

export default function Admin() {
  return <AdminClient />;
}
