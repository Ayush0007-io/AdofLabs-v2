import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import { SiteFooter } from "@/components/layout/site-footer/site-footer";
import { SplashScreen } from "@/components/splash-screen";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

const cambon = localFont({
  src: "../../public/font/cambon-light.woff2",
  variable: "--font-serif",
  display: "swap",
});

const oliveira = localFont({
  src: "../../public/font/oliveira.ttf",
  variable: "--font-oliveira",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adoflabs.com"),
  title: {
    default: "AdofLabs",
    template: "%s | AdofLabs",
  },
  description: "Building intelligence that can listen, see, reason, act, and verify across the digital and physical world.",
  authors: [{ name: "AdofLabs" }],
  openGraph: {
    title: "AdofLabs",
    description: "Building intelligence that can listen, see, reason, act, and verify across the digital and physical world.",
    url: "/",
    siteName: "AdofLabs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/what we build new.png",
        width: 1200,
        height: 630,
        alt: "AdofLabs - Building intelligence for the physical and digital world",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AdofLabs",
    description: "Building intelligence that can listen, see, reason, act, and verify across the digital and physical world.",
    images: ["/images/what we build new.png"],
  },
  icons: {
    icon: "/adoflogo (1).svg",
    apple: "/adoflogo (1).svg",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cambon.variable} ${oliveira.variable}`}>
        <SmoothScroll>
          <SplashScreen />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
