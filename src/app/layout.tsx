import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header, Footer } from "@/components/layout";

// Luxury serif for headings
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

// Editorial serif for storytelling
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

// Clean sans-serif for UI
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OZ Extrait - Profumi di Lusso Extrait de Parfum",
  description: "Profumi di lusso Extrait de Parfum creati da Zoe Cristofoli. Cristallo, Scintilla, Potion d'Amour - Fragranze artigianali italiane con concentrazione 40%.",
  keywords: "profumi lusso, extrait de parfum, zoe cristofoli, profumi italiano, fragranze artigianali, cristallo, scintilla",
  authors: [{ name: "Zoe Cristofoli" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://oz.fodivps2.cloud",
    title: "OZ Extrait - Profumi di Lusso",
    description: "Profumi di lusso Extrait de Parfum by Zoe Cristofoli",
    siteName: "OZ Extrait",
  },
  twitter: {
    card: "summary_large_image",
    title: "OZ Extrait - Profumi di Lusso",
    description: "Profumi di lusso Extrait de Parfum by Zoe Cristofoli",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${cinzel.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="font-inter antialiased scrollbar-gutter">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
