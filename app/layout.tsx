import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Portfolio — Selected Builds",
  description: "Selected computer science builds for recruiter review.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
