"use client";

import { getMilesProgress, TIER_THRESHOLDS } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_PROGRESS_COLORS, TIER_ICONS } from "@/lib/tierStyles";
import { cn } from "@/lib/utils";

interface CompassClubProps {
  compassMiles: number;
  tier: number;
  compact?: boolean;
}

export function CompassClub({ compassMiles, tier, compact }: CompassClubProps) {
  const { current, next, progress } = getMilesProgress(compassMiles);
  const style = TIER_BADGE_STYLES[tier] || TIER_BADGE_STYLES[1];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", style.bg, style.text)}>
          {TIER_ICONS[current.icon]} {current.name}
        </span>
        <span className="text-xs text-brand-text-muted">
          {compassMiles.toLocaleString()} CM
        </span>
      </div>
    );
  }

  return (
    <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold font-serif text-lg text-brand-text">Compass Club</h3>
        <span className="text-sm text-brand-text-muted">
          {compassMiles.toLocaleString()} Compass Miles
        </span>
      </div>

      {/* Current tier badge */}
      <div
        className={cn(
          "rounded-lg p-4 mb-4",
          style.bg
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{TIER_ICONS[current.icon]}</span>
          <div>
            <div className={cn("font-bold text-xl", style.text)}>{current.name}</div>
            <div className={cn("text-sm opacity-70", style.text)}>Tier {current.tier}</div>
          </div>
        </div>
      </div>

      {/* Progress to next tier */}
      {next && (
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-brand-text-secondary">
              Next: {next.name}
            </span>
            <span className="text-brand-text-secondary">
              {next.minMiles.toLocaleString()} CM
            </span>
          </div>
          <div className="w-full h-2 bg-brand-surface rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                TIER_PROGRESS_COLORS[tier] || TIER_PROGRESS_COLORS[1]
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-brand-text-muted mt-1">
            {(next.minMiles - compassMiles).toLocaleString()} CM to go
          </div>
        </div>
      )}

      {/* All tiers */}
      <div className="mt-5 pt-4 border-t border-brand-border">
        <div className="text-xs text-brand-text-muted mb-3">All Tiers</div>
        <div className="flex items-center justify-between">
          {TIER_THRESHOLDS.map((t) => {
            const s = TIER_BADGE_STYLES[t.tier] || TIER_BADGE_STYLES[1];
            return (
              <div
                key={t.tier}
                className={cn(
                  "flex flex-col items-center gap-1",
                  tier >= t.tier ? "opacity-100" : "opacity-30"
                )}
              >
                <span className={cn("text-xl w-10 h-10 rounded-full flex items-center justify-center", s.bg)}>
                  {TIER_ICONS[t.icon]}
                </span>
                <span className="text-[10px] text-brand-text-secondary">{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
