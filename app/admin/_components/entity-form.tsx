"use client";

import { useState, useTransition } from "react";
import { saveItemAction, savePobleAction } from "../actions";
import { ImageField } from "./image-field";

export type FieldKind =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "date"
  | "time"
  | "image"
  | "image-array"
  | "string-array"
  | "object-array";

export interface FieldDef {
  name: string;
  label: string;
  kind: FieldKind;
  options?: { value: string; label: string }[];
  hint?: string;
  itemFields?: FieldDef[];
  required?: boolean;
  uploadFolder?: string;
}

interface EntityFormProps {
  entity?:
    | "poble"
    | "estacions"
    | "activitats"
    | "serveis"
    | "anuncis";
  initialData: Record<string, unknown>;
  fields: FieldDef[];
  originalKey?: string | null;
  submitLabel?: string;
}

function getValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function setValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> {
  const keys = path.split(".");
  const next = { ...obj };
  let cursor: Record<string, unknown> = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!;
    const existing = cursor[k];
    cursor[k] =
      existing && typeof existing === "object" && !Array.isArray(existing)
        ? { ...(existing as Record<string, unknown>) }
        : {};
    cursor = cursor[k] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]!] = value;
  return next;
}

export function EntityForm({
  entity,
  initialData,
  fields,
  originalKey = null,
  submitLabel = "Desa",
}: EntityFormProps) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [isPending, startTransition] = useTransition();

  const update = (path: string, value: unknown) => {
    setData((prev) => setValue(prev, path, value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("__data", JSON.stringify(data));
    if (entity === "poble") {
      startTransition(() => savePobleAction(fd));
    } else if (entity) {
      fd.set("__entity", entity);
      if (originalKey) fd.set("__originalKey", originalKey);
      startTransition(() => saveItemAction(fd));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={getValue(data, field.name)}
          onChange={(v) => update(field.name, v)}
        />
      ))}

      <div className="pt-8 border-t-2 border-ink/15 sticky bottom-0 bg-bone/95 backdrop-blur-sm py-4 -mx-2 px-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-14 items-center justify-center rounded-md bg-ink px-10 text-base font-semibold text-bone hover:bg-moss disabled:opacity-50 transition-colors shadow-sm"
        >
          {isPending ? "Desant…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelEl = (
    <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/80">
      {field.label}
      {field.required && <span className="ml-1 text-rust">*</span>}
    </span>
  );

  if (field.kind === "textarea") {
    return (
      <label className="block">
        {labelEl}
        <textarea
          rows={5}
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 block w-full resize-y border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink placeholder:text-stone/50 focus:border-ink focus:outline-none rounded-md"
        />
        {field.hint && (
          <span className="mt-1 block text-xs text-stone">{field.hint}</span>
        )}
      </label>
    );
  }

  if (field.kind === "number") {
    return (
      <label className="block">
        {labelEl}
        <input
          type="number"
          required={field.required}
          value={(value as number | string) ?? ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="mt-2 block w-full border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink focus:border-ink focus:outline-none rounded-md"
        />
      </label>
    );
  }

  if (field.kind === "date" || field.kind === "time") {
    return (
      <label className="block">
        {labelEl}
        <input
          type={field.kind}
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 block w-full border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink focus:border-ink focus:outline-none rounded-md"
        />
        {field.hint && (
          <span className="mt-1 block text-xs text-stone">{field.hint}</span>
        )}
      </label>
    );
  }

  if (field.kind === "boolean") {
    return (
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
          {field.label}
        </span>
      </label>
    );
  }

  if (field.kind === "select") {
    return (
      <label className="block">
        {labelEl}
        <select
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 block w-full border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink focus:border-ink focus:outline-none rounded-md"
        >
          <option value="" disabled>
            —
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.kind === "image") {
    return (
      <ImageField
        label={field.label}
        value={(value as string) ?? ""}
        onChange={onChange}
        folder={field.uploadFolder ?? "estacions"}
        required={field.required}
      />
    );
  }

  if (field.kind === "image-array") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        {labelEl}
        <div className="mt-3 space-y-3">
          {arr.map((url, i) => (
            <div key={i} className="flex items-start gap-3">
              <ImageField
                label={`Imatge ${i + 1}`}
                value={url}
                onChange={(v) => {
                  const next = [...arr];
                  next[i] = v;
                  onChange(next);
                }}
                folder={field.uploadFolder ?? "negocis"}
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="mt-7 h-10 px-4 text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-rust"
              >
                Treu
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...arr, ""])}
            className="inline-flex h-11 items-center rounded-md border border-ink/20 px-5 text-xs font-mono uppercase tracking-[0.18em] text-ink hover:border-ink hover:bg-ink hover:text-bone transition-colors"
          >
            + Afegeix imatge
          </button>
        </div>
      </div>
    );
  }

  if (field.kind === "string-array") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        {labelEl}
        <div className="mt-2 space-y-2">
          {arr.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={v}
                onChange={(e) => {
                  const next = [...arr];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className="flex-1 border-2 border-ink/20 bg-bone px-4 py-3 text-base text-ink focus:border-ink focus:outline-none rounded-md"
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="h-10 px-3 text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-rust"
              >
                Treu
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...arr, ""])}
            className="text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-ink"
          >
            + Afegeix
          </button>
        </div>
      </div>
    );
  }

  if (field.kind === "object-array" && field.itemFields) {
    const arr = Array.isArray(value)
      ? (value as Record<string, unknown>[])
      : [];
    return (
      <div>
        {labelEl}
        <div className="mt-2 space-y-4">
          {arr.map((item, i) => (
            <div
              key={i}
              className="rounded-md border-2 border-ink/15 bg-paper p-5 space-y-4"
            >
              {field.itemFields!.map((sub) => (
                <Field
                  key={sub.name}
                  field={sub}
                  value={item[sub.name]}
                  onChange={(v) => {
                    const next = [...arr];
                    next[i] = { ...item, [sub.name]: v };
                    onChange(next);
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-rust"
              >
                Treu element
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const empty = Object.fromEntries(
                field.itemFields!.map((f) => [f.name, ""]),
              );
              onChange([...arr, empty]);
            }}
            className="text-xs font-mono uppercase tracking-[0.18em] text-stone hover:text-ink"
          >
            + Afegeix element
          </button>
        </div>
      </div>
    );
  }

  return (
    <label className="block">
      {labelEl}
      <input
        type="text"
        required={field.required}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full border border-ink/15 bg-bone px-3 py-2 text-base focus:border-ink focus:outline-none rounded-sm"
      />
      {field.hint && (
        <span className="mt-1 block text-xs text-stone">{field.hint}</span>
      )}
    </label>
  );
}
