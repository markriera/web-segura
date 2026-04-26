import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import { LogoutButton } from "../_components/logout-button";

const NAV = [
  { href: "/admin", label: "Inici" },
  { href: "/admin/poble", label: "Poble" },
  { href: "/admin/estacions", label: "Localitzacions" },
  { href: "/admin/activitats", label: "Activitats" },
  { href: "/admin/serveis", label: "Serveis" },
  { href: "/admin/anuncis", label: "Anuncis" },
];

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-bone">
      <aside className="w-72 shrink-0 overflow-hidden border-r-2 border-ink/15 bg-paper px-7 py-10 flex flex-col">
        <Link href="/admin" className="block">
          <span className="block font-display text-2xl leading-none tracking-tight text-ink">
            Segura
          </span>
          <span className="mt-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-stone">
            Panell d&apos;administració
          </span>
        </Link>

        <nav className="mt-12 flex-1" aria-label="Admin">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-4 py-3 text-base font-medium text-ink hover:bg-ink hover:text-bone transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t-2 border-ink/15 pt-6 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="block text-sm font-medium text-ink hover:text-moss"
          >
            ↗ Veure web
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto px-14 py-14 max-w-[1400px]">
        {children}
      </main>
    </div>
  );
}
