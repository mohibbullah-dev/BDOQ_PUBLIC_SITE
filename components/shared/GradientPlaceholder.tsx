import { cn } from "@/lib/cn";

interface IGradientPlaceholderProps {
  gradient: string;
  className?: string;
  label?: string;
}

export function GradientPlaceholder({
  gradient,
  className,
  label,
}: IGradientPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br",
        gradient,
        className
      )}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
