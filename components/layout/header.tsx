"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HeaderWindmill } from "./header-windmill";

const NAV = [
  { label: "Poble", href: "#poble" },
  { label: "Visita", href: "#visita" },
  { label: "Activitats", href: "#activitats" },
  { label: "Serveis", href: "#serveis" },
  { label: "Trobada", href: "#trobada" },
  { label: "Contacte", href: "#contacte" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dark = pathname?.startsWith("/festa-major") ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setOpen(false);

    const headerOffset = 160;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element | number, o?: { offset?: number; duration?: number }) => void } }).__lenis;

    if (lenis) {
      lenis.scrollTo(target as Element, { offset: -headerOffset, duration: 1.4 });
    } else {
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
        dark
          ? scrolled
            ? "bg-[#08182b]/85 backdrop-blur-md border-b border-white/10"
            : "bg-gradient-to-b from-[#08182b]/70 to-transparent"
          : scrolled
            ? "bg-bone/85 backdrop-blur-md border-b border-ink/5"
            : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-28 w-full items-center justify-between px-8 sm:px-12 lg:px-16 xl:px-20">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-3 font-display text-2xl tracking-tight",
            dark ? "text-bone" : "text-ink",
          )}
          aria-label="Inici"
        >
          <span>Segura</span>
          <HeaderWindmill dark={dark} />
        </Link>

        <nav
          className="hidden md:flex items-center gap-10 lg:gap-14"
          aria-label="Principal"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick}
              className={cn(
                "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                dark
                  ? "text-bone/70 hover:text-bone"
                  : "text-stone hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tanca el menú" : "Obre el menú"}
        >
          <span className="relative block h-px w-6 bg-ink before:absolute before:left-0 before:top-[-6px] before:h-px before:w-6 before:bg-ink after:absolute after:left-0 after:top-[6px] after:h-px after:w-6 after:bg-ink" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mòbil"
          className="md:hidden border-t border-ink/5 bg-bone"
        >
          <ul className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleAnchorClick}
                  className="block py-3 font-display text-lg text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
