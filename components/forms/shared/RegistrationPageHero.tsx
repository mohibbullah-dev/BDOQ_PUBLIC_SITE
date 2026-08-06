import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { IslamicShapeBackdrop } from "@/components/shared/IslamicShapeBackdrop";
import { cn } from "@/lib/cn";

interface IRegistrationPageHeroProps {
  pageKey: "teacherRegistration" | "studentAdmission" | "freeClass";
}

export async function RegistrationPageHero({
  pageKey,
}: IRegistrationPageHeroProps) {
  const t = await getTranslations(`pages.${pageKey}`);
  const tLayout = await getTranslations("forms.layout");

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[#F7FBF8]">
      <IslamicShapeBackdrop overlay="page" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_top,rgba(232,250,242,0.9),transparent)]"
        aria-hidden="true"
      />

      <div className="site-container relative z-[1] py-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-amiri text-lg leading-relaxed text-primary md:text-xl">
            {tLayout("bismillah")}
          </p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <Star
              className="h-3.5 w-3.5 fill-gold text-gold"
              aria-hidden="true"
            />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-gold md:text-xs">
              {t("eyebrow")}
            </p>
            <Star
              className="h-3.5 w-3.5 fill-gold text-gold"
              aria-hidden="true"
            />
          </div>

          <h1
            className={cn(
              "mt-4 font-playfair text-3xl font-bold leading-tight tracking-tight text-primary-dark",
              "md:text-4xl lg:text-[2.65rem]"
            )}
          >
            {t("title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-primary-dark/75 md:text-base">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
