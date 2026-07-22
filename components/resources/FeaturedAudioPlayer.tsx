"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface IFeaturedAudioPlayerProps {
  src: string;
  title: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function FeaturedAudioPlayer({ src, title }: IFeaturedAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = (): void => setCurrentTime(audio.currentTime);
    const onLoaded = (): void => setDuration(audio.duration || 0);
    const onEnded = (): void => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="text-on-dark rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-dark to-primary p-6 text-white shadow-xl">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="h-5 w-5 text-teal-accent" aria-hidden="true" />
        <p className="font-body text-sm text-white/80">Now playing</p>
      </div>
      <p className="mb-6 font-body text-2xl font-bold leading-snug text-white">
        {title}
      </p>

      <div className="space-y-3">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Audio progress"
          className="w-full h-2 rounded-full appearance-none bg-white/20 accent-teal-accent cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2DD4BF ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
          }}
        />
        <div className="flex items-center justify-between font-body text-xs text-white/70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className={cn(
          "mt-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full",
          "bg-teal-accent text-primary-dark hover:bg-white transition-colors"
        )}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
