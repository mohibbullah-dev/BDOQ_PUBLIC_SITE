import { createMap } from "svg-dotted-map";
import type { IPrecomputedDottedMap } from "@/lib/dottedMapTypes";
import {
  CONTACT_MAP_MARKERS,
  MAP_VIEWBOX,
  type IContactMapMarker,
} from "@/lib/contactMapMarkers";

/** Computed once at build/bundle time — never on the client per visit. */
const MAP_SAMPLES = 1400;

function buildStaggerMeta(points: { x: number; y: number }[]): {
  xStep: number;
  yToRowIndex: Record<string, number>;
} {
  const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
  const yToRowIndex: Record<string, number> = {};
  let xStep = 0;
  let prevY = Number.NaN;
  let prevXInRow = Number.NaN;

  for (const p of sorted) {
    if (p.y !== prevY) {
      prevY = p.y;
      prevXInRow = Number.NaN;
      const key = String(p.y);
      if (yToRowIndex[key] === undefined) {
        yToRowIndex[key] = Object.keys(yToRowIndex).length;
      }
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = p.x - prevXInRow;
      if (delta > 0) xStep = xStep === 0 ? delta : Math.min(xStep, delta);
    }
    prevXInRow = p.x;
  }

  return { xStep: xStep || 1, yToRowIndex };
}

function staggerOffset(
  yToRowIndex: Record<string, number>,
  xStep: number,
  x: number,
  y: number
): number {
  const row = yToRowIndex[String(y)] ?? 0;
  return row % 2 === 1 ? xStep / 2 : 0;
}

const { points, addMarkers } = createMap({
  width: MAP_VIEWBOX.width,
  height: MAP_VIEWBOX.height,
  mapSamples: MAP_SAMPLES,
});

const processedMarkers = addMarkers(
  CONTACT_MAP_MARKERS
) as (IContactMapMarker & { x: number; y: number })[];

const stagger = buildStaggerMeta(points);

const hqIndex = CONTACT_MAP_MARKERS.findIndex((m) => m.code === "bd");
const hqMarker = processedMarkers[hqIndex];
const hqOffsetX = hqMarker
  ? staggerOffset(stagger.yToRowIndex, stagger.xStep, hqMarker.x, hqMarker.y)
  : 0;

export const CONTACT_MAP_PRECOMPUTED: IPrecomputedDottedMap<IContactMapMarker> =
  {
    points,
    processedMarkers,
    xStep: stagger.xStep,
    yToRowIndex: stagger.yToRowIndex,
  };

export const HQ_MAP_POSITION = hqMarker
  ? {
      left: ((hqMarker.x + hqOffsetX) / MAP_VIEWBOX.width) * 100,
      top: (hqMarker.y / MAP_VIEWBOX.height) * 100,
    }
  : { left: 72, top: 42 };
