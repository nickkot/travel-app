"use client";

import Link from "next/link";
import { ProfileStats } from "@/components/ProfileStats";
import { CompassClub } from "@/components/CompassClub";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { TripCard } from "@/components/TripCard";
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

const DEMO_PAST_TRIPS = [
  {
    id: "1",
    title: "Two Weeks in Oaxaca",
    coverPhotoUrl: "https://picsum.photos/seed/oaxaca-cover/600/800",
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
    coverPhotoUrl: "https://picsum.photos/seed/japan-golden/600/800",
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

const DEMO_FUTURE_TRIPS = [
  {
    id: "f1",
    title: "Iceland Ring Road",
    coverPhotoUrl: null,
    destinations: [
      { city: "Reykjavik", country: "Iceland" },
      { city: "Akureyri", country: "Iceland" },
    ],
    startDate: "2026-06-10",
    endDate: "2026-06-24",
    status: "PLANNED",
    isFuture: true,
    upvoteCount: 0,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 0,
    reviewCount: 0,
  },
  {
    id: "f2",
    title: "Patagonia Trek",
    coverPhotoUrl: null,
    destinations: [
      { city: "El Chalten", country: "Argentina" },
      { city: "Torres del Paine", country: "Chile" },
    ],
    startDate: "2026-11-01",
    endDate: "2026-11-18",
    status: "PLANNED",
    isFuture: true,
    upvoteCount: 0,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 0,
    reviewCount: 0,
  },
];

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Profile header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-2xl font-bold flex-shrink-0">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-serif text-brand-text">Atlas Explorer</h1>
          <p className="text-brand-text-muted mb-1">@atlas_explorer</p>
          <p className="text-sm text-brand-text-secondary mb-3">
            Slow traveler. 30+ countries. Always returning.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="text-brand-text">142</strong>{" "}
              <span className="text-brand-text-muted">followers</span>
            </span>
            <span>
              <strong className="text-brand-text">89</strong>{" "}
              <span className="text-brand-text-muted">following</span>
            </span>
            <CompassClub
              compassMiles={DEMO_STATS.compassMiles}
              tier={DEMO_STATS.tier}
              compact
            />
          </div>
        </div>
        <button className="px-4 py-2 border border-brand-border rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <ProfileStats stats={DEMO_STATS} />
      </div>

      {/* Trips — past + future with add button */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-serif text-brand-text">Trips</h2>
          <Link
            href="/trips/new"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-parchment rounded-lg text-sm font-medium hover:bg-brand-navy-hover transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Trip
          </Link>
        </div>

        {/* Future trips */}
        {DEMO_FUTURE_TRIPS.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-brand-text-secondary mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-navy" />
              Upcoming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_FUTURE_TRIPS.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          </div>
        )}

        {/* Past trips */}
        <div>
          <h3 className="text-sm font-semibold text-brand-text-secondary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-pin-past" />
            Past
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_PAST_TRIPS.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        </div>
      </div>

      {/* Compass Club */}
      <div className="mb-6">
        <CompassClub
          compassMiles={DEMO_STATS.compassMiles}
          tier={DEMO_STATS.tier}
        />
      </div>

      {/* Badges */}
      <div className="mb-6">
        <BadgeShowcase earnedBadges={DEMO_BADGES} />
      </div>
    </div>
  );
}
