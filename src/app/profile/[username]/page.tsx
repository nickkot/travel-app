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

interface PublicLocalRec {
  id: string;
  placeName: string;
  placeType: string;
  rating: number;
  content: string;
  upvoteCount: number;
}

// Demo content so visitors can see what a local's profile looks like.
// In a real auth flow, this would come from GET /api/reviews?userId=X&localOnly=true
const DEMO_PUBLIC_LOCAL_RECS: PublicLocalRec[] = [
  {
    id: "p-lr1",
    placeName: "Time Out Market",
    placeType: "Market",
    rating: 4,
    content:
      "Go for breakfast when it opens at 10am — empty tables, same food, half the wait. By 1pm it's a zoo.",
    upvoteCount: 52,
  },
  {
    id: "p-lr2",
    placeName: "LX Factory",
    placeType: "Neighborhood",
    rating: 5,
    content:
      "The independent bookshop Ler Devagar has a bicycle flying from the ceiling. Sunday is the best day — live music in the courtyard.",
    upvoteCount: 31,
  },
];

// Placeholder base city so the feature is visible on any public profile.
// When real data lands, pull from GET /api/users?username=X.
const DEMO_PUBLIC_BASE = { city: "Lisbon", country: "Portugal" };

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: authUser } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(312);
  const [followingCount, setFollowingCount] = useState(156);
  const [loading, setLoading] = useState(false);
  const baseCity = DEMO_PUBLIC_BASE.city;
  const localRecs = DEMO_PUBLIC_LOCAL_RECS;

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
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold font-serif text-brand-text">{username}</h1>
            {baseCity && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-navy/10 ring-1 ring-brand-navy/20 text-[11px] font-semibold text-brand-navy">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
                Local Guide in {baseCity}
              </span>
            )}
          </div>
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

      {/* Places I recommend — read-only on public profile */}
      {baseCity && localRecs.length > 0 && (
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold font-serif text-brand-text">
              Places I recommend
            </h2>
            <p className="text-xs text-brand-text-muted mt-0.5">
              Insider tips for visitors to {baseCity}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {localRecs.map((rec) => (
              <div
                key={rec.id}
                className="bg-brand-card rounded-xl ring-1 ring-brand-border p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold font-serif text-brand-text leading-tight truncate">
                      {rec.placeName}
                    </h3>
                    <p className="text-[11px] text-brand-text-muted uppercase tracking-wider">
                      {rec.placeType}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={cn(
                          "w-3 h-3",
                          star <= rec.rating
                            ? "text-brand-pin-past fill-brand-pin-past"
                            : "text-brand-text-muted/30"
                        )}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-brand-text-secondary leading-relaxed line-clamp-3">
                  {rec.content}
                </p>
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-brand-text-muted">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                  <span>{rec.upvoteCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
