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
    default: "Inventory Management System",
    template: "%s | Inventory Management System",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "A modern inventory management system developed for SMEs. Manage products, stock movements, low stock alerts, and profitability analysis from a single dashboard.",
  keywords: [
    "inventory management system",
    "stock tracking system",
    "inventory management",
    "stock tracking",
    "SME",
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