"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { API_BASE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SubmitState = "idle" | "loading" | "success" | "error";

export function BlogNewsletterCard() {
  const t = useTranslations("content.blog");
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
            source: "blog",
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
    <aside className="site-card rounded-2xl border border-primary/15 bg-bg-light p-5 md:p-6">
      <p className="inline-flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">
        <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        {t("stayUpdated")}
      </p>
      <p className="mt-3 font-body text-sm leading-relaxed text-text-gray">
        {t("newsletterDesc")}
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-2.5">
        <label className="sr-only" htmlFor="blog-newsletter-email">
          {t("newsletterPlaceholder")}
        </label>
        <input
          id="blog-newsletter-email"
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
            "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5",
            "font-body text-sm text-primary-dark outline-none",
            "placeholder:text-text-gray/70 focus:border-primary"
          )}
        />
        <button
          type="submit"
          disabled={submitState === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-70"
        >
          {submitState === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {t("subscribe")}
        </button>
      </form>

      {feedback ? (
        <p
          className={cn(
            "mt-3 font-body text-xs",
            submitState === "success" ? "text-primary" : "text-brand-red"
          )}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </aside>
  );
}
