import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-bone py-16">
      <Container size="xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ink">Segura</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-stone">
              Conca de Barberà · Tarragona
            </p>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.18em] text-stone">
            <p>Ajuntament de Savallà del Comtat</p>
            <p className="mt-2 normal-case tracking-normal font-body text-base text-ink">
              Plaça de l&apos;Església, 1
              <br />
              43425 Savallà del Comtat
            </p>
          </div>

          <div className="md:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone">
              41°32&apos;39.80&quot;N · 1°15&apos;54.90&quot;E
            </p>
            <p className="mt-2 text-sm text-stone">Una web del poble de Segura</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-stone md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Segura</span>
          <span className="font-mono uppercase tracking-[0.18em]">
            784 m · 28 hab.
          </span>
        </div>
      </Container>
    </footer>
  );
}
