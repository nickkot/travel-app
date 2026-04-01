"use client";

import { BADGE_DEFINITIONS } from "@/lib/points";
import { cn } from "@/lib/utils";

interface BadgeShowcaseProps {
  earnedBadges: string[];
}

const BADGE_ICONS: Record<string, string> = {
  slow_burner: "\u{1F54A}",
  polyglot_path: "\u{1F30D}",
  return_flight: "\u{1F504}",
  deep_roots: "\u{1F333}",
  off_the_grid: "\u{1F3D5}",
  culinary_explorer: "\u{1F37D}",
  hemisphere_hopper: "\u{1F30E}",
  midnight_sun: "\u{2600}",
  southern_cross: "\u{2728}",
  time_traveler: "\u{23F0}",
};

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
