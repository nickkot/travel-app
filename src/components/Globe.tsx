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

// Sub-national boundaries (US states, Canada provinces, Mexico states)
const US_STATES_URL =
  "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";
const CANADA_PROVINCES_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson";
const MEXICO_STATES_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/mexico.geojson";

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

  // Load GeoJSON for political boundaries + sub-national regions
  useEffect(() => {
    Promise.all([
      fetch(GEOJSON_URL).then((r) => r.json()),
      fetch(US_STATES_URL).then((r) => r.json()).catch(() => null),
      fetch(CANADA_PROVINCES_URL).then((r) => r.json()).catch(() => null),
      fetch(MEXICO_STATES_URL).then((r) => r.json()).catch(() => null),
    ]).then(([countries, usStates, caProvinces, mxStates]) => {
      const features = [...(countries?.features || [])];
      const tagFeatures = (data: any) => {
        if (!data?.features) return;
        features.push(
          ...data.features.map((f: any) => ({
            ...f,
            properties: { ...f.properties, _isState: true },
          }))
        );
      };
      tagFeatures(usStates);
      tagFeatures(caProvinces);
      tagFeatures(mxStates);
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

  // HTML pin altitude
  const getHtmlAltitude = useCallback((pin: GlobePin) => {
    if (pin.friendId) return 0.04;
    switch (pin.type) {
      case "past": return 0.06;
      case "future": return 0.08;
      case "wishlist": return 0.04;
    }
  }, []);

  // Create custom HTML pin element
  const createPinElement = useCallback(
    (d: any) => {
      const pin = d as GlobePin;
      const color = getPinColor(pin);

      // Determine CSS class and icon
      let typeClass = "globe-pin-past";
      let icon = "\u{2713}"; // ✓
      if (pin.friendId) {
        typeClass = "globe-pin-friend";
        icon = (pin.friendName || "?").charAt(0).toUpperCase();
      } else if (pin.type === "future") {
        typeClass = "globe-pin-future";
        icon = "\u{2708}"; // ✈
      } else if (pin.type === "wishlist") {
        typeClass = "globe-pin-wishlist";
        icon = "\u{2665}"; // ♥
      }

      const wrapper = document.createElement("div");
      wrapper.className = `globe-pin ${typeClass}`;

      const head = document.createElement("div");
      head.className = "globe-pin-head";
      head.textContent = icon;
      if (pin.friendId) {
        head.style.background = color;
      }

      const tail = document.createElement("div");
      tail.className = "globe-pin-tail";
      if (pin.friendId) {
        tail.style.borderTopColor = color;
      }

      wrapper.appendChild(head);
      wrapper.appendChild(tail);

      // Events
      wrapper.onclick = (e) => {
        e.stopPropagation();
        onPinClick?.(pin);
      };
      wrapper.onmouseenter = () => setHoverPin(pin);
      wrapper.onmouseleave = () => setHoverPin(null);

      return wrapper;
    },
    [getPinColor, onPinClick]
  );

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
          // Custom HTML pins
          htmlElementsData={visiblePins}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlAltitude={(d: any) => getHtmlAltitude(d as GlobePin)}
          htmlElement={createPinElement}
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
