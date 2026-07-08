"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  LayoutDashboard,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BdoqLogo } from "@/components/brand/BdoqLogo";
import {
  formInputClass,
  formLabelClass,
  formSectionClass,
  formSectionInnerClass,
} from "@/components/forms/shared/formStyles";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { PORTAL_BASE_URL, PORTAL_LOGIN_URL } from "@/lib/navigation";
import { cn } from "@/lib/cn";

const revealEase = [0.22, 1, 0.36, 1] as const;

const HIGHLIGHT_ICONS = [LayoutDashboard, BookOpen, ShieldCheck] as const;

interface ILoginHighlight {
  title: string;
  description: string;
}

export function LoginPageContent() {
  const t = useTranslations("pages.login");
  const tCommon = useTranslations("forms.layout");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const rawHighlights = t.raw("highlights");
  const highlights = Array.isArray(rawHighlights)
    ? (rawHighlights as ILoginHighlight[])
    : [];

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const portalUrl = new URL(PORTAL_LOGIN_URL);
    if (email) portalUrl.searchParams.set("email", email);
    if (rememberMe) portalUrl.searchParams.set("remember", "1");
    window.location.href = portalUrl.toString();
  };

  return (
    <section className="relative overflow-hidden bg-bg-light py-10 md:py-14 lg:py-16">
      <IslamicShapeBackdrop overlay="page" />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--green-primary)]/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#0D9488]/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1]">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-10">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: revealEase }}
            className="relative hidden overflow-hidden rounded-3xl border border-[var(--green-primary)]/15 lg:flex lg:flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-dark)] via-[#32C991] to-[var(--green-primary)]" />
            <IslamicShapeBackdrop overlay="sidebar" className="opacity-60" />
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-[1] flex flex-1 flex-col p-8 xl:p-10">
              <div className="inline-flex rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-white/30">
                <BdoqLogo size="sm" priority />
              </div>

              <p className="mt-8 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 font-playfair text-3xl font-bold leading-tight text-white xl:text-4xl">
                {t("panelTitle")}
              </h1>
              <p className="mt-4 max-w-md font-inter text-sm leading-relaxed text-white/85">
                {t("panelSubtitle")}
              </p>

              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-inter text-xs font-semibold text-white backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t("secureBadge")}
              </span>

              <ul className="mt-8 space-y-3">
                {highlights.map((item, index) => {
                  const Icon = HIGHLIGHT_ICONS[index] ?? ShieldCheck;
                  return (
                    <li
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="font-inter text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 font-inter text-xs leading-relaxed text-white/80">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-auto pt-8 font-amiri text-lg leading-relaxed text-white/90">
                {tCommon("bismillah")}
              </p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: revealEase }}
            className={cn(formSectionClass, "overflow-hidden")}
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--green-primary)] to-transparent"
              aria-hidden="true"
            />
            <IslamicShapeBackdrop overlay="form" />

            <div className={cn(formSectionInnerClass, "relative z-[1]")}>
              <div className="mb-8 lg:hidden">
                <p className="font-inter text-xs font-semibold uppercase tracking-widest text-[var(--green-primary)]">
                  {t("eyebrow")}
                </p>
                <h1 className="mt-2 font-playfair text-3xl font-bold text-[var(--green-dark)]">
                  {t("title")}
                </h1>
                <p className="mt-3 font-inter text-sm leading-relaxed text-[var(--text-gray)]">
                  {t("subtitle")}
                </p>
              </div>

              <div className="mb-8 hidden lg:block">
                <h2 className="font-playfair text-2xl font-bold text-[var(--green-dark)] md:text-[1.75rem]">
                  {t("title")}
                </h2>
                <p className="mt-2 font-inter text-sm leading-relaxed text-[var(--text-gray)]">
                  {t("subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className={formLabelClass}>
                    {t("username")}
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-gray)]"
                      aria-hidden="true"
                    />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(formInputClass, "pl-11")}
                      autoComplete="username"
                      placeholder={t("emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className={formLabelClass}>
                    {t("password")}
                  </label>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-gray)]"
                      aria-hidden="true"
                    />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(formInputClass, "pl-11 pr-12")}
                      autoComplete="current-password"
                      placeholder={t("passwordPlaceholder")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-gray)] transition-colors hover:bg-[var(--green-light)] hover:text-[var(--green-primary)]"
                      aria-label={
                        showPassword ? t("hidePassword") : t("showPassword")
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="font-inter text-sm text-text-dark">
                      {t("remember")}
                    </span>
                  </label>
                  <a
                    href={`${PORTAL_BASE_URL}/forgot-password`}
                    className="font-inter text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {t("forgot")}
                  </a>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "site-btn-hover-overlay site-btn-hover-overlay--filled w-full min-h-[48px] rounded-full bg-primary",
                    "font-inter text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl"
                  )}
                >
                  {t("signIn")}
                </button>
              </form>

              <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                <p className="text-center font-inter text-sm text-text-gray">
                  {t("noAccount")}{" "}
                  <Link
                    href="/student-admission"
                    className="font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {t("register")}
                  </Link>
                </p>

                <p className="text-center font-inter text-sm text-text-gray">
                  <Link
                    href="/teacher-registration"
                    className="font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {t("teacherApply")}
                  </Link>
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mx-auto flex min-h-[44px] items-center justify-center gap-2 font-inter text-sm text-text-gray transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {t("backToSite").replace("← ", "")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
