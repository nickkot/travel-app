"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobePin, GlobeArc, GlobeMode } from "@/types";
import { GlobeToolbar } from "./GlobeToolbar";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

// Country GeoJSON for blank spots mode
const GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

interface GlobeProps {
  pastPins: GlobePin[];
  futurePins: GlobePin[];
  wishlistPins: GlobePin[];
  arcs: GlobeArc[];
  visitedCountries: string[];
  onPinClick?: (pin: GlobePin) => void;
}

export function Globe({
  pastPins,
  futurePins,
  wishlistPins,
  arcs,
  visitedCountries,
  onPinClick,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [mode, setMode] = useState<GlobeMode>("pins");
  const [geoData, setGeoData] = useState<any>(null);
  const [hoverPin, setHoverPin] = useState<GlobePin | null>(null);

  // Load country GeoJSON for blank spots / heatmap
  useEffect(() => {
    if (mode === "blankspots" || mode === "heatmap") {
      fetch(GEOJSON_URL)
        .then((r) => r.json())
        .then(setGeoData)
        .catch(() => {});
    }
  }, [mode]);

  // Auto-rotate on mount
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
    }
  }, []);

  const allPins = useMemo(
    () => [...pastPins, ...futurePins, ...wishlistPins],
    [pastPins, futurePins, wishlistPins]
  );

  // Heatmap weight data
  const heatmapData = useMemo(
    () =>
      pastPins.map((p) => ({
        lat: p.lat,
        lng: p.lng,
        weight: 1,
      })),
    [pastPins]
  );

  const visitedSet = useMemo(
    () => new Set(visitedCountries.map((c) => c.toUpperCase())),
    [visitedCountries]
  );

  const getPinColor = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return "#f59e0b"; // warm amber
      case "future":
        return "#3b82f6"; // cool blue
      case "wishlist":
        return "#a78bfa"; // soft purple
    }
  }, []);

  const getPinAltitude = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.02;
      case "future":
        return 0.035;
      case "wishlist":
        return 0.015;
    }
  }, []);

  const getPinRadius = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.6;
      case "future":
        return 0.5;
      case "wishlist":
        return 0.35;
    }
  }, []);

  const getPolygonColor = useCallback(
    (feat: any) => {
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      if (mode === "blankspots") {
        return isVisited ? "rgba(245, 158, 11, 0.15)" : "rgba(30, 30, 60, 0.6)";
      }
      // heatmap mode
      return isVisited ? "rgba(245, 158, 11, 0.3)" : "rgba(30, 30, 60, 0.05)";
    },
    [mode, visitedSet]
  );

  return (
    <div className="globe-container relative">
      <GlobeToolbar mode={mode} onModeChange={setMode} />

      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // Pins
        pointsData={mode === "pins" ? allPins : []}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => getPinColor(d as GlobePin)}
        pointAltitude={(d: any) => getPinAltitude(d as GlobePin)}
        pointRadius={(d: any) => getPinRadius(d as GlobePin)}
        pointLabel={(d: any) => {
          const pin = d as GlobePin;
          return `<div class="bg-surface/95 px-3 py-2 rounded-lg text-sm shadow-lg border border-border">
            <div class="font-medium">${pin.city}</div>
            <div class="text-foreground/60 text-xs">${pin.country}</div>
            <div class="text-xs mt-1" style="color: ${getPinColor(pin)}">${pin.type === "past" ? "Visited" : pin.type === "future" ? "Upcoming" : "Bucket List"}</div>
          </div>`;
        }}
        onPointClick={(point: any) => onPinClick?.(point as GlobePin)}
        onPointHover={(point: any) => setHoverPin(point as GlobePin | null)}
        // Arcs
        arcsData={mode === "pins" ? arcs : []}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={(d: any) => d.color || "rgba(245, 158, 11, 0.4)"}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        // Polygons (blank spots / heatmap)
        polygonsData={
          (mode === "blankspots" || mode === "heatmap") && geoData
            ? geoData.features
            : []
        }
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => "rgba(0,0,0,0)"}
        polygonStrokeColor={() => "rgba(100, 100, 150, 0.2)"}
        polygonAltitude={0.005}
        // Heatmap points overlay
        hexBinPointsData={mode === "heatmap" ? heatmapData : []}
        hexBinPointWeight="weight"
        hexBinResolution={3}
        hexTopColor={() => "rgba(245, 158, 11, 0.6)"}
        hexSideColor={() => "rgba(245, 158, 11, 0.2)"}
        hexAltitude={(d: any) => d.sumWeight * 0.02}
        // Settings
        animateIn={true}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
      />

      {/* Selected pin card overlay */}
      {hoverPin && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur-md rounded-xl border border-border p-4 shadow-2xl min-w-[200px] pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getPinColor(hoverPin) }}
            />
            <span className="font-medium">{hoverPin.city}</span>
          </div>
          <div className="text-foreground/60 text-sm">{hoverPin.country}</div>
        </div>
      )}
    </div>
  );
}
