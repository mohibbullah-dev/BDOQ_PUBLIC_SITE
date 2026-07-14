import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FooterNewsletter } from "@/components/layout/footer/FooterNewsletter";
import { ACADEMY_INFO } from "@/lib/constants";
import { cn } from "@/lib/cn";

export async function FooterDarkBand() {
  const tFooter = await getTranslations("footer");

  return (
    <div className="relative z-[1] overflow-hidden bg-[linear-gradient(165deg,#004434_0%,#0a4d3c_42%,#0D9488_100%)] pt-16 text-white md:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'url("/brand/islamic-geo-pattern.svg")',
          backgroundSize: "90px 90px",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pb-12">
        <div>
          <FooterNewsletter />
        </div>

        <div>
          <div
            className={cn(
              "relative overflow-hidden rounded-[8px] border border-[#D4A853]/45 bg-black/20 px-4 py-5 text-center",
              "shadow-[inset_0_0_0_1px_rgba(212,168,83,0.12)] backdrop-blur-sm"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-2 h-px bg-[linear-gradient(90deg,transparent,#D4A853,transparent)]"
              aria-hidden="true"
            />
            <p
              className="font-amiri text-xl leading-relaxed text-[#E8C97A] md:text-2xl"
              dir="rtl"
              lang="ar"
            >
              {tFooter("ayahArabic")}
            </p>
            <p className="mt-3 font-inter text-sm italic text-white/80">
              {tFooter("ayahEnglish")}
            </p>
            <span
              className={cn(
                "mt-4 inline-flex rounded-[8px] px-3.5 py-1.5",
                "bg-[linear-gradient(135deg,#32C991_0%,#269B6F_100%)]",
                "font-inter text-[11px] font-bold uppercase tracking-wide text-white"
              )}
            >
              {tFooter("ayahRef")}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-inter text-base font-semibold">
            {tFooter("needHelp")}
          </h3>
          <p className="mt-2 max-w-xs font-inter text-sm text-white/70">
            {tFooter("needHelpDesc")}
          </p>
          <a
            href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
            className="footer-help-link mt-4 inline-flex items-center gap-2.5 font-inter text-xl font-bold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-white/10">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            {ACADEMY_INFO.contactBD}
          </a>
          <a
            href={`mailto:${ACADEMY_INFO.email}`}
            className="footer-help-link mt-3 flex items-center gap-2.5 font-inter text-sm text-white/85"
          >
            <span className="flex size-8 items-center justify-center rounded-[8px] bg-white/10">
              <Mail className="size-3.5" aria-hidden="true" />
            </span>
            {ACADEMY_INFO.email}
          </a>
        </div>
      </div>

      <div className="relative z-[1] border-t border-[#D4A853]/35">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-4 sm:flex-row sm:gap-6">
          <p className="text-center font-inter text-xs text-white/70 sm:text-left sm:text-sm">
            {tFooter("copyright")}
          </p>

          <p className="inline-flex items-center gap-2 text-center font-inter text-xs font-medium text-[#E8C97A] sm:text-sm">
            <span
              className="inline-block size-2.5 rotate-45 border border-[#D4A853] bg-[#D4A853]/30"
              aria-hidden="true"
            />
            {tFooter("motto")}
          </p>
        </div>
      </div>
    </div>
  );
}
