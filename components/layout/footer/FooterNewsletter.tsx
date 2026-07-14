"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function FooterNewsletter() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent("Newsletter subscription — BDOQ Academy");
    const body = encodeURIComponent(`Please subscribe me:\n${trimmed}`);
    window.location.href = `mailto:${ACADEMY_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div>
      <h3 className="font-inter text-base font-semibold text-white">
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
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("newsletterPlaceholder")}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-2.5 font-inter text-sm text-white",
            "placeholder:text-white/45 outline-none"
          )}
        />
        <button
          type="submit"
          aria-label={t("newsletterSubmit")}
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[8px]",
            "bg-[linear-gradient(135deg,#32C991_0%,#269B6F_55%,#0D9488_100%)] text-white",
            "shadow-[0_6px_16px_-6px_rgba(50,201,145,0.55)]",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(50,201,145,0.6)]",
            "active:translate-y-0"
          )}
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </form>
      {sent ? (
        <p className="sr-only" role="status">
          {t("newsletterSubmit")}
        </p>
      ) : null}
    </div>
  );
}
