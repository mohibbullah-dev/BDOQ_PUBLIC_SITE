"use client";

import { Heart } from "lucide-react";
import type { HeroSlideVisualType } from "@/lib/heroSlides";
import { HeroLiveQueueVisual } from "@/components/home/HeroLiveQueueVisual";
import { HeroGlobalVisual } from "@/components/home/HeroGlobalVisual";
import { HeroHifzVisual } from "@/components/home/HeroHifzVisual";
import { HeroPrivacyVisual } from "@/components/home/HeroPrivacyVisual";
import { HeroFreeTrialVisual } from "@/components/home/HeroFreeTrialVisual";
import { HeroVideoClassroomVisual } from "@/components/home/HeroVideoClassroomVisual";
import { HeroPersonalScheduleVisual } from "@/components/home/HeroPersonalScheduleVisual";
import { HeroOrbitingVisual } from "@/components/home/HeroOrbitingVisual";
import { HeroVisualFrame } from "@/components/home/HeroVisualFrame";
import { heroStatBox } from "@/lib/heroVisualStyles";

interface IHeroSlideVisualProps {
  type: HeroSlideVisualType;
}

function HeroStatVisual({
  icon: Icon,
  title,
  subtitle,
  stats,
}: {
  icon: typeof Heart;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <HeroVisualFrame accent="teal" label="Personal Learning Dashboard">
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--green-primary)]/15">
            <Icon className="h-6 w-6 text-[var(--gold)]" aria-hidden="true" />
          </span>
          <div>
            <p className="font-playfair text-xl font-bold text-[#269B6F]">
              {title}
            </p>
            <p className="text-sm text-[#6B7280]">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={heroStatBox()}>
              <p className="font-inter text-xl font-bold text-[#269B6F]">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </HeroVisualFrame>
  );
}

export function HeroSlideVisual({ type }: IHeroSlideVisualProps) {
  switch (type) {
    case "live-queue":
      return <HeroLiveQueueVisual />;
    case "global-presence":
      return <HeroGlobalVisual />;
    case "hifz-journey":
      return <HeroHifzVisual />;
    case "video-classroom":
      return <HeroVideoClassroomVisual />;
    case "personal-schedule":
      return <HeroPersonalScheduleVisual />;
    case "orbiting":
      return <HeroOrbitingVisual />;
    case "personal-care":
      return (
        <HeroStatVisual
          icon={Heart}
          title="Built Around You"
          subtitle="Progress tracked. Care delivered."
          stats={[
            { value: "1:1", label: "Ratio" },
            { value: "24/7", label: "Support" },
            { value: "40m", label: "Avg Class" },
          ]}
        />
      );
    case "privacy":
      return <HeroPrivacyVisual />;
    case "free-trial":
      return <HeroFreeTrialVisual />;
    default:
      return <HeroOrbitingVisual />;
  }
}
