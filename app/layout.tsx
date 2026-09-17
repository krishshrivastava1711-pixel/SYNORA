import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SyncWrite — Your writing workspace",
  description: "Write together. Keep working offline. A focused collaborative document workspace.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
