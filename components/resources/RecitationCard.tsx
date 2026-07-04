import type { IAudioRecitation } from "@/lib/types";
import { Headphones } from "lucide-react";

interface IRecitationCardProps {
  recitation: IAudioRecitation;
}

export function RecitationCard({ recitation }: IRecitationCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-5 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-light text-primary">
          <Headphones className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-inter text-base font-semibold text-primary-dark">
            {recitation.surahName}
          </h3>
          <p className="font-inter text-sm text-text-gray mt-1">
            {recitation.paraInfo}
          </p>
          <p className="font-inter text-xs text-text-gray mt-1">
            {recitation.duration}
          </p>
          <div className="mt-4">
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${recitation.progress}%` }}
                role="progressbar"
                aria-valuenow={recitation.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Playback progress for ${recitation.surahName}`}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
