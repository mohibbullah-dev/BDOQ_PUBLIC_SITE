import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const portalRoot = join(__dirname, "../..", "myAcademy-portal");
const publicSiteRoot = join(__dirname, "..");
const src = join(portalRoot, "public/certificates/logo.png");

const FOOTER_TEAL = { r: 13, g: 148, b: 136 };
const GOLD = { r: 255, g: 230, b: 180 };
const LIGHT_RED = { r: 255, g: 196, b: 186 };

function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isRemovableBackground(r, g, b, a) {
  if (a < 20) return true;
  if (r < 58 && g < 58 && b < 58) return true;
  return lum(r, g, b) < 42;
}

function floodRemoveBackground(data, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  function pushIfBackground(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (!isRemovableBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) return;
    visited[idx] = 1;
    queue.push(idx);
  }

  for (let x = 0; x < width; x += 1) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (queue.length > 0) {
    const idx = queue.pop();
    if (idx === undefined) break;
    const x = idx % width;
    const y = (idx - x) / width;
    const i = idx * 4;
    data[i + 3] = 0;
    pushIfBackground(x - 1, y);
    pushIfBackground(x + 1, y);
    pushIfBackground(x, y - 1);
    pushIfBackground(x, y + 1);
  }
}

function purgeDarkFringe(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (isRemovableBackground(r, g, b, a)) {
      data[i + 3] = 0;
    }
  }
}

function boostColorLogo(data) {
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 20) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isRed = r > g + 12 && r > b + 12;

    if (isRed) {
      data[i] = Math.min(255, Math.round(r * 1.08 + 18));
      data[i + 1] = Math.min(255, Math.round(g * 0.85 + 10));
      data[i + 2] = Math.min(255, Math.round(b * 0.85 + 8));
    } else {
      data[i] = Math.min(255, Math.round(r * 0.75 + 20));
      data[i + 1] = Math.min(255, Math.round(g * 1.1 + 28));
      data[i + 2] = Math.min(255, Math.round(b * 0.9 + 22));
    }

    data[i + 3] = Math.min(255, Math.round(a * 1.02));
  }
}

function toFooterLight(data) {
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 20) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isRed = r > g + 10 && r > b + 10;

    if (isRed) {
      data[i] = LIGHT_RED.r;
      data[i + 1] = LIGHT_RED.g;
      data[i + 2] = LIGHT_RED.b;
    } else {
      data[i] = GOLD.r;
      data[i + 1] = GOLD.g;
      data[i + 2] = GOLD.b;
    }

    data[i + 3] = Math.min(255, Math.round(a * 1.08));
  }
}

async function processVariant(data, info, transform) {
  const copy = Buffer.from(data);
  transform(copy);

  const png = await sharp(copy, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.35 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  return sharp(png).trim({ threshold: 10 }).png().toBuffer();
}

async function main() {
  const input = readFileSync(src);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  floodRemoveBackground(data, info.width, info.height);
  purgeDarkFringe(data);

  const colorData = Buffer.from(data);
  boostColorLogo(colorData);

  const footerData = Buffer.from(data);
  toFooterLight(footerData);

  const [colorLogo, footerLogo] = await Promise.all([
    processVariant(colorData, info, () => {}),
    processVariant(footerData, info, () => {}),
  ]);

  const outputs = [
    [join(portalRoot, "public/brand/bdoq-logo.png"), colorLogo],
    [join(portalRoot, "public/certificates/logo_after_BGRemove.png"), colorLogo],
    [join(publicSiteRoot, "public/images/brand/bdoq-logo.png"), colorLogo],
    [join(publicSiteRoot, "public/images/brand/bdoq-logo-footer.png"), footerLogo],
  ];

  for (const [path, buffer] of outputs) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, buffer);
    const meta = await sharp(buffer).metadata();
    console.log(`${path} -> ${meta.width}x${meta.height}, ${buffer.length} bytes`);
  }

  console.log(`Footer palette tuned for teal #${FOOTER_TEAL.r.toString(16)}${FOOTER_TEAL.g.toString(16)}${FOOTER_TEAL.b.toString(16)}`);
}

await main();
