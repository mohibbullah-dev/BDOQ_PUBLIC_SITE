"use client";

import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  GoogleMeetIcon,
  WhatsappIcon,
  YoutubeIcon,
  ZoomIcon,
} from "@/components/shared/SocialBrandIcons";
import { cn } from "@/lib/cn";

function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 26V14.5L16 8l10 6.5V26H6Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M6 26V14.5L16 8l10 6.5V26M9 26v-6h3v6M14 26v-6h4v6M20 26v-6h3v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8V4M11.5 6.5 16 4l4.5 2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 26h24M3 28h26"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="7" cy="11" r="1.25" fill="currentColor" />
      <circle cx="25" cy="11" r="1.25" fill="currentColor" />
      <path
        d="M7 11V26M25 11V26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface IOrbitIconBubbleProps {
  children: ReactNode;
  className?: string;
}

function OrbitIconBubble({ children, className }: IOrbitIconBubbleProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full",
        "border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroOrbitingVisual() {
  return (
    <div
      className={cn(
        "dark relative mx-auto flex h-[min(420px,72vw)] w-full max-w-[440px] items-center justify-center",
        "overflow-hidden rounded-3xl border border-white/10",
        "bg-[linear-gradient(160deg,rgba(232,250,242,0.95),rgba(255,255,255,0.98))]"
      )}
    >
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="absolute z-20 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--green-primary)] shadow-[0_0_40px_rgba(50,201,145,0.45)]">
          <MosqueIcon className="h-12 w-12 text-[var(--gold)]" />
        </div>

        <OrbitingCircles
          className="border-none bg-transparent"
          radius={88}
          duration={22}
          iconSize={48}
          path
        >
          <OrbitIconBubble className="text-[var(--gold)]">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </OrbitIconBubble>
          <OrbitIconBubble className="text-[#25D366]">
            <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
          </OrbitIconBubble>
        </OrbitingCircles>

        <OrbitingCircles
          className="border-none bg-transparent"
          radius={148}
          duration={34}
          reverse
          speed={0.9}
          iconSize={48}
          path
        >
          <OrbitIconBubble className="text-[#2D8CFF]">
            <ZoomIcon className="h-5 w-5" aria-hidden="true" />
          </OrbitIconBubble>
          <OrbitIconBubble className="text-[#FF0000]">
            <YoutubeIcon className="h-5 w-5" aria-hidden="true" />
          </OrbitIconBubble>
          <OrbitIconBubble className="text-[#00AC47]">
            <GoogleMeetIcon className="h-5 w-5" aria-hidden="true" />
          </OrbitIconBubble>
        </OrbitingCircles>
      </div>
    </div>
  );
}
