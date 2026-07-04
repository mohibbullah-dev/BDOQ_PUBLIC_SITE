import type { Marker } from "@/components/ui/dotted-map";

export interface IPrecomputedDottedMap<M extends Marker = Marker> {
  points: { x: number; y: number }[];
  processedMarkers: (M & { x: number; y: number })[];
  xStep: number;
  /** Row index keyed by y coordinate (string for RSC serialization). */
  yToRowIndex: Record<string, number>;
}
