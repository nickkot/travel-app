"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DEMO_LEADERBOARD } from "@/data/demoLeaderboard";
import {
  CATEGORY_META,
  rankByCategory,
  type LeaderboardCategory,
} from "@/lib/leaderboard";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_ICONS } from "@/lib/tierStyles";
import { cn } from "@/lib/utils";

const CATEGORIES: LeaderboardCategory[] = [
  "explorerScore",
  "stamps",
  "countries",
  "influence",
  "journals",
  "photos",
  "uniqueness",
];

export default function LeaderboardPage() {
  const [category, setCategory] = useState<LeaderboardCategory>("explorerScore");

  const ranked = useMemo(
    () => rankByCategory(DEMO_LEADERBOARD, category),
    [category]
  );

  const meta = CATEGORY_META[category];

  return (
    <div className="min-h-screen bg-brand-bg pt-16 md:pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-serif text-brand-text">
            Leaderboard
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            See how you stack up against your friends
          </p>
        </div>

        {/* Category selector — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const m = CATEGORY_META[cat];
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                  isActive
                    ? "bg-brand-navy text-parchment shadow-sm"
                    : "bg-brand-card border border-brand-border text-brand-text-secondary hover:text-brand-text"
                )}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category description */}
        <div className="text-xs text-brand-text-muted mb-4">
          {meta.icon} {meta.description}
        </div>

        {/* Podium — top 3 */}
        {ranked.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-8">
            {/* 2nd place */}
            <PodiumCard entry={ranked[1]} rank={2} category={category} />
            {/* 1st place */}
            <PodiumCard entry={ranked[0]} rank={1} category={category} />
            {/* 3rd place */}
            <PodiumCard entry={ranked[2]} rank={3} category={category} />
          </div>
        )}

        {/* Full ranking list */}
        <div className="space-y-2">
          {ranked.map((entry, i) => {
            const rank = i + 1;
            const isMe = entry.id === "me";
            const tierDef = TIER_THRESHOLDS.find((t) => t.tier === entry.tier);
            const tierStyle =
              TIER_BADGE_STYLES[entry.tier] || TIER_BADGE_STYLES[1];
            const value = entry[category];

            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all",
                  isMe
                    ? "bg-brand-pin-past/8 border-brand-pin-past/25 ring-1 ring-brand-pin-past/15"
                    : "bg-brand-bg border-brand-border hover:border-brand-border/80"
                )}
              >
                {/* Rank */}
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    rank === 1 && "bg-[#F59E0B] text-white",
                    rank === 2 && "bg-[#94A3B8] text-white",
                    rank === 3 && "bg-[#CD7F32] text-white",
                    rank > 3 && "bg-brand-surface text-brand-text-muted"
                  )}
                >
                  {rank}
                </div>

                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: entry.color }}
                >
                  {entry.avatarInitial}
                </div>

                {/* Name + tier */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {isMe ? (
                      <span className="text-sm font-semibold text-brand-pin-past">
                        You
                      </span>
                    ) : (
                      <Link
                        href={`/profile/${entry.username}`}
                        className="text-sm font-medium text-brand-text hover:underline truncate"
                      >
                        {entry.name}
                      </Link>
                    )}
                    {tierDef && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none shrink-0",
                          tierStyle.bg,
                          tierStyle.text
                        )}
                      >
                        {TIER_ICONS[tierDef.icon]}
                      </span>
                    )}
                  </div>
                  {!isMe && (
                    <span className="text-xs text-brand-text-muted">
                      @{entry.username}
                    </span>
                  )}
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-brand-text">
                    {value.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-brand-text-muted">
                    {CATEGORY_META[category].label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Uniqueness explainer */}
        {category === "uniqueness" && (
          <div className="mt-6 p-4 bg-brand-card rounded-xl border border-brand-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{"\u{2728}"}</span>
              <span className="text-sm font-semibold text-brand-text">
                How Uniqueness works
              </span>
            </div>
            <p className="text-xs text-brand-text-secondary leading-relaxed">
              Your Uniqueness score rewards visiting off-the-beaten-path
              destinations. The fewer Stampy users who&apos;ve been to a place,
              the more points you earn. A trip to Lusaka scores way higher than
              Paris. Explore beyond the tourist trail to climb the board!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PodiumCard({
  entry,
  rank,
  category,
}: {
  entry: (typeof DEMO_LEADERBOARD)[number];
  rank: 1 | 2 | 3;
  category: LeaderboardCategory;
}) {
  const isMe = entry.id === "me";
  const value = entry[category];
  const medalColors = {
    1: "from-[#F59E0B] to-[#F59E0B]/70",
    2: "from-[#94A3B8] to-[#94A3B8]/70",
    3: "from-[#CD7F32] to-[#CD7F32]/70",
  };
  const medals = { 1: "\u{1F947}", 2: "\u{1F948}", 3: "\u{1F949}" };
  const heights = { 1: "h-28", 2: "h-22", 3: "h-20" };

  return (
    <div
      className={cn(
        "flex flex-col items-center",
        rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-bold mb-1.5 ring-2",
          rank === 1
            ? "w-14 h-14 text-lg ring-[#F59E0B]"
            : "w-11 h-11 text-sm ring-brand-border"
        )}
        style={{ backgroundColor: entry.color }}
      >
        {entry.avatarInitial}
      </div>

      {/* Name */}
      <span
        className={cn(
          "text-xs font-medium text-center truncate max-w-[80px]",
          isMe ? "text-brand-pin-past" : "text-brand-text"
        )}
      >
        {isMe ? "You" : entry.name}
      </span>

      {/* Score */}
      <span className="text-[11px] font-bold text-brand-text-secondary">
        {value.toLocaleString()}
      </span>

      {/* Podium bar */}
      <div
        className={cn(
          "w-20 rounded-t-lg mt-1.5 flex items-start justify-center pt-2 bg-gradient-to-b",
          medalColors[rank],
          heights[rank]
        )}
      >
        <span className="text-xl">{medals[rank]}</span>
      </div>
    </div>
  );
}
