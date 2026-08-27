import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import { SiteFooter } from "@/components/layout/site-footer/site-footer";
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
  title: "AdofLabs | Real-Time Agentic and Physical AI",
  description: "AdofLabs is an AI research and engineering company building intelligence that can listen, see, reason, act, and verify across the digital and physical world.",
  keywords: ["AI", "Artificial Intelligence", "Agentic AI", "Physical AI", "Real-Time AI", "AdofLabs", "AI Research", "Engineering"],
  authors: [{ name: "AdofLabs" }],
  openGraph: {
    title: "AdofLabs | Building Intelligence for the Real World",
    description: "AdofLabs builds real-time agentic and physical AI that communicates naturally and uses tools.",
    url: "https://adoflabs.com",
    siteName: "AdofLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdofLabs | Real-Time Agentic and Physical AI",
    description: "Building intelligence that can listen, see, reason, act, and verify across the digital and physical world.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://adoflabs.com/#organization",
        "name": "AdofLabs",
        "url": "https://adoflabs.com",
        "description": "AdofLabs is an AI research and engineering company building real time agentic and physical AI.",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://adoflabs.com/#website",
        "url": "https://adoflabs.com",
        "name": "AdofLabs",
        "publisher": {
          "@id": "https://adoflabs.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cambon.variable} ${oliveira.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
