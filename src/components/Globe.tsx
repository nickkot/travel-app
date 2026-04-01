"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GlobePin, GlobeMode } from "@/types";
import { GlobeToolbar } from "./GlobeToolbar";

interface GlobeProps {
  pastPins: GlobePin[];
  futurePins: GlobePin[];
  wishlistPins: GlobePin[];
  visitedCountries: string[];
  onPinClick?: (pin: GlobePin) => void;
}

// Low-res country boundaries (~300KB)
const GEOJSON_URL =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson";

export function Globe({
  pastPins,
  futurePins,
  wishlistPins,
  visitedCountries,
  onPinClick,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GlobeMode>("pins");
  const [geoData, setGeoData] = useState<any>(null);
  const [hoverPin, setHoverPin] = useState<GlobePin | null>(null);
  const [GlobeComponent, setGlobeComponent] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Manually import react-globe.gl on client only
  useEffect(() => {
    import("react-globe.gl")
      .then((mod) => {
        setGlobeComponent(() => mod.default);
      })
      .catch((err) => {
        console.error("Failed to load globe:", err);
      });
  }, []);

  // Track container dimensions
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w > 0 && h > 0) {
          setDimensions({ width: w, height: h });
        }
      }
    };
    const timer = setTimeout(updateSize, 100);
    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Load GeoJSON for political boundaries
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => {});
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!GlobeComponent) return;
    const interval = setInterval(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.3;
          controls.enableZoom = true;
          controls.enableRotate = true;
          controls.enablePan = false;
          clearInterval(interval);
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [GlobeComponent]);

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

  // Pin colors
  const getPinColor = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return "#c4623a";
      case "future":
        return "#4a90d9";
      case "wishlist":
        return "#5c8a6e";
    }
  }, []);

  // 3D raised pin altitudes — tall enough to visibly stick out
  const getPinAltitude = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.12;
      case "future":
        return 0.18;
      case "wishlist":
        return 0.08;
    }
  }, []);

  // Pin thickness
  const getPinRadius = useCallback((pin: GlobePin) => {
    switch (pin.type) {
      case "past":
        return 0.4;
      case "future":
        return 0.35;
      case "wishlist":
        return 0.25;
    }
  }, []);

  // High-contrast country fills
  const getPolygonColor = useCallback(
    (feat: any) => {
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      if (mode === "blankspots") {
        return isVisited
          ? "rgba(196, 98, 58, 0.5)"
          : "rgba(200, 191, 170, 0.7)";
      }
      if (mode === "heatmap") {
        return isVisited
          ? "rgba(196, 98, 58, 0.5)"
          : "rgba(25, 40, 65, 0.6)";
      }
      // Pins mode — high contrast
      return isVisited
        ? "rgba(196, 98, 58, 0.35)"
        : "rgba(35, 55, 85, 0.75)";
    },
    [mode, visitedSet]
  );

  // High-contrast polygon side color (gives 3D depth to raised countries)
  const getPolygonSideColor = useCallback(
    (feat: any) => {
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      if (mode === "blankspots") {
        return isVisited ? "rgba(160, 70, 35, 0.6)" : "rgba(160, 150, 130, 0.4)";
      }
      return isVisited
        ? "rgba(160, 70, 35, 0.5)"
        : "rgba(20, 35, 60, 0.5)";
    },
    [mode, visitedSet]
  );

  // Slightly raise visited countries for 3D effect
  const getPolygonAltitude = useCallback(
    (feat: any) => {
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      if (mode === "blankspots") {
        return isVisited ? 0.01 : 0.002;
      }
      return isVisited ? 0.008 : 0.002;
    },
    [mode, visitedSet]
  );

  const ReactGlobe = GlobeComponent;

  return (
    <div ref={containerRef} className="globe-container relative">
      <GlobeToolbar mode={mode} onModeChange={setMode} />

      {ReactGlobe && (
        <ReactGlobe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundColor="#0d1a2e"
          onGlobeReady={() => {
            if (globeRef.current) {
              const controls = globeRef.current.controls();
              if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
              }
            }
          }}
          // High-contrast political boundaries
          polygonsData={geoData ? geoData.features : []}
          polygonCapColor={getPolygonColor}
          polygonSideColor={getPolygonSideColor}
          polygonStrokeColor={() => "rgba(200, 210, 230, 0.5)"}
          polygonAltitude={getPolygonAltitude}
          // 3D raised pins
          pointsData={mode === "pins" ? allPins : []}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={(d: any) => getPinColor(d as GlobePin)}
          pointAltitude={(d: any) => getPinAltitude(d as GlobePin)}
          pointRadius={(d: any) => getPinRadius(d as GlobePin)}
          pointsMerge={false}
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
          // No arcs
          arcsData={[]}
          // Heatmap overlay
          hexBinPointsData={mode === "heatmap" ? heatmapData : []}
          hexBinPointWeight="weight"
          hexBinResolution={3}
          hexTopColor={() => "rgba(196, 98, 58, 0.7)"}
          hexSideColor={() => "rgba(232, 184, 74, 0.4)"}
          hexAltitude={(d: any) => d.sumWeight * 0.02}
          // Atmosphere
          animateIn={true}
          atmosphereColor="#2a4a7a"
          atmosphereAltitude={0.15}
          showGraticules={true}
          width={dimensions.width}
          height={dimensions.height}
        />
      )}

      {!GlobeComponent && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-parchment/50 text-sm">Loading globe...</div>
        </div>
      )}

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
