"use client";

import { useState } from "react";
import Link from "next/link";
import { TripCard } from "@/components/TripCard";
import { cn } from "@/lib/utils";

// Demo data
const DEMO_TRIPS = [
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
      { city: "Osaka", country: "Japan" },
      { city: "Hakone", country: "Japan" },
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
  {
    id: "3",
    title: "Iceland Ring Road",
    coverPhotoUrl: null,
    destinations: [
      { city: "Reykjavik", country: "Iceland" },
      { city: "Akureyri", country: "Iceland" },
    ],
    startDate: "2026-06-01",
    endDate: "2026-06-14",
    status: "PLANNED",
    isFuture: true,
    upvoteCount: 12,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 0,
    reviewCount: 0,
  },
];

type Filter = "all" | "past" | "future";

export default function TripsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = DEMO_TRIPS.filter((t) => {
    if (filter === "past") return !t.isFuture;
    if (filter === "future") return t.isFuture;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-serif text-brand-text">My Trips</h1>
        <Link
          href="/trips/new"
          className="px-4 py-2 bg-brand-navy text-parchment font-medium rounded-lg text-sm hover:bg-brand-navy-hover transition-colors"
        >
          + New Trip
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-brand-surface rounded-lg border border-brand-border p-1 w-fit">
        {(["all", "past", "future"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
              filter === f
                ? "bg-brand-navy text-parchment"
                : "text-brand-text-secondary hover:text-brand-text"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Trip grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-brand-text-muted">
          <p className="text-lg mb-2">No trips yet</p>
          <p className="text-sm">Start documenting your travels</p>
        </div>
      )}
    </div>
  );
}
