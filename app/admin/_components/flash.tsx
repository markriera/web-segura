interface FlashProps {
  saved?: string;
  deleted?: string;
}

export function Flash({ saved, deleted }: FlashProps) {
  if (!saved && !deleted) return null;
  return (
    <div className="mb-8 flex items-center gap-3 rounded-md border-2 border-moss bg-moss/10 px-5 py-4 text-base font-medium text-moss">
      <span className="inline-block h-2 w-2 rounded-full bg-moss" />
      {saved ? "Canvis desats correctament." : "Element esborrat."}
    </div>
  );
}
