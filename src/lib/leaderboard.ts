// Leaderboard scoring — Belli-inspired categories for travel

export interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  avatarInitial: string;
  color: string;
  tier: number;
  countries: number;     // unique countries visited
  daysAbroad: number;    // total days spent traveling
  uniqueness: number;    // weighted score for off-beaten-path destinations
  explorerScore: number; // combined overall score
}

// Weights for computing the combined Explorer Score
const WEIGHTS = {
  countries: 50,    // 50 pts per country
  daysAbroad: 5,    // 5 pts per day abroad
  uniqueness: 1,    // already a weighted score, use as-is
};

export function computeExplorerScore(entry: Omit<LeaderboardEntry, "explorerScore">): number {
  return (
    entry.countries * WEIGHTS.countries +
    entry.daysAbroad * WEIGHTS.daysAbroad +
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
  daysAbroad: {
    label: "Days Traveled",
    icon: "\u{1F4C5}",
    description: "Total days spent abroad",
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
