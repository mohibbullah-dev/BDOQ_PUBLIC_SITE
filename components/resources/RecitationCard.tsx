import { Headphones } from "lucide-react";
import type { IAudioRecitation } from "@/lib/types";

interface IRecitationCardProps {
  recitation: IAudioRecitation;
  onSelect?: (recitation: IAudioRecitation) => void;
}

export function RecitationCard({ recitation, onSelect }: IRecitationCardProps) {
  const progress = Math.min(100, Math.max(0, recitation.progress));

  return (
    <article>
      <button
        type="button"
        onClick={() => onSelect?.(recitation)}
        className="site-card flex w-full flex-col rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-shadow duration-200 hover:shadow-md md:p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-light text-primary">
            <Headphones className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-body text-sm font-semibold text-primary-dark md:text-base">
              {recitation.surahName}
            </h3>
            <p className="mt-0.5 font-body text-xs text-text-gray">
              {recitation.paraInfo}
            </p>
            <p className="mt-1 font-body text-xs font-medium text-primary">
              {recitation.duration}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#32C991_0%,#32C991_55%,#CD443F_100%)] transition-all"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Playback progress for ${recitation.surahName}`}
            />
          </div>
        </div>
      </button>
    </article>
  );
}
