import type { LeaderboardEntry } from "@/lib/leaderboard";
import { computeExplorerScore } from "@/lib/leaderboard";

function entry(
  e: Omit<LeaderboardEntry, "explorerScore">
): LeaderboardEntry {
  return { ...e, explorerScore: computeExplorerScore(e) };
}

export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  entry({
    id: "me",
    name: "You",
    username: "me",
    avatarInitial: "Y",
    color: "#c4623a",
    tier: 2,
    countries: 10,
    influence: 4,
    uniqueness: 620,
  }),
  entry({
    id: "fr1",
    name: "Nomad Nina",
    username: "nomad_nina",
    avatarInitial: "N",
    color: "#8B5CF6",
    tier: 3,
    countries: 18,
    influence: 11,
    uniqueness: 890,
  }),
  entry({
    id: "fr2",
    name: "Drift Walker",
    username: "drift_walker",
    avatarInitial: "D",
    color: "#EC4899",
    tier: 2,
    countries: 8,
    influence: 7,
    uniqueness: 1240,
  }),
  entry({
    id: "fr3",
    name: "Waypoint Sam",
    username: "waypoint_sam",
    avatarInitial: "W",
    color: "#F59E0B",
    tier: 4,
    countries: 22,
    influence: 16,
    uniqueness: 480,
  }),
  entry({
    id: "fr4",
    name: "Atlas Explorer",
    username: "atlas_explorer",
    avatarInitial: "A",
    color: "#06B6D4",
    tier: 2,
    countries: 7,
    influence: 2,
    uniqueness: 1580,
  }),
  entry({
    id: "fr5",
    name: "Sunset Sage",
    username: "sunset_sage",
    avatarInitial: "S",
    color: "#EF4444",
    tier: 3,
    countries: 14,
    influence: 9,
    uniqueness: 720,
  }),
  entry({
    id: "fr6",
    name: "Route Runner",
    username: "route_runner",
    avatarInitial: "R",
    color: "#10B981",
    tier: 1,
    countries: 3,
    influence: 1,
    uniqueness: 340,
  }),
];
