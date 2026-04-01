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

  // Gentle auto-rotate — poll until globe is ready (dynamic import delay)
  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.3;
          controls.enableZoom = true;
          controls.enableRotate = true;
          clearInterval(interval);
        }
      }
    }, 200);
    return () => clearInterval(interval);
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

  // Aged Atlas pin colors
  const getPinColor = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return "#c4623a"; // terracotta
      case "future":
        return "#1c2b4a"; // ink navy
      case "wishlist":
        return "#5c8a6e"; // sage green
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
        // Visited = subtle terracotta fill, unvisited = warm gray wash
        return isVisited
          ? "rgba(196, 98, 58, 0.2)"
          : "rgba(200, 191, 170, 0.55)";
      }

      if (mode === "heatmap") {
        return isVisited
          ? "rgba(196, 98, 58, 0.3)"
          : "rgba(13, 26, 46, 0.05)";
      }

      // Pins mode — visited countries get a subtle terracotta tint
      return isVisited
        ? "rgba(196, 98, 58, 0.12)"
        : "rgba(30, 35, 50, 0.4)";
    },
    [mode, visitedSet]
  );

  return (
    <div className="globe-container relative">
      <GlobeToolbar mode={mode} onModeChange={setMode} />

      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        onGlobeReady={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            if (controls) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.3;
            }
          }
        }}
        // Political boundaries as the base map (always on)
        polygonsData={geoData ? geoData.features : []}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => "rgba(0,0,0,0)"}
        polygonStrokeColor={() => "rgba(120, 140, 170, 0.3)"}
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
          return `<div style="background:rgba(250,247,242,0.96);padding:8px 12px;border-radius:8px;font-size:13px;border:1px solid rgba(44,31,15,0.15);box-shadow:0 4px 12px rgba(42,31,15,0.15);color:#2a1f0f">
            <div style="font-weight:600">${pin.city}</div>
            <div style="color:#6b5740;font-size:11px">${pin.country}</div>
            <div style="font-size:11px;margin-top:4px;color:${getPinColor(pin)};font-weight:500">${pin.type === "past" ? "Visited" : pin.type === "future" ? "Upcoming" : "Bucket List"}</div>
          </div>`;
        }}
        onPointClick={(point: any) => onPinClick?.(point as GlobePin)}
        onPointHover={(point: any) => setHoverPin(point as GlobePin | null)}
        // No arcs — clean design
        arcsData={[]}
        // Heatmap hex overlay (only in heatmap mode) — terracotta → amber
        hexBinPointsData={mode === "heatmap" ? heatmapData : []}
        hexBinPointWeight="weight"
        hexBinResolution={3}
        hexTopColor={() => "rgba(196, 98, 58, 0.6)"}
        hexSideColor={() => "rgba(232, 184, 74, 0.25)"}
        hexAltitude={(d: any) => d.sumWeight * 0.015}
        // Subtle atmosphere — navy glow
        animateIn={true}
        atmosphereColor="#2a4a7a"
        atmosphereAltitude={0.12}
        showGraticules={true}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
      />

      {/* Hover tooltip */}
      {hoverPin && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-brand-bg/95 backdrop-blur-md rounded-xl border border-brand-border p-4 shadow-2xl min-w-[200px] pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getPinColor(hoverPin) }}
            />
            <span className="font-medium text-brand-text">{hoverPin.city}</span>
          </div>
          <div className="text-brand-text-secondary text-sm">{hoverPin.country}</div>
        </div>
      )}
    </div>
  );
}
