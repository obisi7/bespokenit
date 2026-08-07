import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Consultation",
};

export default function Booking() {
  return <BookingClient />;
}
