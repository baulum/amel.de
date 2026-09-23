"use client";

// Static export freezes the build year; this keeps the footer current.
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
