import type { Metadata } from "next";
import { Anton, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://segura.cat",
  ),
  title: {
    default: "Segura · Llogaret de la Conca de Barberà",
    template: "%s · Segura",
  },
  description:
    "Segura, un llogaret de la Conca de Barberà arrelat al voltant del seu castell medieval. Visita virtual, activitats i punt de trobada del poble.",
  openGraph: {
    type: "website",
    locale: "ca_ES",
    siteName: "Segura",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "La web de Segura · Conca de Barberà",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ca"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${anton.variable}`}
    >
      <body className="bg-bone text-ink antialiased">
        <a href="#main" className="skip-link">
          Salta al contingut principal
        </a>
        <SiteChrome>
          <main id="main">{children}</main>
        </SiteChrome>
      </body>
    </html>
  );
}
