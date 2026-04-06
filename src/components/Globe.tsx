"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GlobePin, GlobeMode, FriendData } from "@/types";
import { GlobeToolbar } from "./GlobeToolbar";
import { getAllFriendPins } from "@/data/demoFriends";

interface GlobeProps {
  pastPins: GlobePin[];
  futurePins: GlobePin[];
  wishlistPins: GlobePin[];
  visitedCountries: string[];
  visitedStates?: string[];
  friends?: FriendData[];
  selectedFriendIds?: string[];
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
  onPinClick?: (pin: GlobePin) => void;
}

// Low-res country boundaries (~300KB)
const GEOJSON_URL =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson";

// US state boundaries
const US_STATES_URL =
  "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";

export function Globe({
  pastPins,
  futurePins,
  wishlistPins,
  visitedCountries,
  visitedStates = [],
  friends = [],
  selectedFriendIds = [],
  mode,
  onModeChange,
  onPinClick,
}: GlobeProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Load GeoJSON for political boundaries + US states
  useEffect(() => {
    Promise.all([
      fetch(GEOJSON_URL).then((r) => r.json()),
      fetch(US_STATES_URL).then((r) => r.json()).catch(() => null),
    ]).then(([countries, states]) => {
      const features = [...(countries?.features || [])];
      if (states?.features) {
        // Tag state features so we can identify them in color callbacks
        const stateFeatures = states.features.map((f: any) => ({
          ...f,
          properties: { ...f.properties, _isState: true },
        }));
        features.push(...stateFeatures);
      }
      setGeoData({ features });
    }).catch(() => {});
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

  // All user pins (for pins mode)
  const allPins = useMemo(
    () => [...pastPins, ...futurePins, ...wishlistPins],
    [pastPins, futurePins, wishlistPins]
  );

  // Friend pins filtered by selection
  const filteredFriendPins = useMemo(() => {
    const selectedSet = new Set(selectedFriendIds);
    const selectedFriends = friends.filter((f) => selectedSet.has(f.id));
    return getAllFriendPins(selectedFriends);
  }, [friends, selectedFriendIds]);

  // Combined pins for friends mode: user's past + friend pins
  const friendsModePins = useMemo(
    () => [...pastPins, ...filteredFriendPins],
    [pastPins, filteredFriendPins]
  );

  // Points to show based on mode
  const visiblePins = useMemo(
    () => (mode === "pins" ? allPins : friendsModePins),
    [mode, allPins, friendsModePins]
  );

  const visitedSet = useMemo(
    () => new Set(visitedCountries.map((c) => c.toUpperCase())),
    [visitedCountries]
  );

  const visitedStateSet = useMemo(
    () => new Set(visitedStates.map((s) => s.toUpperCase())),
    [visitedStates]
  );

  // Countries visited by selected friends
  const friendCountrySet = useMemo(() => {
    const selectedSet = new Set(selectedFriendIds);
    const countries = new Set<string>();
    friends
      .filter((f) => selectedSet.has(f.id))
      .forEach((f) => f.visitedCountries.forEach((c) => countries.add(c.toUpperCase())));
    return countries;
  }, [friends, selectedFriendIds]);

  // Friend color lookup
  const friendColorMap = useMemo(() => {
    const map = new Map<string, string>();
    friends.forEach((f) => map.set(f.id, f.color));
    return map;
  }, [friends]);

  // Pin colors — friend pins use friend color
  const getPinColor = useCallback(
    (pin: GlobePin) => {
      if (pin.friendId) {
        return friendColorMap.get(pin.friendId) ?? "#999";
      }
      switch (pin.type) {
        case "past":
          return "#c4623a";
        case "future":
          return "#4a90d9";
        case "wishlist":
          return "#5c8a6e";
      }
    },
    [friendColorMap]
  );

  // Pin altitudes — friend pins slightly shorter
  const getPinAltitude = useCallback((pin: GlobePin) => {
    if (pin.friendId) return 0.08;
    switch (pin.type) {
      case "past":
        return 0.12;
      case "future":
        return 0.18;
      case "wishlist":
        return 0.08;
    }
  }, []);

  // Pin thickness — friend pins slightly smaller
  const getPinRadius = useCallback((pin: GlobePin) => {
    if (pin.friendId) return 0.3;
    switch (pin.type) {
      case "past":
        return 0.4;
      case "future":
        return 0.35;
      case "wishlist":
        return 0.25;
    }
  }, []);

  // Country + state polygon colors
  const getPolygonColor = useCallback(
    (feat: any) => {
      // US state polygons
      if (feat.properties?._isState) {
        const stateName = (feat.properties?.name || "").toUpperCase();
        const isStateVisited = visitedStateSet.has(stateName);
        return isStateVisited
          ? "rgba(28, 43, 74, 0.35)"  // navy tint for visited states
          : "rgba(255, 255, 255, 0.08)"; // subtle outline for unvisited
      }

      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const nameUp = name.toUpperCase();
      const isoUp = iso.toUpperCase();
      const isVisited = visitedSet.has(nameUp) || visitedSet.has(isoUp);
      const isFriendVisited = friendCountrySet.has(nameUp) || friendCountrySet.has(isoUp);

      if (mode === "friends") {
        if (isVisited && isFriendVisited)
          return "rgba(180, 150, 210, 0.45)";
        if (isFriendVisited) return "rgba(160, 140, 200, 0.35)";
        if (isVisited) return "rgba(196, 98, 58, 0.3)";
        return "rgba(0, 0, 0, 0)";
      }
      return isVisited
        ? "rgba(196, 98, 58, 0.3)"
        : "rgba(0, 0, 0, 0)";
    },
    [mode, visitedSet, visitedStateSet, friendCountrySet]
  );

  // Side colors for 3D depth
  const getPolygonSideColor = useCallback(
    (feat: any) => {
      if (feat.properties?._isState) {
        const stateName = (feat.properties?.name || "").toUpperCase();
        return visitedStateSet.has(stateName)
          ? "rgba(28, 43, 74, 0.4)"
          : "rgba(0, 0, 0, 0)";
      }
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const isVisited =
        visitedSet.has(name.toUpperCase()) || visitedSet.has(iso.toUpperCase());

      return isVisited
        ? "rgba(180, 140, 90, 0.5)"
        : "rgba(0, 0, 0, 0)";
    },
    [visitedSet, visitedStateSet]
  );

  // Visited countries/states slightly raised
  const getPolygonAltitude = useCallback(
    (feat: any) => {
      if (feat.properties?._isState) {
        const stateName = (feat.properties?.name || "").toUpperCase();
        return visitedStateSet.has(stateName) ? 0.008 : 0.002;
      }
      const name = feat.properties?.ADMIN || feat.properties?.name || "";
      const iso = feat.properties?.ISO_A3 || "";
      const nameUp = name.toUpperCase();
      const isoUp = iso.toUpperCase();
      const isVisited = visitedSet.has(nameUp) || visitedSet.has(isoUp);
      const isFriendVisited = friendCountrySet.has(nameUp) || friendCountrySet.has(isoUp);

      if (mode === "friends" && isFriendVisited) {
        return isVisited ? 0.012 : 0.008;
      }
      return isVisited ? 0.01 : 0.003;
    },
    [mode, visitedSet, visitedStateSet, friendCountrySet]
  );

  const ReactGlobe = GlobeComponent;

  return (
    <div ref={containerRef} className="globe-container relative">
      <GlobeToolbar mode={mode} onModeChange={onModeChange} />

      {ReactGlobe && (
        <ReactGlobe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="#0d1a30"
          onGlobeReady={() => {
            if (globeRef.current) {
              const controls = globeRef.current.controls();
              if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
              }
            }
          }}
          // Political boundaries
          polygonsData={geoData ? geoData.features : []}
          polygonCapColor={getPolygonColor}
          polygonSideColor={getPolygonSideColor}
          polygonStrokeColor={() => "rgba(255, 255, 255, 0.15)"}
          polygonAltitude={getPolygonAltitude}
          // 3D raised pins
          pointsData={visiblePins}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={(d: any) => getPinColor(d as GlobePin)}
          pointAltitude={(d: any) => getPinAltitude(d as GlobePin)}
          pointRadius={(d: any) => getPinRadius(d as GlobePin)}
          pointsMerge={false}
          pointLabel={(d: any) => {
            const pin = d as GlobePin;
            const friendLine = pin.friendName
              ? `<div style="font-size:11px;margin-bottom:2px;color:${getPinColor(pin)};font-weight:600">${pin.friendName}</div>`
              : "";
            const statusLabel = pin.friendName
              ? "Friend's trip"
              : pin.type === "past"
                ? "Visited"
                : pin.type === "future"
                  ? "Upcoming"
                  : "Bucket List";
            return `<div style="background:rgba(250,247,242,0.96);padding:8px 12px;border-radius:8px;font-size:13px;border:1px solid rgba(44,31,15,0.15);box-shadow:0 4px 12px rgba(42,31,15,0.15);color:#2a1f0f">
              ${friendLine}
              <div style="font-weight:600">${pin.city}</div>
              <div style="color:#6b5740;font-size:11px">${pin.country}</div>
              <div style="font-size:11px;margin-top:4px;color:${getPinColor(pin)};font-weight:500">${statusLabel}</div>
            </div>`;
          }}
          onPointClick={(point: any) => onPinClick?.(point as GlobePin)}
          onPointHover={(point: any) => setHoverPin(point as GlobePin | null)}
          // No arcs
          arcsData={[]}
          // Atmosphere
          animateIn={true}
          atmosphereColor="#4a8abf"
          atmosphereAltitude={0.18}
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
            <span className="font-medium text-brand-text">
              {hoverPin.friendName ? `${hoverPin.friendName} — ` : ""}
              {hoverPin.city}
            </span>
          </div>
          <div className="text-brand-text-secondary text-sm">{hoverPin.country}</div>
        </div>
      )}
    </div>
  );
}
