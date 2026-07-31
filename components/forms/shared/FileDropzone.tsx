"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

interface IFileDropzoneProps {
  id: string;
  label: string;
  accept: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FileDropzone({
  id,
  label,
  accept,
  value,
  onChange,
  error,
}: IFileDropzoneProps) {
  const t = useTranslations("forms.fileDropzone");
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value || !value.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleFile = (file: File | undefined): void => {
    if (file) onChange(file);
  };

  const clearFile = (): void => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-body text-sm font-medium text-text-dark"
      >
        {label}
      </label>

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-bg-light/40 p-3">
          <button
            type="button"
            onClick={clearFile}
            className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-white/95 text-text-gray shadow-sm transition hover:text-red-600"
            aria-label={t("removeFile")}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          <div className="relative mx-auto h-48 w-full max-w-sm">
            <Image
              src={previewUrl}
              alt={value?.name ?? t("previewAlt")}
              fill
              unoptimized
              className="rounded-lg object-contain"
            />
          </div>
          <p className="mt-2 text-center font-body text-sm text-text-dark">
            {value?.name}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-3 w-full rounded-full border border-primary/30 px-4 py-2 font-body text-sm font-semibold text-primary transition hover:bg-primary/5"
          >
            {t("replaceFile")}
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 transition-colors",
            error
              ? "border-red-300 bg-red-50/50"
              : "border-gray-200 bg-bg-light/50 hover:border-primary/40"
          )}
        >
          <Upload className="mb-2 h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-center font-body text-sm text-text-dark">
            {t("prompt")}
          </p>
          <p className="mt-1 font-body text-xs text-text-gray">{accept}</p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
