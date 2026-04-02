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
    daysAbroad: 187,
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
    daysAbroad: 342,
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
    daysAbroad: 156,
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
    daysAbroad: 410,
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
    daysAbroad: 98,
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
    daysAbroad: 245,
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
    daysAbroad: 21,
    uniqueness: 340,
  }),
];
