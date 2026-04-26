import { cn } from "@/lib/utils";

interface SectionKickerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionKicker({ children, className }: SectionKickerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-5 font-mono text-xs uppercase tracking-[0.18em] text-stone before:block before:h-px before:w-12 before:bg-stone/60",
        className,
      )}
    >
      {children}
    </span>
  );
}
