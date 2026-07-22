import { cn } from "@/lib/cn";

interface IFormSectionDividerProps {
  title: string;
  className?: string;
}

export function FormSectionDivider({
  title,
  className,
}: IFormSectionDividerProps) {
  return (
    <div className={cn("relative my-8", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gold/25" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 font-body text-xs font-bold uppercase tracking-[0.14em] text-primary-dark">
          {title}
        </span>
      </div>
    </div>
  );
}
