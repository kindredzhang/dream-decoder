import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Head from "next/head";

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
      <Head>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="bc991f18-75d3-4d44-ba8a-2a4d82cc07bf"
          async
        ></script>
      </Head>
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
