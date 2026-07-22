import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FooterNewsletter } from "@/components/layout/footer/FooterNewsletter";
import { ACADEMY_INFO } from "@/lib/constants";

export async function FooterDarkBand() {
  const tFooter = await getTranslations("footer");

  return (
    <div className="relative z-[1] bg-[linear-gradient(135deg,#269B6F_0%,#0a4d3c_55%,#A83530_120%)] text-white">
      <div className="site-container grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:py-12">
        <div>
          <FooterNewsletter />
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-5 text-center">
          <p
            className="font-amiri text-xl leading-relaxed text-white md:text-2xl"
            dir="rtl"
            lang="ar"
          >
            {tFooter("ayahArabic")}
          </p>
          <p className="mt-3 font-body text-sm italic text-white/75">
            {tFooter("ayahEnglish")}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[linear-gradient(135deg,#32C991_0%,#CD443F_100%)] px-3.5 py-1.5 font-body text-[11px] font-bold uppercase tracking-wide text-white">
            {tFooter("ayahRef")}
          </span>
        </div>

        <div>
          <h3 className="font-body text-base font-semibold">
            {tFooter("needHelp")}
          </h3>
          <p className="mt-2 max-w-xs font-body text-sm text-white/70">
            {tFooter("needHelpDesc")}
          </p>
          <a
            href={`tel:${ACADEMY_INFO.contactBD.replace(/\s/g, "")}`}
            className="footer-help-link mt-4 inline-flex items-center gap-2.5 font-body text-lg font-bold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            {ACADEMY_INFO.contactBD}
          </a>
          <a
            href={`mailto:${ACADEMY_INFO.email}`}
            className="footer-help-link mt-3 flex items-center gap-2.5 font-body text-sm text-white/85"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-white/10">
              <Mail className="size-3.5" aria-hidden="true" />
            </span>
            {ACADEMY_INFO.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-4 sm:flex-row sm:gap-6">
          <p className="text-center font-body text-xs text-white/70 sm:text-left sm:text-sm">
            {tFooter("copyright")}
          </p>
          <p className="text-center font-body text-xs font-medium text-white/80 sm:text-sm">
            {tFooter("motto")}
          </p>
        </div>
      </div>
    </div>
  );
}
