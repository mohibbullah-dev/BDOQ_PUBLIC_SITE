"use client";

import * as React from "react";
import { createMap } from "svg-dotted-map";
import type { IPrecomputedDottedMap } from "@/lib/dottedMapTypes";
import { cn } from "@/lib/cn";

export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
}

type MapMarker<M extends Marker> = Omit<M, "lat" | "lng"> & {
  x: number;
  y: number;
};

export type { IPrecomputedDottedMap } from "@/lib/dottedMapTypes";

export interface DottedMapProps<
  M extends Marker = Marker,
> extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  mapSamples?: number;
  markers?: M[];
  precomputed?: IPrecomputedDottedMap<M>;
  dotColor?: string;
  markerColor?: string;
  dotRadius?: number;
  stagger?: boolean;
  pulse?: boolean;
  renderMarkerOverlay?: (args: {
    marker: MapMarker<M>;
    index: number;
    x: number;
    y: number;
    r: number;
  }) => React.ReactNode;
}

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

function rowIndex(yToRowIndex: Record<string, number>, y: number): number {
  return yToRowIndex[String(y)] ?? 0;
}

export function DottedMap<M extends Marker = Marker>({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  precomputed,
  dotColor = "currentColor",
  markerColor = "#32C991",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
  const computed = React.useMemo(() => {
    if (precomputed) {
      return {
        points: precomputed.points,
        processedMarkers: precomputed.processedMarkers,
        xStep: precomputed.xStep,
        yToRowIndex: precomputed.yToRowIndex,
      };
    }

    const { points: mapPoints, addMarkers } = createMap({
      width,
      height,
      mapSamples,
    });
    const staggerMeta = buildStaggerMeta(mapPoints);

    return {
      points: mapPoints,
      processedMarkers: addMarkers(markers),
      ...staggerMeta,
    };
  }, [precomputed, width, height, mapSamples, markers]);

  const { points, processedMarkers, xStep, yToRowIndex } = computed;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-400", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
      {points.map((point, index) => {
        const row = rowIndex(yToRowIndex, point.y);
        const offsetX = stagger && row % 2 === 1 ? xStep / 2 : 0;
        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill={dotColor}
            key={`${point.x}-${point.y}-${index}`}
          />
        );
      })}

      {processedMarkers.map((marker, index) => {
        const row = rowIndex(yToRowIndex, marker.y);
        const offsetX = stagger && row % 2 === 1 ? xStep / 2 : 0;

        const x = marker.x + offsetX;
        const y = marker.y;
        const r = marker.size ?? dotRadius;
        const shouldPulse = pulse
          ? marker.pulse !== false
          : marker.pulse === true;
        const pulseTo = r * 2.8;

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={1}
                  strokeWidth={0.35}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={0.9}
                  strokeWidth={0.3}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({
              marker: { ...marker, x, y } as MapMarker<M>,
              index,
              x,
              y,
              r,
            })}
          </g>
        );
      })}
    </svg>
  );
}
