import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Envanter Yönetim Sistemi",
    template: "%s | Envanter Yönetim Sistemi",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "KOBİ'ler için geliştirilen modern envanter yönetim sistemi. Ürün, stok hareketi, düşük stok uyarısı ve kârlılık analizlerini tek panelden yönetin.",
  keywords: [
    "envanter yönetim sistemi",
    "stok takip sistemi",
    "inventory management system",
    "stock tracking",
    "KOBİ",
  ],
  applicationName: "InventoryMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={cn(
        "antialiased font-sans",
        geist.variable,
        fontMono.variable
      )}
    >
      <body>
        <TooltipProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}