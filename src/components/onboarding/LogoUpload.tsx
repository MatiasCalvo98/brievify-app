"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";

interface LogoUploadProps {
  logoUrl: string | null;
  onChange: (url: string | null) => void;
}

export function LogoUpload({ logoUrl, onChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir el logo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-text-2">
        Logo
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {logoUrl ? (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-ink p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Logo"
            className="size-12 rounded-md object-contain"
          />
          <span className="flex-1 truncate text-xs text-text-2">
            Logo cargado
          </span>
          <button
            onClick={() => onChange(null)}
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-text-2 transition-colors hover:bg-surface-2 hover:text-coral"
            aria-label="Quitar logo"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-ink px-3 py-4 text-sm text-text-2 transition-colors hover:border-border-2 hover:text-text disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Subiendo…
            </>
          ) : (
            <>
              <Upload size={16} /> Subir logo (PNG, máx 2MB)
            </>
          )}
        </button>
      )}
      {error && <p className="mt-1 text-[11px] text-coral">{error}</p>}
    </div>
  );
}
