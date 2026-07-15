import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ポートフォリオ",
  description: "完成したPWAと制作中の試作を、実演リンクとともにまとめたポートフォリオ。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
