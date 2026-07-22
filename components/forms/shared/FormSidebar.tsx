"use client";

import { MessageCircle, ShieldCheck, Users, Clock3, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACADEMY_INFO } from "@/lib/constants";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import type { FormLayoutVariant } from "@/lib/forms/formLayout";
import { useStepTitle } from "@/lib/i18n/useFormLocale";
import type { IWizardStep } from "@/components/forms/wizard/WizardProgress";
import { cn } from "@/lib/cn";

interface IFormSidebarProps {
  variant: FormLayoutVariant;
  steps?: IWizardStep[];
  currentStep?: number;
  className?: string;
}

const TRUST_ICONS = [ShieldCheck, MessageCircle, Users] as const;

export function FormSidebar({
  variant,
  steps,
  currentStep = 0,
  className,
}: IFormSidebarProps) {
  const t = useTranslations(`forms.layout.${variant}`);
  const tCommon = useTranslations("forms.layout");
  const stepTitle = useStepTitle();
  const whatsappUrl = `https://wa.me/${ACADEMY_INFO.whatsapp.replace(/\D/g, "")}`;

  const trustKeys = ["trustSecure", "trustWhatsapp", "trustTeachers"] as const;

  return (
    <aside
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/10 bg-bg-light lg:sticky lg:top-28",
        className
      )}
    >
      <IslamicShapeBackdrop overlay="sidebar" />

      <div className="relative z-[1] p-6 md:p-7">
        <p className="text-center font-amiri text-lg leading-relaxed text-primary-dark/90 md:text-xl">
          {tCommon("bismillah")}
        </p>
        <div
          className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          aria-hidden="true"
        />

        <h2 className="mt-5 font-amiri text-xl font-bold text-primary-dark md:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-gray">
          {t("subtitle")}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3 py-1.5 font-body text-xs font-semibold text-primary">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {t("estimate")}
        </div>

        {steps && steps.length > 0 && (
          <ol className="mt-8 hidden space-y-2 lg:block">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                    isActive
                      ? "border-primary/30 bg-white shadow-sm"
                      : isComplete
                        ? "border-primary/15 bg-white/70"
                        : "border-transparent bg-white/40"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      isComplete
                        ? "bg-primary text-white"
                        : isActive
                          ? "bg-primary/15 text-primary"
                          : "bg-gray-100 text-text-gray"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-body text-sm font-medium leading-snug",
                      isActive ? "text-primary-dark" : "text-text-gray"
                    )}
                  >
                    {stepTitle(step)}
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        <ul className="mt-8 space-y-3">
          {trustKeys.map((key, index) => {
            const Icon = TRUST_ICONS[index] ?? ShieldCheck;
            return (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/75 px-3 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-body text-sm font-medium text-primary-dark">
                  {t(key)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-xl border border-primary/10 bg-white/80 p-4">
          <p className="font-body text-xs font-bold uppercase tracking-wider text-text-gray">
            {tCommon("helpTitle")}
          </p>
          <p className="mt-1 font-body text-sm text-text-gray">
            {tCommon("helpBody")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <p className="mt-6 text-center font-body text-[11px] text-text-gray/80">
          {ACADEMY_INFO.shortName} · {tCommon("tagline")}
        </p>
      </div>
    </aside>
  );
}
