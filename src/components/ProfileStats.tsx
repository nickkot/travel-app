"use client";

import type { TravelStats } from "@/types";

interface ProfileStatsProps {
  stats: TravelStats;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    { label: "Countries", value: stats.countriesVisited, icon: "\u{1F30D}" },
    { label: "Cities", value: stats.citiesVisited, icon: "\u{1F3D9}" },
    { label: "Continents", value: stats.continentsVisited, icon: "\u{1F5FA}" },
    { label: "Trips", value: stats.totalTrips, icon: "\u{2708}" },
    { label: "Days Abroad", value: stats.daysAbroad, icon: "\u{1F4C5}" },
    { label: "Longest Trip", value: `${stats.longestTrip}d`, icon: "\u{1F3C6}" },
    {
      label: "Return Rate",
      value: `${stats.returnRate.toFixed(0)}%`,
      icon: "\u{1F504}",
    },
  ];

  return (
    <div className="bg-brand-card rounded-[10px] border border-brand-border p-5">
      <h3 className="font-semibold font-serif text-lg text-brand-text mb-4">Travel Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold text-brand-navy">{stat.value}</div>
            <div className="text-xs text-brand-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
