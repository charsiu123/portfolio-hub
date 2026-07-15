import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "制作記録ポートフォリオ | 実装の地図",
  description: "制作物の記録と実装の概要をまとめたポートフォリオ。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
