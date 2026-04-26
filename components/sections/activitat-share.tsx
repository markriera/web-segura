"use client";

import { useState } from "react";

interface ActivitatShareProps {
  nom: string;
  data: string;
  url: string;
}

export function ActivitatShare({ nom, data, url }: ActivitatShareProps) {
  const [copied, setCopied] = useState(false);

  const text = `${nom} · ${data} · Segura\n${url}`;

  const shareNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: nom, text: `${nom} · ${data}`, url });
      } catch {
        /* cancel-lat per l'usuari */
      }
    } else {
      copy();
    }
  };

  const shareWhatsApp = () => {
    const link = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* navegador antic */
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-moss px-6 text-sm font-semibold text-bone hover:bg-ink transition-colors"
      >
        <WhatsAppIcon />
        Comparteix per WhatsApp
      </button>
      <button
        type="button"
        onClick={shareNative}
        className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/15 bg-bone px-6 text-sm font-semibold text-ink hover:border-ink transition-colors"
      >
        <ShareIcon />
        Comparteix
      </button>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/15 bg-bone px-6 text-sm font-semibold text-ink hover:border-ink transition-colors"
      >
        <CopyIcon />
        {copied ? "Copiat!" : "Copia enllaç"}
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.611 5.341l-.999 3.648 3.877-1.688zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.307 1.265.49 1.697.628.713.227 1.362.195 1.875.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
