import type { Metadata } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sanando Pies · Clínica de Podología",
    template: "%s · Sanando Pies",
  },
  description:
    "Clínica de podología especializada en uña encarnada, hongos, pie diabético, valoración podológica y salud integral del pie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
