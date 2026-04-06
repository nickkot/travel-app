"use client";

import { useState, useEffect } from "react";
import { getMilesProgress, getTierForMiles } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_ICONS, TIER_PROGRESS_COLORS } from "@/lib/tierStyles";
import { daysBetween, cn } from "@/lib/utils";

interface Reward {
  label: string;
  points: number;
}

interface TripRewardScreenProps {
  destinations: { city: string; country: string }[];
  startDate: string;
  endDate: string;
  currentMiles: number;
  currentTier: number;
  onContinue: () => void;
}

function calculateTripRewards(
  destinations: { city: string; country: string }[],
  startDate: string,
  endDate: string
): Reward[] {
  const rewards: Reward[] = [];

  rewards.push({ label: "Trip logged", points: 100 });

  const extraCities = destinations.length - 1;
  if (extraCities > 0) {
    rewards.push({
      label: `${extraCities} city connection${extraCities > 1 ? "s" : ""}`,
      points: extraCities * 50,
    });
  }

  if (startDate && endDate) {
    const days = daysBetween(startDate, endDate);
    if (days >= 30) {
      rewards.push({ label: "Month-long stay", points: 500 });
    } else if (days >= 7) {
      rewards.push({ label: "Week-long stay", points: 200 });
    }
  }

  // Bonus for unique countries
  const uniqueCountries = new Set(destinations.map((d) => d.country)).size;
  if (uniqueCountries > 1) {
    rewards.push({
      label: `${uniqueCountries} countries visited`,
      points: (uniqueCountries - 1) * 75,
    });
  }

  return rewards;
}

export function TripRewardScreen({
  destinations,
  startDate,
  endDate,
  currentMiles,
  currentTier,
  onContinue,
}: TripRewardScreenProps) {
  const [visibleItems, setVisibleItems] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const rewards = calculateTripRewards(destinations, startDate, endDate);
  const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);
  const newMiles = currentMiles + totalPoints;

  const oldProgress = getMilesProgress(currentMiles);
  const newProgress = getMilesProgress(newMiles);
  const oldTier = getTierForMiles(currentMiles);
  const newTier = getTierForMiles(newMiles);
  const tierUp = newTier.tier > oldTier.tier;

  const tierStyle = TIER_BADGE_STYLES[newTier.tier] || TIER_BADGE_STYLES[1];
  const progressColor = TIER_PROGRESS_COLORS[newTier.tier] || TIER_PROGRESS_COLORS[1];

  // Staggered reveal animation
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    rewards.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleItems(i + 1), 300 + i * 200));
    });
    // Show progress bar after all items
    timers.push(setTimeout(() => {
      setShowProgress(true);
      // Animate progress bar after a beat
      setTimeout(() => setAnimatedProgress(newProgress.progress), 200);
    }, 300 + rewards.length * 200 + 400));

    return () => timers.forEach(clearTimeout);
  }, [rewards.length, newProgress.progress]);

  return (
    <div className="fixed inset-0 z-50 bg-brand-bg/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">{"\u{2728}"}</div>
          <h2 className="text-2xl font-bold font-serif text-brand-text">Trip Created!</h2>
          <p className="text-sm text-brand-text-muted mt-1">
            {destinations.map((d) => d.city).join(" → ")}
          </p>
        </div>

        {/* Points breakdown */}
        <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture mb-4">
          <h3 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-3">
            Points Earned
          </h3>

          <div className="space-y-2.5">
            {rewards.map((reward, i) => (
              <div
                key={reward.label}
                className={cn(
                  "flex items-center justify-between transition-all duration-500",
                  i < visibleItems
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{ transitionTimingFunction: "var(--ease-spring)" }}
              >
                <span className="text-sm text-brand-text">{reward.label}</span>
                <span className="text-sm font-bold text-brand-pin-past">
                  +{reward.points}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className={cn(
              "mt-3 pt-3 border-t border-brand-border flex items-center justify-between transition-all duration-500",
              visibleItems >= rewards.length
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            )}
            style={{ transitionTimingFunction: "var(--ease-spring)" }}
          >
            <span className="text-sm font-semibold text-brand-text">Total</span>
            <span className="text-xl font-serif font-bold text-brand-pin-past">
              +{totalPoints} CM
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={cn(
            "bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture mb-6 transition-all duration-500",
            showProgress ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          {/* Tier info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{TIER_ICONS[newTier.icon]}</span>
              <span className={cn("text-sm font-semibold", tierStyle.text)}>
                {newTier.name}
              </span>
            </div>
            {tierUp && (
              <span className="px-2 py-0.5 rounded-full bg-brand-pin-past/10 text-brand-pin-past text-xs font-bold animate-pulse">
                Tier Up!
              </span>
            )}
          </div>

          {/* Bar */}
          {newProgress.next && (
            <>
              <div className="w-full h-2.5 bg-brand-surface rounded-full overflow-hidden mb-2">
                <div
                  className={cn("h-full rounded-full", progressColor)}
                  style={{
                    width: `${animatedProgress}%`,
                    transition: "width 1s var(--ease-spring)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-brand-text-muted">
                <span>{newMiles.toLocaleString()} CM</span>
                <span>{newProgress.next.minMiles.toLocaleString()} CM</span>
              </div>
            </>
          )}

          {/* Tier up celebration */}
          {tierUp && (
            <div className="mt-3 pt-3 border-t border-brand-border text-center">
              <p className="text-sm font-semibold text-brand-text">
                {"\u{1F389}"} You reached <span className={tierStyle.text}>{newTier.name}</span>!
              </p>
            </div>
          )}
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full py-3 bg-brand-navy text-parchment font-semibold rounded-2xl hover:bg-brand-navy-hover transition-colors btn-press"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
