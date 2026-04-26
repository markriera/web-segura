import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://segura.cat"),
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bone text-ink antialiased">
        <a href="#main" className="skip-link">
          Salta al contingut principal
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
