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
        "flex items-start gap-3 rounded-xl border px-4 py-3",
        isSuccess
          ? "border-primary/30 bg-bg-light text-primary-dark"
          : "border-red-200 bg-red-50 text-red-700",
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2
          className="h-5 w-5 shrink-0 text-primary"
          aria-hidden="true"
        />
      ) : (
        <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <p className="font-inter text-sm leading-relaxed">{message}</p>
    </div>
  );
}
