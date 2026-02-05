import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { ClientEffects } from "@/components/effects/ClientEffects";
import { Toaster } from "@/components/ui/Toaster";

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
  metadataBase: new URL('https://oz.fodivps2.cloud'),
  title: {
    default: "OZ Extrait - Profumi di Lusso Extrait de Parfum",
    template: "%s | OZ Extrait",
  },
  description: "Profumi di lusso Extrait de Parfum creati da Zoe Cristofoli. Cristallo, Scintilla, Potion d'Amour - Fragranze artigianali italiane con concentrazione 40%.",
  keywords: "profumi lusso, extrait de parfum, zoe cristofoli, profumi italiano, fragranze artigianali, cristallo, scintilla, profumi di nicchia, profumeria artigianale",
  authors: [{ name: "Zoe Cristofoli", url: "https://www.instagram.com/zoe_cristofoli" }],
  creator: "Zoe Cristofoli",
  publisher: "OZ Extrait",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://oz.fodivps2.cloud",
    title: "OZ Extrait - Profumi di Lusso Extrait de Parfum",
    description: "Profumi di lusso Extrait de Parfum by Zoe Cristofoli",
    siteName: "OZ Extrait",
    images: [
      {
        url: "/uploads/images/Logo su sfondo gold.jpeg",
        width: 1200,
        height: 630,
        alt: "OZ Extrait Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OZ Extrait - Profumi di Lusso",
    description: "Profumi di lusso Extrait de Parfum by Zoe Cristofoli",
    images: ["/uploads/images/Logo su sfondo gold.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
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
        <ClientEffects />
        <Toaster />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
