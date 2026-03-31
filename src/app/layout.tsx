import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
import StockTicker from "@/components/layout/StockTicker";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const SITE_URL = 'https://wglee.getcodeforge.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "이원교 | Frontend Developer Portfolio",
    template: "%s | 이원교 포트폴리오",
  },
  description: "4년차 프론트엔드 개발자 이원교의 포트폴리오. React, React Native, TypeScript를 다루며 메모리 최적화 -69%, 번들사이즈 -43% 성능 개선 경험 보유. 500만 MAU 서비스 운영.",
  keywords: [
    "프론트엔드 개발자", "Frontend Developer", "React 개발자", "React Native 개발자",
    "React", "React Native", "TypeScript", "Next.js", "D3.js", "Zustand",
    "성능 최적화", "모바일 앱 개발", "크로스플랫폼",
    "이원교", "Rowan", "포트폴리오", "개발자 포트폴리오",
  ],
  authors: [{ name: "이원교", url: SITE_URL }],
  creator: "이원교",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ko-KR': SITE_URL,
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '이원교 포트폴리오',
    title: '이원교 | Frontend Developer Portfolio',
    description: '4년차 프론트엔드 개발자 이원교의 포트폴리오. React, React Native 기반 모바일·웹 서비스 개발. 메모리 -69%, 번들 -43% 성능 개선.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '이원교 Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이원교 | Frontend Developer Portfolio',
    description: '4년차 프론트엔드 개발자 이원교의 포트폴리오. React · React Native · TypeScript.',
    images: ['/opengraph-image'],
    creator: '@wglee0511',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'OmpNWXemvdfd_sre-v8xyrZSF_bOhzDGaISB0E_JfjA',
  },
  other: {
    'naver-site-verification': 'cfed1c5917d8a29b183d2da6826319eb4e06b2d0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${outfit.variable} scroll-smooth overflow-x-hidden w-full`} suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-49P8D5SCZ1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49P8D5SCZ1');
          `}
        </Script>
      </head>
      <body className="antialiased selection:bg-accent-blue/30 selection:text-white overflow-x-hidden w-full">
        <JsonLd />
        <ThemeProvider>
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="glow-mesh" aria-hidden="true" />
            <Navbar />
            <div className="sticky top-0 z-40">
              <StockTicker />
            </div>
            {children}
            <Footer />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
