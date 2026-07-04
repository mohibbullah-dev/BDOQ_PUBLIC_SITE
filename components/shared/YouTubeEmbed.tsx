import { cn } from "@/lib/cn";

interface IYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  lazy?: boolean;
  autoplay?: boolean;
  startSeconds?: number;
}

function buildYouTubeEmbedSrc(
  videoId: string,
  autoplay: boolean,
  startSeconds?: number
): string {
  const params = new URLSearchParams();

  if (autoplay) params.set("autoplay", "1");
  if (startSeconds !== undefined && startSeconds > 0) {
    params.set("start", String(startSeconds));
  }

  const query = params.toString();
  return `https://www.youtube-nocookie.com/embed/${videoId}${query ? `?${query}` : ""}`;
}

export function YouTubeEmbed({
  videoId,
  title,
  className,
  lazy = true,
  autoplay = false,
  startSeconds,
}: IYouTubeEmbedProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-black aspect-video",
        className
      )}
    >
      <iframe
        src={buildYouTubeEmbedSrc(videoId, autoplay, startSeconds)}
        title={title}
        loading={lazy ? "lazy" : "eager"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
