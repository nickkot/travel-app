"use client";

import { BADGE_DEFINITIONS, BADGE_ICONS } from "@/lib/points";
import { cn } from "@/lib/utils";

interface BadgeShowcaseProps {
  earnedBadges: string[];
}

export function BadgeShowcase({ earnedBadges }: BadgeShowcaseProps) {
  const earnedSet = new Set(earnedBadges);

  const travelBadges = BADGE_DEFINITIONS.filter((b) => !b.type.startsWith("region_"));
  const regionalBadges = BADGE_DEFINITIONS.filter((b) => b.type.startsWith("region_"));

  return (
    <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture">
      {/* Travel badges */}
      <h3 className="font-semibold font-serif text-lg text-brand-text mb-4">Travel Badges</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {travelBadges.map((badge) => {
          const earned = earnedSet.has(badge.type);
          return (
            <div
              key={badge.type}
              className={cn(
                "rounded-xl p-3 border transition-all",
                earned
                  ? "bg-brand-pin-past/10 border-brand-pin-past/30"
                  : "bg-brand-surface border-brand-border opacity-40"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">
                  {BADGE_ICONS[badge.type] || "\u{1F3C5}"}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    earned ? "text-brand-pin-past" : "text-brand-text-muted"
                  )}
                >
                  {badge.name}
                </span>
              </div>
              <p className="text-xs text-brand-text-muted">{badge.description}</p>
            </div>
          );
        })}
      </div>

      {/* Regional badges */}
      <h3 className="font-semibold font-serif text-lg text-brand-text mb-4">Regional Achievements</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {regionalBadges.map((badge) => {
          const earned = earnedSet.has(badge.type);
          return (
            <div
              key={badge.type}
              className={cn(
                "rounded-xl p-2.5 border text-center transition-all",
                earned
                  ? "bg-brand-navy/8 border-brand-navy/20"
                  : "bg-brand-surface border-brand-border opacity-30"
              )}
            >
              <span className="text-2xl block mb-1">
                {BADGE_ICONS[badge.type] || "\u{1F3C5}"}
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold block",
                  earned ? "text-brand-navy" : "text-brand-text-muted"
                )}
              >
                {badge.name}
              </span>
              <p className="text-[9px] text-brand-text-muted mt-0.5 leading-tight">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
