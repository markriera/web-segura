import Link from "next/link";

interface PageHeaderProps {
  kicker?: string;
  title: string;
  back?: { href: string; label: string };
  actions?: React.ReactNode;
}

export function PageHeader({ kicker, title, back, actions }: PageHeaderProps) {
  return (
    <header className="mb-12 flex items-end justify-between gap-6 border-b-2 border-ink/15 pb-8">
      <div>
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center text-sm font-medium text-stone hover:text-ink transition-colors"
          >
            ← {back.label}
          </Link>
        )}
        {kicker && (
          <p
            className={`${back ? "mt-3" : ""} font-mono text-xs uppercase tracking-[0.18em] text-stone`}
          >
            {kicker}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink">
          {title}
        </h1>
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </header>
  );
}
