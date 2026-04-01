"use client";

import { BADGE_DEFINITIONS, BADGE_ICONS } from "@/lib/points";
import { cn } from "@/lib/utils";

interface BadgeShowcaseProps {
  earnedBadges: string[];
}

export function BadgeShowcase({ earnedBadges }: BadgeShowcaseProps) {
  const earnedSet = new Set(earnedBadges);

  return (
    <div className="bg-brand-card rounded-[10px] border border-brand-border p-5">
      <h3 className="font-semibold font-serif text-lg text-brand-text mb-4">Badges</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {BADGE_DEFINITIONS.map((badge) => {
          const earned = earnedSet.has(badge.type);
          return (
            <div
              key={badge.type}
              className={cn(
                "rounded-lg p-3 border transition-all",
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
    </div>
  );
}
