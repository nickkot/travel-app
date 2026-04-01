"use client";

import { BADGE_DEFINITIONS, BADGE_ICONS } from "@/lib/points";

interface BadgeStripProps {
  earnedBadges: string[];
}

export function BadgeStrip({ earnedBadges }: BadgeStripProps) {
  const earnedSet = new Set(earnedBadges);
  const earned = BADGE_DEFINITIONS.filter((b) => earnedSet.has(b.type));

  if (earned.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {earned.map((badge) => (
        <span
          key={badge.type}
          title={badge.name}
          className="text-base cursor-default"
        >
          {BADGE_ICONS[badge.type] || "\u{1F3C5}"}
        </span>
      ))}
      <span className="text-xs text-brand-text-muted ml-0.5">
        {earned.length} badge{earned.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
