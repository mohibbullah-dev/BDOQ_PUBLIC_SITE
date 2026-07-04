import type { ICountryPresence } from "@/lib/types";

const TILE_WIDTH = 56;
const TILE_HEIGHT = 56;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function buildCountryTile(country: ICountryPresence): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = TILE_WIDTH;
  canvas.height = TILE_HEIGHT;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  try {
    const flagImg = await loadImage(
      `https://flagcdn.com/w80/${country.code}.png`
    );
    const flagW = 44;
    const flagH = 30;
    ctx.drawImage(
      flagImg,
      (TILE_WIDTH - flagW) / 2,
      (TILE_HEIGHT - flagH) / 2,
      flagW,
      flagH
    );
  } catch {
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(country.flag, TILE_WIDTH / 2, TILE_HEIGHT / 2);
  }

  return canvas.toDataURL("image/png");
}

export async function buildCountryCloudTiles(
  countries: ICountryPresence[]
): Promise<string[]> {
  return Promise.all(countries.map((country) => buildCountryTile(country)));
}

export const COUNTRY_CLOUD_TILE_WIDTH = TILE_WIDTH;
export const COUNTRY_CLOUD_TILE_HEIGHT = TILE_HEIGHT;
