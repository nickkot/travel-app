"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_ICONS } from "@/lib/tierStyles";

// Demo passport data
const PASSPORT = {
  name: "STAMPY TRAVELER",
  memberSince: "2024",
  tier: 2,
  stats: {
    trips: 14,
    distance: 93_420,
    travelDays: 187,
    countries: 10,
    cities: 28,
    continents: 5,
  },
  // Country flags for visited countries
  flags: [
    "\u{1F1F2}\u{1F1FD}", // Mexico
    "\u{1F1EF}\u{1F1F5}", // Japan
    "\u{1F1EE}\u{1F1F9}", // Italy
    "\u{1F1E6}\u{1F1FA}", // Australia
    "\u{1F1EB}\u{1F1F7}", // France
    "\u{1F1F9}\u{1F1ED}", // Thailand
    "\u{1F1F5}\u{1F1EA}", // Peru
    "\u{1F1EE}\u{1F1F3}", // India
    "\u{1F1F7}\u{1F1FA}", // Russia
    "\u{1F1F0}\u{1F1EA}", // Kenya
  ],
  // Arc connections (from → to coordinates)
  routes: [
    { from: [37.8, -122.4], to: [35.7, 139.7] },   // SF → Tokyo
    { from: [35.7, 139.7], to: [13.8, 100.5] },     // Tokyo → Bangkok
    { from: [37.8, -122.4], to: [48.9, 2.3] },      // SF → Paris
    { from: [48.9, 2.3], to: [41.9, 12.5] },        // Paris → Rome
    { from: [37.8, -122.4], to: [17.1, -96.7] },    // SF → Oaxaca
    { from: [17.1, -96.7], to: [-13.2, -72.5] },    // Oaxaca → Cusco
    { from: [48.9, 2.3], to: [55.8, 37.6] },        // Paris → Moscow
    { from: [41.9, 12.5], to: [28.6, 77.2] },       // Rome → Delhi
    { from: [28.6, 77.2], to: [-1.3, 36.8] },       // Delhi → Nairobi
    { from: [-1.3, 36.8], to: [-33.9, 151.2] },     // Nairobi → Sydney
  ],
};

// Simple Mercator projection for the flat map
function project(lat: number, lng: number, w: number, h: number): [number, number] {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return [x, y];
}

function ArcPath({ from, to, w, h }: { from: number[]; to: number[]; w: number; h: number }) {
  const [x1, y1] = project(from[0], from[1], w, h);
  const [x2, y2] = project(to[0], to[1], w, h);
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.15;
  return (
    <path
      d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
      fill="none"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth={1.5}
    />
  );
}

function Dot({ lat, lng, w, h }: { lat: number; lng: number; w: number; h: number }) {
  const [x, y] = project(lat, lng, w, h);
  return <circle cx={x} cy={y} r={3} fill="#FFD700" />;
}

