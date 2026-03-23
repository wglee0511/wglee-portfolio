import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "이원교 | Frontend Developer Portfolio",
  description: "Portfolio of 이원교, a seasoned Frontend Developer specializing in React, React Native, and premium UI/UX experiences.",
  keywords: ["Frontend Developer", "React", "React Native", "Portfolio", "이원교", "Software Engineer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-accent-blue/30 selection:text-white">
        <div className="glow-mesh" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
