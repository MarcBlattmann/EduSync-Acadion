import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Banner1 } from "@/components/banner1";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduSync Acadion",
  description: "Make working with grades easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Banner1 title={"Version 2.0 is now available!"} description={"Read the full release notes"} linkText={"here"} linkUrl={""} />
        <div className="w-full flex justify-center">
          <div className="w-360 min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
