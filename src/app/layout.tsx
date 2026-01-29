import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OZ Extrait - Profumi di Lusso",
  description: "E-commerce profumi di lusso Extrait de Parfum - Design by Zoe Cristofoli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
