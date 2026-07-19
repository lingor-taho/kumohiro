import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import "./parallax.css";

export const metadata: Metadata = {
  title: "KŌWA TRADING | 光和貿易株式会社",
  description: "東京から世界へ、品質と信頼をつなぐ専門商社。生活雑貨、食品・原料、産業資材の国際取引を支援します。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "KŌWA TRADING", description: "Connecting quality. Creating value.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "KŌWA TRADING", description: "Connecting quality. Creating value.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
