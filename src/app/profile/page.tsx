"use client";

import { useMemo } from "react";
import { CompassClub } from "@/components/CompassClub";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { TripCard } from "@/components/TripCard";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_ICONS } from "@/lib/tierStyles";
import type { TravelStats } from "@/types";

const DEMO_STATS: TravelStats = {
  countriesVisited: 10,
  citiesVisited: 28,
  continentsVisited: 5,
  totalTrips: 14,
  daysAbroad: 187,
  longestTrip: 30,
  returnRate: 21,
  compassMiles: 3200,
  tier: 2,
};

const DEMO_BADGES = ["return_flight", "culinary_explorer", "time_traveler"];

const VISITED_FLAGS = [
  "\u{1F1F2}\u{1F1FD}", "\u{1F1EF}\u{1F1F5}", "\u{1F1EE}\u{1F1F9}",
  "\u{1F1E6}\u{1F1FA}", "\u{1F1EB}\u{1F1F7}", "\u{1F1F9}\u{1F1ED}",
  "\u{1F1F5}\u{1F1EA}", "\u{1F1EE}\u{1F1F3}", "\u{1F1F7}\u{1F1FA}",
  "\u{1F1F0}\u{1F1EA}",
];

const ROUTES = [
  { from: [37.8, -122.4], to: [35.7, 139.7] },
  { from: [35.7, 139.7], to: [13.8, 100.5] },
  { from: [37.8, -122.4], to: [48.9, 2.3] },
  { from: [48.9, 2.3], to: [41.9, 12.5] },
  { from: [37.8, -122.4], to: [17.1, -96.7] },
  { from: [17.1, -96.7], to: [-13.2, -72.5] },
  { from: [48.9, 2.3], to: [55.8, 37.6] },
  { from: [41.9, 12.5], to: [28.6, 77.2] },
  { from: [28.6, 77.2], to: [-1.3, 36.8] },
  { from: [-1.3, 36.8], to: [-33.9, 151.2] },
];

const DEMO_RECENT_TRIPS = [
  {
    id: "1",
    title: "Two Weeks in Oaxaca",
    coverPhotoUrl: null,
    destinations: [
      { city: "Oaxaca City", country: "Mexico" },
      { city: "Puerto Escondido", country: "Mexico" },
    ],
    startDate: "2025-11-15",
    endDate: "2025-11-29",
    status: "COMPLETED",
    isFuture: false,
    upvoteCount: 24,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 47,
    reviewCount: 8,
  },
  {
    id: "2",
    title: "Japan Golden Route & Beyond",
    coverPhotoUrl: null,
    destinations: [
      { city: "Tokyo", country: "Japan" },
      { city: "Kyoto", country: "Japan" },
    ],
    startDate: "2025-03-20",
    endDate: "2025-04-10",
    status: "COMPLETED",
    isFuture: false,
    upvoteCount: 56,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 128,
    reviewCount: 15,
  },
];

function project(lat: number, lng: number, w: number, h: number): [number, number] {
  return [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
}

export default function ProfilePage() {
  const tierDef = TIER_THRESHOLDS.find((t) => t.tier === DEMO_STATS.tier);
  const mapW = 540;
  const mapH = 300;

  const points = useMemo(() => {
    const set = new Map<string, number[]>();
    ROUTES.forEach((r) => {
      set.set(r.from.join(","), r.from);
      set.set(r.to.join(","), r.to);
    });
    return Array.from(set.values());
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-16 md:pt-20 pb-24">
      {/* ── Passport-style hero card ── */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background: "linear-gradient(160deg, #1a0f4e 0%, #2d1b69 30%, #1e1250 70%, #0f0a30 100%)",
        }}
      >
        {/* Profile header inside card */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-xl font-bold ring-2 ring-white/20">
            A
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-lg font-serif">Atlas Explorer</h1>
            <p className="text-purple-300/50 text-xs">@atlas_explorer</p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-white text-sm font-bold">142</div>
              <div className="text-purple-300/40 text-[10px]">followers</div>
            </div>
            <div>
              <div className="text-white text-sm font-bold">89</div>
              <div className="text-purple-300/40 text-[10px]">following</div>
            </div>
          </div>
        </div>

        {/* Arc map */}
        <div className="px-4">
          <svg viewBox={`0 0 ${mapW} ${mapH}`} className="w-full">
            {ROUTES.map((r, i) => {
              const [x1, y1] = project(r.from[0], r.from[1], mapW, mapH);
              const [x2, y2] = project(r.to[0], r.to[1], mapW, mapH);
              const midX = (x1 + x2) / 2;
              const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.15;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={1.2}
                />
              );
            })}
            {points.map((p, i) => {
              const [x, y] = project(p[0], p[1], mapW, mapH);
              return <circle key={i} cx={x} cy={y} r={2.5} fill="#FFD700" />;
            })}
          </svg>
        </div>

        {/* Country flags */}
        <div className="flex items-center justify-center gap-1.5 py-3 border-t border-white/10 mx-4">
          {VISITED_FLAGS.map((flag, i) => (
            <span key={i} className="text-lg">{flag}</span>
          ))}
        </div>

        {/* Big stats */}
        <div className="px-5 pt-3 pb-4 grid grid-cols-3 gap-y-4">
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Trips</div>
            <div className="text-white text-3xl font-light font-serif">{DEMO_STATS.totalTrips}</div>
          </div>
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Countries</div>
            <div className="text-white text-3xl font-light font-serif">{DEMO_STATS.countriesVisited}</div>
          </div>
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Cities</div>
            <div className="text-white text-3xl font-light font-serif">{DEMO_STATS.citiesVisited}</div>
          </div>
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Days Abroad</div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-white text-3xl font-light font-serif">{DEMO_STATS.daysAbroad}</span>
              <span className="text-purple-300/40 text-sm">d</span>
            </div>
          </div>
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Longest Trip</div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-white text-3xl font-light font-serif">{DEMO_STATS.longestTrip}</span>
              <span className="text-purple-300/40 text-sm">d</span>
            </div>
          </div>
          <div>
            <div className="text-purple-300/40 text-[10px] tracking-[0.15em] uppercase">Continents</div>
            <div className="text-white text-3xl font-light font-serif">{DEMO_STATS.continentsVisited}</div>
          </div>
        </div>

        {/* Compass Club tier */}
        <div className="mx-4 mb-4 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          {tierDef && (
            <span className="text-lg">{TIER_ICONS[tierDef.icon]}</span>
          )}
          <div className="flex-1">
            <div className="text-white text-sm font-semibold">{tierDef?.name}</div>
            <div className="text-purple-300/40 text-[10px] tracking-wider">
              {DEMO_STATS.compassMiles.toLocaleString()} COMPASS MILES
            </div>
          </div>
          <button className="px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs font-medium hover:bg-white/15 transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* ── Below the card: badges + trips ── */}
      <div className="mb-6">
        <BadgeShowcase earnedBadges={DEMO_BADGES} />
      </div>

      <div>
        <h2 className="text-xl font-bold font-serif text-brand-text mb-4">Recent Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_RECENT_TRIPS.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </div>
  );
}
