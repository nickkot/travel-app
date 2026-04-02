"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProfileStats } from "@/components/ProfileStats";
import { CompassClub } from "@/components/CompassClub";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { ShareButton } from "@/components/ShareButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
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
  const { user: authUser } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(312);
  const [followingCount, setFollowingCount] = useState(156);
  const [loading, setLoading] = useState(false);

  // Fetch follow state
  useEffect(() => {
    if (!authUser || authUser.id === "demo-user") return;

    fetch(`/api/users?username=${username}`)
      .then((r) => r.json())
      .then((data) => {
        if (data._count) {
          setFollowerCount(data._count.followers);
          setFollowingCount(data._count.following);
        }
      })
      .catch(() => {});

    fetch(`/api/follows?followerId=${authUser.id}&followingId=unknown`)
      .catch(() => {});
  }, [authUser, username]);

  const handleFollow = async () => {
    if (!authUser || authUser.id === "demo-user") return;
    setLoading(true);
    const action = isFollowing ? "unfollow" : "follow";

    // Optimistic update
    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));

    try {
      await fetch("/api/follows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          followerId: authUser.id,
          followingId: "target-user-id",
        }),
      });
    } catch {
      // Revert on error
      setIsFollowing(isFollowing);
      setFollowerCount((prev) => (isFollowing ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Profile header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-brand-pin-past/10 flex items-center justify-center text-brand-pin-past text-2xl font-bold flex-shrink-0">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-serif text-brand-text">{username}</h1>
          <p className="text-brand-text-muted mb-1">@{username}</p>
          <p className="text-sm text-brand-text-secondary mb-3">
            Pathfinder tier traveler
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="text-brand-text">{followerCount}</strong>{" "}
              <span className="text-brand-text-muted">followers</span>
            </span>
            <span>
              <strong className="text-brand-text">{followingCount}</strong>{" "}
              <span className="text-brand-text-muted">following</span>
            </span>
            <CompassClub
              compassMiles={DEMO_STATS.compassMiles}
              tier={DEMO_STATS.tier}
              compact
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFollow}
            disabled={loading}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all btn-press",
              isFollowing
                ? "border border-brand-border text-brand-text hover:bg-brand-surface"
                : "bg-brand-navy text-parchment hover:bg-brand-navy-hover"
            )}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <ShareButton username={username} />
        </div>
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
