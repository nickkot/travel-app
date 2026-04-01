"use client";

import { useParams } from "next/navigation";
import { ProfileStats } from "@/components/ProfileStats";
import { CompassClub } from "@/components/CompassClub";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import type { TravelStats } from "@/types";

const DEMO_STATS: TravelStats = {
  countriesVisited: 22,
  citiesVisited: 54,
  continentsVisited: 6,
  totalTrips: 31,
  daysAbroad: 420,
  longestTrip: 45,
  returnRate: 35,
  compassMiles: 8500,
  tier: 3,
};

const DEMO_BADGES = [
  "slow_burner",
  "return_flight",
  "deep_roots",
  "culinary_explorer",
  "hemisphere_hopper",
  "time_traveler",
];

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Profile header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-brand-pin-past/10 flex items-center justify-center text-brand-pin-past text-2xl font-bold flex-shrink-0">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-serif text-brand-text">{username}</h1>
          <p className="text-brand-text-muted mb-1">@{username}</p>
          <p className="text-sm text-brand-text-secondary mb-3">
            Pathfinder tier traveler
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="text-brand-text">312</strong>{" "}
              <span className="text-brand-text-muted">followers</span>
            </span>
            <span>
              <strong className="text-brand-text">156</strong>{" "}
              <span className="text-brand-text-muted">following</span>
            </span>
            <CompassClub
              compassMiles={DEMO_STATS.compassMiles}
              tier={DEMO_STATS.tier}
              compact
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-brand-navy text-parchment rounded-lg text-sm font-medium hover:bg-brand-navy-hover transition-colors">
          Follow
        </button>
      </div>

      <div className="mb-6">
        <ProfileStats stats={DEMO_STATS} />
      </div>

      <div className="mb-6">
        <CompassClub
          compassMiles={DEMO_STATS.compassMiles}
          tier={DEMO_STATS.tier}
        />
      </div>

      <div>
        <BadgeShowcase earnedBadges={DEMO_BADGES} />
      </div>
    </div>
  );
}
