"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";
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

  const handleFile = (file: File | undefined): void => {
    if (file) onChange(file);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-body text-sm font-medium text-text-dark"
      >
        {label}
      </label>
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
          {value ? value.name : t("prompt")}
        </p>
        <p className="mt-1 font-body text-xs text-text-gray">{accept}</p>
      </div>
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
