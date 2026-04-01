"use client";

import { getMilesProgress, TIER_THRESHOLDS } from "@/lib/points";
import { cn } from "@/lib/utils";

interface CompassClubProps {
  compassMiles: number;
  tier: number;
  compact?: boolean;
}

const TIER_COLORS: Record<number, string> = {
  1: "from-zinc-500 to-zinc-600",
  2: "from-emerald-500 to-emerald-600",
  3: "from-blue-500 to-blue-600",
  4: "from-purple-500 to-purple-600",
  5: "from-amber-400 to-amber-600",
};

const TIER_ICONS: Record<string, string> = {
  compass: "\u{1F9ED}",
  binoculars: "\u{1F50D}",
  map: "\u{1F5FA}",
  "ship-wheel": "\u{2699}",
  "north-star": "\u{2B50}",
};

export function CompassClub({ compassMiles, tier, compact }: CompassClubProps) {
  const { current, next, progress } = getMilesProgress(compassMiles);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{TIER_ICONS[current.icon]}</span>
        <span className="text-sm font-medium">{current.name}</span>
        <span className="text-xs text-foreground/50">
          {compassMiles.toLocaleString()} CM
        </span>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Compass Club</h3>
        <span className="text-sm text-foreground/50">
          {compassMiles.toLocaleString()} Compass Miles
        </span>
      </div>

      {/* Current tier */}
      <div
        className={cn(
          "bg-gradient-to-r rounded-lg p-4 mb-4",
          TIER_COLORS[tier] || TIER_COLORS[1]
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{TIER_ICONS[current.icon]}</span>
          <div>
            <div className="text-white font-bold text-xl">{current.name}</div>
            <div className="text-white/70 text-sm">Tier {current.tier}</div>
          </div>
        </div>
      </div>

      {/* Progress to next tier */}
      {next && (
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-foreground/60">
              Next: {next.name}
            </span>
            <span className="text-foreground/60">
              {next.minMiles.toLocaleString()} CM
            </span>
          </div>
          <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                TIER_COLORS[tier] || TIER_COLORS[1]
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-foreground/40 mt-1">
            {(next.minMiles - compassMiles).toLocaleString()} CM to go
          </div>
        </div>
      )}

      {/* All tiers */}
      <div className="mt-5 pt-4 border-t border-border">
        <div className="text-xs text-foreground/50 mb-3">All Tiers</div>
        <div className="flex items-center justify-between">
          {TIER_THRESHOLDS.map((t) => (
            <div
              key={t.tier}
              className={cn(
                "flex flex-col items-center gap-1",
                tier >= t.tier ? "opacity-100" : "opacity-30"
              )}
            >
              <span className="text-xl">{TIER_ICONS[t.icon]}</span>
              <span className="text-[10px] text-foreground/60">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
