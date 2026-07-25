"use client";

import { useEffect, useRef, useState } from "react";
import {
  Download,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export interface IFeaturedAudioPlayerProps {
  src: string;
  title: string;
  arabicTitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function FeaturedAudioPlayer({
  src,
  title,
  arabicTitle = "الفاتحة",
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: IFeaturedAudioPlayerProps) {
  const t = useTranslations("content.audio");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = (): void => setCurrentTime(audio.currentTime);
    const onLoaded = (): void => setDuration(audio.duration || 0);
    const onEnded = (): void => {
      setIsPlaying(false);
      if (!audio.loop && onNext && hasNext) onNext();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [hasNext, onNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.loop = loop;
  }, [loop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  const togglePlay = (): void => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleDownload = (): void => {
    if (!src) return;
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.mp3`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="site-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-[#228A62] to-primary p-5 text-white shadow-xl shadow-primary/20 md:p-6">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5"
        aria-hidden="true"
      />
      <audio ref={audioRef} src={src || undefined} preload="metadata" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            {t("nowPlaying")}
          </span>
          <h2 className="mt-3 font-playfair text-xl font-bold leading-snug text-white md:text-2xl">
            {title}
          </h2>
          <p
            className="mt-1 font-amiri text-lg text-white/80 md:text-xl"
            dir="rtl"
            lang="ar"
          >
            {arabicTitle}
          </p>
        </div>

        <div
          className={cn(
            "hidden h-24 w-24 shrink-0 items-center justify-center rounded-xl sm:flex",
            "border border-white/20 bg-gradient-to-br from-white/15 to-white/5",
            "shadow-inner"
          )}
          aria-hidden="true"
        >
          <span className="font-amiri text-2xl text-white/90" dir="rtl">
            {arabicTitle}
          </span>
        </div>
      </div>

      <div className="relative mt-6 space-y-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          disabled={!src}
          aria-label={t("progress")}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, #ffffff ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
          }}
        />
        <div className="flex items-center justify-between font-body text-xs text-white/75">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label={t("previous")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 disabled:opacity-35"
        >
          <SkipBack className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          disabled={!src}
          aria-label={isPlaying ? t("pause") : t("play")}
          className={cn(
            "inline-flex h-14 w-14 items-center justify-center rounded-full",
            "bg-white text-primary-dark shadow-lg transition-transform hover:scale-105",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-6 w-6" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          aria-label={t("next")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 disabled:opacity-35"
        >
          <SkipForward className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-2 border-t border-white/15 pt-4">
        <button
          type="button"
          onClick={() => setLoop((v) => !v)}
          aria-pressed={loop}
          aria-label={t("repeat")}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            loop ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
          )}
        >
          <Repeat className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!src}
          aria-label={t("download")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 disabled:opacity-35"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-pressed={muted}
          aria-label={t("volume")}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            muted ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
          )}
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
