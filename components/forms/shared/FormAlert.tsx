"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface IFormAlertProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

export function FormAlert({ type, message, className }: IFormAlertProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-sm",
        isSuccess
          ? "border-primary/25 bg-gradient-to-r from-bg-light to-white text-primary-dark"
          : "border-red-200/80 bg-red-50 text-red-800",
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <p className="font-body text-sm leading-relaxed">{message}</p>
    </div>
  );
}
