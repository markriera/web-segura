"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isBare =
    pathname?.startsWith("/pista/") ||
    pathname?.startsWith("/segura-room/") ||
    pathname === "/joc";

  if (isAdmin || isBare) return <>{children}</>;

  return (
    <SmoothScrollProvider>
      <Header />
      {children}
      <Footer />
    </SmoothScrollProvider>
  );
}
