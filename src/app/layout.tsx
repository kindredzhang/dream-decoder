import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// const inter = Inter({ 
//   subsets: ["latin"],
//   variable: '--font-inter',
// });

export const metadata: Metadata = {
  title: "DreamScape Oracles",
  description: "Explore the meanings behind your dreams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
