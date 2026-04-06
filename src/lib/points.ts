// Compass Club — Miles & Tier Calculation

export interface TierDefinition {
  tier: number;
  name: string;
  icon: string;
  minMiles: number;
}

export const TIER_THRESHOLDS: TierDefinition[] = [
  { tier: 1, name: "Wanderer", icon: "compass", minMiles: 0 },
  { tier: 2, name: "Explorer", icon: "binoculars", minMiles: 1000 },
  { tier: 3, name: "Pathfinder", icon: "map", minMiles: 5000 },
  { tier: 4, name: "Voyager", icon: "ship-wheel", minMiles: 15000 },
  { tier: 5, name: "Navigator", icon: "north-star", minMiles: 50000 },
];

export const MILES_ACTIONS: Record<string, number> = {
  LOG_TRIP: 100,
  WRITE_REVIEW: 50,
  RETURN_VISIT: 150,
  WEEK_STAY: 200,
  MONTH_STAY: 500,
  REVIEW_UPVOTED: 25,
  OFF_BEATEN_PATH: 200,
  CITY_CONNECTION: 50,
  LOCAL_GUIDE: 300,
  WRITE_JOURNAL: 75,
};

export interface BadgeDefinition {
  type: string;
  name: string;
  description: string;
}

export const BADGE_ICONS: Record<string, string> = {
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
  // Regional achievements
  region_us: "\u{1F1FA}\u{1F1F8}",
  region_canada: "\u{1F1E8}\u{1F1E6}",
  region_mexico: "\u{1F1F2}\u{1F1FD}",
  region_east_asia: "\u{1F3EF}",
  region_southeast_asia: "\u{1F334}",
  region_west_europe: "\u{1F5FC}",
  region_south_europe: "\u{1F3DB}",
  region_east_europe: "\u{1F3F0}",
  region_middle_east: "\u{1F54C}",
  region_central_asia: "\u{1F3D4}",
  region_oceania: "\u{1F30A}",
  region_africa: "\u{1F981}",
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    type: "slow_burner",
    name: "Slow Burner",
    description: "Spent 30+ days in a single city",
  },
  {
    type: "polyglot_path",
    name: "Polyglot Path",
    description: "Visited countries with 5+ different official languages",
  },
  {
    type: "return_flight",
    name: "Return Flight",
    description: "Revisited the same destination 3+ times",
  },
  {
    type: "deep_roots",
    name: "Deep Roots",
    description: "Revisited 3+ different countries",
  },
  {
    type: "off_the_grid",
    name: "Off the Grid",
    description: "Visited a destination fewer than 1% of users have been to",
  },
  {
    type: "culinary_explorer",
    name: "Culinary Explorer",
    description: "Reviewed 50+ restaurants across 5+ countries",
  },
  {
    type: "hemisphere_hopper",
    name: "Hemisphere Hopper",
    description: "Visited all 4 hemispheres",
  },
  {
    type: "midnight_sun",
    name: "Midnight Sun",
    description: "Traveled above the Arctic Circle",
  },
  {
    type: "southern_cross",
    name: "Southern Cross",
    description: "Traveled below the Tropic of Capricorn",
  },
  {
    type: "time_traveler",
    name: "Time Traveler",
    description: "Been in 3+ time zones in a single week",
  },
  // Regional achievements
  {
    type: "region_us",
    name: "Americana",
    description: "Visited 5+ US states",
  },
  {
    type: "region_canada",
    name: "True North",
    description: "Visited 3+ Canadian provinces",
  },
  {
    type: "region_mexico",
    name: "Viva Mexico",
    description: "Visited 3+ Mexican states",
  },
  {
    type: "region_east_asia",
    name: "Far East",
    description: "Visited Japan, South Korea, or China",
  },
  {
    type: "region_southeast_asia",
    name: "Golden Triangle",
    description: "Visited 3+ Southeast Asian countries",
  },
  {
    type: "region_west_europe",
    name: "Grand Tour",
    description: "Visited France, UK, Netherlands, or Germany",
  },
  {
    type: "region_south_europe",
    name: "Mediterranean",
    description: "Visited Italy, Spain, Greece, or Portugal",
  },
  {
    type: "region_east_europe",
    name: "Iron Curtain",
    description: "Visited Russia, Czech Republic, Poland, or Croatia",
  },
  {
    type: "region_middle_east",
    name: "Silk Road",
    description: "Visited Turkey, Jordan, UAE, or Israel",
  },
  {
    type: "region_central_asia",
    name: "Roof of the World",
    description: "Visited Nepal, Georgia, or the Himalayan region",
  },
  {
    type: "region_oceania",
    name: "Down Under",
    description: "Visited Australia or New Zealand",
  },
  {
    type: "region_africa",
    name: "Safari Spirit",
    description: "Visited 2+ African countries",
  },
];

export function getTierForMiles(miles: number): TierDefinition {
  let currentTier = TIER_THRESHOLDS[0];
  for (const tier of TIER_THRESHOLDS) {
    if (miles >= tier.minMiles) {
      currentTier = tier;
    }
  }
  return currentTier;
}

export function getNextTier(currentTier: number): TierDefinition | null {
  const idx = TIER_THRESHOLDS.findIndex((t) => t.tier === currentTier);
  if (idx >= 0 && idx < TIER_THRESHOLDS.length - 1) {
    return TIER_THRESHOLDS[idx + 1];
  }
  return null;
}

export function getMilesProgress(miles: number): {
  current: TierDefinition;
  next: TierDefinition | null;
  progress: number;
} {
  const current = getTierForMiles(miles);
  const next = getNextTier(current.tier);
  if (!next) return { current, next: null, progress: 100 };

  const milesInTier = miles - current.minMiles;
  const tierRange = next.minMiles - current.minMiles;
  const progress = Math.min(100, (milesInTier / tierRange) * 100);

  return { current, next, progress };
}
