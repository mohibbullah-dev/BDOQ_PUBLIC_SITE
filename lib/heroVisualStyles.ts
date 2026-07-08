import { cn } from "@/lib/cn";

export function heroPanel(className?: string): string {
  return cn(
    "rounded-2xl border border-[#D1D5DB] bg-white p-4",
    "shadow-[0_10px_30px_rgba(10,22,40,0.14),0_2px_8px_rgba(10,22,40,0.06)]",
    className
  );
}

export function heroPanelSoft(className?: string): string {
  return cn(
    "rounded-2xl border border-[#32C991]/20 bg-[#E8FAF2] p-4 shadow-[0_4px_16px_rgba(50,201,145,0.08)]",
    className
  );
}

export function heroBadge(className?: string): string {
  return cn(
    "inline-flex items-center rounded-full border border-[#32C991]/25 bg-white px-3 py-1",
    "font-inter text-[11px] font-bold uppercase tracking-wider text-[#32C991]",
    "shadow-sm",
    className
  );
}

export function heroStatBox(className?: string): string {
  return cn(
    "rounded-xl border border-[#D1D5DB] bg-white px-3 py-3.5 text-center",
    "shadow-[0_6px_18px_rgba(10,22,40,0.1)]",
    className
  );
}

export function heroLiveBadge(className?: string): string {
  return cn(
    "inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-3 py-1",
    "text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_0_12px_rgba(16,185,129,0.55)]",
    className
  );
}
