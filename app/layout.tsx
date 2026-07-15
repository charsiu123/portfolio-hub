import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private CS Portfolio",
  description: "Private recruiter portfolio for selected computer science projects.",
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
