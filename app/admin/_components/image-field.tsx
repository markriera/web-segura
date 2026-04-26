"use client";

import { useRef, useState, useTransition } from "react";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  folder: string;
  required?: boolean;
}

export function ImageField({
  label,
  value,
  onChange,
  folder,
  required,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isPending, startTransition] = useTransition();

  const upload = (file: File) => {
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("folder", folder);
    startTransition(async () => {
      try {
        const res = await fetch("/admin/api/upload", {
          method: "POST",
          body: fd,
        });
        const text = await res.text();
        let data: { url?: string; error?: string } = {};
        try {
          data = JSON.parse(text);
        } catch {
          setError(`Resposta no vàlida (${res.status}): ${text.slice(0, 120)}`);
          return;
        }
        if (!res.ok) {
          setError(data.error || `Error ${res.status}`);
          return;
        }
        if (data.url) onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de xarxa");
      }
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file) upload(file);
  };

  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
        {label}
        {required && <span className="ml-1 text-rust">*</span>}
      </span>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`relative w-full sm:w-48 aspect-[4/3] rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden bg-paper transition-colors ${
            dragOver ? "border-ink bg-ink/5" : "border-ink/20"
          }`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Previsualització"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-stone text-center px-3">
              Arrossega
              <br />
              o tria una imatge
            </span>
          )}
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-bone/85 text-xs font-mono uppercase tracking-[0.18em]">
              Pujant…
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-6 text-sm font-medium text-bone hover:bg-moss transition-colors"
          >
            Tria una imatge
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/…"
            className="h-12 w-full rounded-md border border-ink/20 bg-bone px-3 text-sm focus:border-ink focus:outline-none"
          />
          {error && <p className="text-sm text-rust">{error}</p>}
        </div>
      </div>
    </div>
  );
}
