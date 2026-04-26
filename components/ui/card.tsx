import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        className,
      )}
      {...rest}
    />
  );
}
