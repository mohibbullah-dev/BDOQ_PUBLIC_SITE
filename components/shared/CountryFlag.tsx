import Image from "next/image";

interface ICountryFlagProps {
  code: string;
  name: string;
  size?: "sm" | "md";
  className?: string;
}

const FLAG_SIZES = {
  sm: { width: 24, height: 16, className: "h-4 w-6" },
  md: { width: 40, height: 28, className: "h-5 w-7" },
} as const;

export function CountryFlag({
  code,
  name,
  size = "sm",
  className,
}: ICountryFlagProps) {
  const dimensions = FLAG_SIZES[size];

  return (
    <Image
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={`${name} flag`}
      width={dimensions.width}
      height={dimensions.height}
      className={`${dimensions.className} shrink-0 rounded-[4px] object-cover ring-1 ring-black/10 ${className ?? ""}`}
      unoptimized
    />
  );
}
