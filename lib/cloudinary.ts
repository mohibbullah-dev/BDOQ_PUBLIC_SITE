export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dbrzjrqbm";

interface ICloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale";
  gravity?: "face" | "auto" | "center";
}

export function cloudinaryImageUrl(
  publicId: string,
  options: ICloudinaryImageOptions = {}
): string {
  const {
    width = 400,
    height = 400,
    crop = "fill",
    gravity = "face",
  } = options;

  const transform = `c_${crop},g_${gravity},w_${width},h_${height},f_auto,q_auto`;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

export function isCloudinaryUrl(url: string): boolean {
  return url.includes("res.cloudinary.com");
}