export default function PassportPage() {
  const tierDef = TIER_THRESHOLDS.find((t) => t.tier === PASSPORT.tier);
  const mapW = 600;
  const mapH = 340;

  // Unique points from all routes
  const points = useMemo(() => {
    const set = new Map<string, number[]>();
    PASSPORT.routes.forEach((r) => {
      set.set(r.from.join(","), r.from);
      set.set(r.to.join(","), r.to);
    });
    return Array.from(set.values());
  }, []);

  const now = new Date();
  const mrzLine1 = `${now.getFullYear()}<<<${PASSPORT.name.replace(/ /g, "<")}<<<<<<MEMBER${PASSPORT.memberSince}<<<<<<@STAMPY<<<`;
  const mrzLine2 = `ISSUED${now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).toUpperCase().replace(/ /g, "")}<<<<<<<<<<<<<<<<<<STAMPY.APP`;

  return (
    <div className="min-h-screen bg-[#0c0a2e] pt-16 md:pt-20 pb-20 px-4">
      <div className="max-w-md mx-auto">
        {/* Passport card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a0f4e 0%, #2d1b69 30%, #1e1250 70%, #0f0a30 100%)",
          }}
        >
          {/* Top ticker strip */}
          <div className="overflow-hidden py-2 border-b border-white/10">
            <div className="flex items-center gap-3 animate-marquee whitespace-nowrap text-purple-300/60 text-sm">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span>{"\u{2708}\u{FE0F}"}</span>
                  <span className="font-mono text-xs tracking-widest">
                    {["OAX", "TYO", "FCO", "SYD", "CDG", "BKK", "CUZ", "DEL", "SVO", "NBO"][i % 10]}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Flat world map with arcs */}
          <div className="px-4 pt-4">
            <svg
              viewBox={`0 0 ${mapW} ${mapH}`}
              className="w-full"
              style={{ filter: "drop-shadow(0 0 20px rgba(100, 60, 255, 0.3))" }}
            >
              {/* World map silhouette — simple rectangle continents approximation */}
              <rect x="0" y="0" width={mapW} height={mapH} fill="transparent" />

              {/* Arcs */}
              {PASSPORT.routes.map((r, i) => (
                <ArcPath key={i} from={r.from} to={r.to} w={mapW} h={mapH} />
              ))}

              {/* Dots at destinations */}
              {points.map((p, i) => (
                <Dot key={i} lat={p[0]} lng={p[1]} w={mapW} h={mapH} />
              ))}
            </svg>
          </div>

          {/* Country flags strip */}
          <div className="flex items-center justify-center gap-2 py-4 border-b border-white/10">
            {PASSPORT.flags.map((flag, i) => (
              <span key={i} className="text-xl">{flag}</span>
            ))}
          </div>

          {/* Passport header */}
          <div className="px-6 pt-5 flex items-start justify-between">
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide font-serif">
                MY STAMPY PASSPORT
              </h1>
              <p className="text-purple-300/60 text-xs tracking-[0.2em] mt-0.5">
                {"\u{1F30D}"} PASSPORT {"\u{2022}"} PASS {"\u{2022}"} PASAPORTE
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-lg">
              {"\u{2B50}"}
            </div>
          </div>

          {/* Big stats grid */}
          <div className="px-6 pt-6 pb-4 grid grid-cols-2 gap-y-5">
            {/* Trips */}
            <div>
              <div className="text-purple-300/50 text-[10px] tracking-[0.15em] uppercase">Trips</div>
              <div className="text-white text-5xl font-light font-serif mt-0.5">
                {PASSPORT.stats.trips}
              </div>
            </div>

            {/* Distance */}
            <div>
              <div className="text-purple-300/50 text-[10px] tracking-[0.15em] uppercase">Distance</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-white text-4xl font-light font-serif">
                  {PASSPORT.stats.distance.toLocaleString()}
                </span>
                <span className="text-purple-300/50 text-lg">km</span>
              </div>
            </div>

            {/* Travel days */}
            <div>
              <div className="text-purple-300/50 text-[10px] tracking-[0.15em] uppercase">Travel Days</div>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-white text-4xl font-light font-serif">
                  {PASSPORT.stats.travelDays}
                </span>
                <span className="text-purple-300/50 text-lg">d</span>
              </div>
            </div>

            {/* Countries + Cities */}
            <div className="flex gap-6">
              <div>
                <div className="text-purple-300/50 text-[10px] tracking-[0.15em] uppercase">Countries</div>
                <div className="text-white text-4xl font-light font-serif mt-0.5">
                  {PASSPORT.stats.countries}
                </div>
              </div>
              <div>
                <div className="text-purple-300/50 text-[10px] tracking-[0.15em] uppercase">Cities</div>
                <div className="text-white text-4xl font-light font-serif mt-0.5">
                  {PASSPORT.stats.cities}
                </div>
              </div>
            </div>
          </div>

          {/* Compass Club tier bar */}
          <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {tierDef && (
                <span className="text-lg">{TIER_ICONS[tierDef.icon]}</span>
              )}
              <div>
                <div className="text-white text-sm font-semibold">{tierDef?.name}</div>
                <div className="text-purple-300/50 text-[10px] tracking-wider">COMPASS CLUB TIER {PASSPORT.tier}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-semibold">{PASSPORT.stats.continents}</div>
              <div className="text-purple-300/50 text-[10px] tracking-wider">CONTINENTS</div>
            </div>
          </div>

          {/* MRZ strip */}
          <div className="px-4 py-3 border-t border-white/10 font-mono text-[9px] text-purple-300/30 tracking-wider leading-relaxed overflow-hidden">
            <div className="truncate">{mrzLine1}</div>
            <div className="truncate">{mrzLine2}</div>
          </div>
        </div>

        {/* Share button */}
        <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl text-sm hover:from-purple-500 hover:to-indigo-500 transition-all">
          Share My Passport
        </button>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link href="/profile" className="text-purple-300/60 text-sm hover:text-purple-300">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
