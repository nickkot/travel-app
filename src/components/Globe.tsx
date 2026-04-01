"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobePin, GlobeMode } from "@/types";
import { GlobeToolbar } from "./GlobeToolbar";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

interface GlobeProps {
  pastPins: GlobePin[];
  futurePins: GlobePin[];
  wishlistPins: GlobePin[];
  visitedCountries: string[];
  onPinClick?: (pin: GlobePin) => void;
}

export function Globe({
  pastPins,
  futurePins,
  wishlistPins,
  visitedCountries,
  onPinClick,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const [mode, setMode] = useState<GlobeMode>("pins");
  const [geoData, setGeoData] = useState<any>(null);
  const [hoverPin, setHoverPin] = useState<GlobePin | null>(null);

  // Always load GeoJSON — it's the base map now
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => {});
  }, []);

  // Gentle auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
      }
    }
  }, []);

  const allPins = useMemo(
    () => [...pastPins, ...futurePins, ...wishlistPins],
    [pastPins, futurePins, wishlistPins]
  );

  const heatmapData = useMemo(
    () => pastPins.map((p) => ({ lat: p.lat, lng: p.lng, weight: 1 })),
    [pastPins]
  );

  const visitedSet = useMemo(
    () => new Set(visitedCountries.map((c) => c.toUpperCase())),
    [visitedCountries]
  );

  const getPinColor = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return "#f59e0b";
      case "future":
        return "#3b82f6";
      case "wishlist":
        return "#a78bfa";
    }
  }, []);

  const getPinAltitude = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.01;
      case "future":
        return 0.02;
      case "wishlist":
        return 0.008;
    }
  }, []);

  const getPinRadius = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.5;
      case "future":
        return 0.45;
      case "wishlist":
        return 0.3;
    }
  }, []);

  // Country fill logic based on mode
  const getPolygonColor = useCallback(
    (feat: any) => {
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      if (mode === "blankspots") {
        // Visited = subtle warm fill, unvisited = dark overlay
        return isVisited
          ? "rgba(245, 158, 11, 0.12)"
          : "rgba(15, 15, 35, 0.55)";
      }

      if (mode === "heatmap") {
        return isVisited
          ? "rgba(245, 158, 11, 0.25)"
          : "rgba(20, 20, 40, 0.03)";
      }

      // Pins mode — visited countries get a very subtle warm tint
      return isVisited
        ? "rgba(245, 158, 11, 0.08)"
        : "rgba(30, 32, 48, 0.4)";
    },
    [mode, visitedSet]
  );

  return (
    <div className="globe-container relative">
      <GlobeToolbar mode={mode} onModeChange={setMode} />

      <ReactGlobe
        ref={globeRef}
        // Clean base: no texture, just a solid dark globe
        globeImageUrl=""
        backgroundColor="rgba(0,0,0,0)"
        // Political boundaries as the base map (always on)
        polygonsData={geoData ? geoData.features : []}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => "rgba(0,0,0,0)"}
        polygonStrokeColor={() => "rgba(120, 130, 160, 0.25)"}
        polygonAltitude={0.003}
        // Pins (hidden in heatmap/blankspots modes for clarity)
        pointsData={mode === "pins" ? allPins : []}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={(d: any) => getPinColor(d as GlobePin)}
        pointAltitude={(d: any) => getPinAltitude(d as GlobePin)}
        pointRadius={(d: any) => getPinRadius(d as GlobePin)}
        pointLabel={(d: any) => {
          const pin = d as GlobePin;
          return `<div style="background:rgba(26,26,46,0.95);padding:8px 12px;border-radius:8px;font-size:13px;border:1px solid rgba(42,42,74,0.8);box-shadow:0 4px 12px rgba(0,0,0,0.3)">
            <div style="font-weight:600">${pin.city}</div>
            <div style="color:rgba(255,255,255,0.5);font-size:11px">${pin.country}</div>
            <div style="font-size:11px;margin-top:4px;color:${getPinColor(pin)}">${pin.type === "past" ? "Visited" : pin.type === "future" ? "Upcoming" : "Bucket List"}</div>
          </div>`;
        }}
        onPointClick={(point: any) => onPinClick?.(point as GlobePin)}
        onPointHover={(point: any) => setHoverPin(point as GlobePin | null)}
        // No arcs — clean design
        arcsData={[]}
        // Heatmap hex overlay (only in heatmap mode)
        hexBinPointsData={mode === "heatmap" ? heatmapData : []}
        hexBinPointWeight="weight"
        hexBinResolution={3}
        hexTopColor={() => "rgba(245, 158, 11, 0.5)"}
        hexSideColor={() => "rgba(245, 158, 11, 0.15)"}
        hexAltitude={(d: any) => d.sumWeight * 0.015}
        // Subtle atmosphere
        animateIn={true}
        atmosphereColor="rgba(80, 100, 140, 0.4)"
        atmosphereAltitude={0.12}
        showGraticules={true}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
      />

      {/* Hover tooltip */}
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
