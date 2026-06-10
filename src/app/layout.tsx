import type { Metadata } from "next";
import { Instrument_Serif, Syne, Barlow } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Brievify — Brief it. Build it. Sell it.",
  description:
    "Describís tu tienda. Brievify la construye con las mejores prácticas de conversión. Vos aprobás antes de publicar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${instrumentSerif.variable} ${syne.variable} ${barlow.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
