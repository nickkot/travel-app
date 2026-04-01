// Leaderboard scoring — Belli-inspired categories for travel

export interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  avatarInitial: string;
  color: string;
  tier: number;
  countries: number;     // unique countries visited
  influence: number;     // friends recruited + friends inspired to visit a place
  uniqueness: number;    // weighted score for off-beaten-path destinations
  explorerScore: number; // combined overall score
}

// Weights for computing the combined Explorer Score
const WEIGHTS = {
  countries: 50,    // 50 pts per country
  influence: 30,    // 30 pts per influence point
  uniqueness: 1,    // already a weighted score, use as-is
};

export function computeExplorerScore(entry: Omit<LeaderboardEntry, "explorerScore">): number {
  return (
    entry.countries * WEIGHTS.countries +
    entry.influence * WEIGHTS.influence +
    entry.uniqueness * WEIGHTS.uniqueness
  );
}

export type LeaderboardCategory = keyof typeof WEIGHTS | "explorerScore";

export const CATEGORY_META: Record<
  LeaderboardCategory,
  { label: string; icon: string; description: string }
> = {
  explorerScore: {
    label: "Explorer Score",
    icon: "\u{1F3C6}",
    description: "Combined overall ranking",
  },
  countries: {
    label: "Countries",
    icon: "\u{1F30D}",
    description: "Unique countries visited",
  },
  influence: {
    label: "Influence",
    icon: "\u{1F91D}",
    description: "Friends recruited & inspired",
  },
  uniqueness: {
    label: "Uniqueness",
    icon: "\u{2728}",
    description: "Off-the-beaten-path score",
  },
};

export function rankByCategory(
  entries: LeaderboardEntry[],
  category: LeaderboardCategory
): LeaderboardEntry[] {
  return [...entries].sort((a, b) => b[category] - a[category]);
}
