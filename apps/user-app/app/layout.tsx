import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppbarClient } from "../components/appbarClient";
import { Providers } from "../provider";
import { JSX } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background">
        <Providers>
          <AppbarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}