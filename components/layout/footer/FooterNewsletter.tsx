"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SubmitState = "idle" | "loading" | "success" | "error";

export function FooterNewsletter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || submitState === "loading") return;

    setSubmitState("loading");
    setFeedback("");

    try {
      const response = await fetch(
        `${API_BASE}/public/newsletter-subscribers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmed,
            locale: locale === "bn" ? "bn" : "en",
            source: "footer",
          }),
          cache: "no-store",
        }
      );

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed");
      }

      setSubmitState("success");
      setFeedback(payload.message || t("newsletterSuccess"));
      setEmail("");
    } catch {
      setSubmitState("error");
      setFeedback(t("newsletterError"));
    }
  }

  return (
    <div>
      <h3 className="font-body text-base font-semibold text-white">
        {t("newsletterTitle")}
      </h3>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex items-center gap-2 rounded-[8px] border border-white/15 bg-black/25 p-1.5 backdrop-blur-sm"
      >
        <label className="sr-only" htmlFor="footer-newsletter-email">
          {t("newsletterPlaceholder")}
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          disabled={submitState === "loading"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (submitState === "error" || submitState === "success") {
              setSubmitState("idle");
              setFeedback("");
            }
          }}
          placeholder={t("newsletterPlaceholder")}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-2.5 font-body text-sm text-white",
            "placeholder:text-white/45 outline-none disabled:opacity-60"
          )}
        />
        <button
          type="submit"
          disabled={submitState === "loading"}
          aria-label={t("newsletterSubmit")}
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[8px]",
            "bg-[linear-gradient(135deg,#32C991_0%,#269B6F_55%,#0D9488_100%)] text-white",
            "shadow-[0_6px_16px_-6px_rgba(50,201,145,0.55)]",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(50,201,145,0.6)]",
            "active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
          )}
        >
          {submitState === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : submitState === "success" ? (
            <CheckCircle2 className="size-4" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>
      {feedback ? (
        <p
          role="status"
          className={cn(
            "mt-2 font-body text-xs",
            submitState === "error" ? "text-red-200" : "text-emerald-200"
          )}
        >
          {feedback}
        </p>
      ) : (
        <p className="mt-2 font-body text-xs text-white/50">
          {t("newsletterHint")}
        </p>
      )}
    </div>
  );
}
