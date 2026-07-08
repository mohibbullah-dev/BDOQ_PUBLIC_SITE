import Image from "next/image";
import type { ICountryPresence } from "@/lib/types";

interface IHeroGlobalFlagCardProps {
  country: ICountryPresence;
}

export function HeroGlobalFlagCard({ country }: IHeroGlobalFlagCardProps) {
  return (
    <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-1.5 rounded-xl border border-[#D1D5DB] bg-white px-2 py-2.5 shadow-[0_6px_18px_rgba(10,22,40,0.1)] sm:w-20 sm:gap-2 sm:py-3">
      <div className="relative h-9 w-14 overflow-hidden rounded-[6px] shadow-sm ring-1 ring-black/[0.08] sm:h-10 sm:w-[3.75rem]">
        <Image
          src={`https://flagcdn.com/w320/${country.code}.png`}
          alt={`${country.name} flag`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 56px, 60px"
          quality={90}
        />
      </div>
      <span className="max-w-full truncate font-inter text-[9px] font-semibold text-[#269B6F] sm:text-[10px]">
        {country.name}
      </span>
    </div>
  );
}
