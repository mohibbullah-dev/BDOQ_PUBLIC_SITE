"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

interface ISubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel?: string;
  className?: string;
}

export function SubmitButton({
  isLoading,
  label,
  loadingLabel,
  className,
}: ISubmitButtonProps) {
  const t = useTranslations("forms.common");
  const pendingLabel = loadingLabel ?? t("submitting");

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-dark disabled:opacity-60",
        className
      )}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {isLoading ? pendingLabel : label}
    </button>
  );
}
