import Image from "next/image";
import { cn } from "@/lib/cn";

interface ICountryFlagImgProps {
  iso: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function CountryFlagImg({
  iso,
  alt = "",
  size = 18,
  className,
}: ICountryFlagImgProps) {
  const code = iso.toLowerCase();
  const src = `https://flagcdn.com/w40/${code}.png`;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={Math.round(size * 0.75)}
      className={cn("inline-block shrink-0 rounded-sm object-cover", className)}
      unoptimized
    />
  );
}
