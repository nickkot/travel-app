"use client";

import { FeedItem } from "@/components/FeedItem";

const DEMO_FEED = [
  {
    type: "trip" as const,
    id: "1",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    title: "Month-long slow travel through Portugal",
    preview:
      "Lisbon, Porto, the Algarve, and the tiny villages in between. This country rewards you for slowing down.",
    coverUrl: "https://picsum.photos/seed/portugal/800/400",
    destinations: ["Lisbon", "Porto", "Lagos", "Sintra"],
    upvoteCount: 45,
    commentCount: 12,
    createdAt: "2026-03-28",
  },
  {
    type: "review" as const,
    id: "r1",
    tripId: "t5",
    authorName: "Drift Walker",
    authorUsername: "drift_walker",
    title: "Narisawa",
    preview:
      "Two Michelin stars doesn't capture it. Yoshihiro Narisawa's 'innovative satoyama' cuisine is a philosophy, not a meal. Every course tells a story about Japan's forests and coastlines.",
    rating: 5,
    upvoteCount: 32,
    commentCount: 8,
    createdAt: "2026-03-27",
  },
  {
    type: "journal" as const,
    id: "j1",
    tripId: "t3",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    title: "Day 12 in Medelin",
    preview:
      "The elevation makes everything better — the coffee, the morning runs, the way the clouds roll through the valley at sunset. Spent today at Commune 13, which went from the most dangerous neighborhood in the world to an open-air art gallery.",
    upvoteCount: 18,
    commentCount: 5,
    createdAt: "2026-03-25",
  },
  {
    type: "trip" as const,
    id: "2",
    authorName: "Waypoint Sam",
    authorUsername: "waypoint_sam",
    title: "Climbing Kilimanjaro via Machame Route",
    preview:
      "7 days, 5 climate zones, one summit. The hardest and most rewarding thing I've done.",
    coverUrl: "https://picsum.photos/seed/kilimanjaro/800/400",
    destinations: ["Moshi", "Kilimanjaro"],
    upvoteCount: 78,
    commentCount: 23,
    createdAt: "2026-03-22",
  },
  {
    type: "review" as const,
    id: "r2",
    tripId: "t8",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    title: "Riad Yasmine",
    preview:
      "The most photographed riad in Marrakech for a reason, but it's more than Instagram bait. The staff remember your name, your tea preference, and which rooftop corner you like.",
    rating: 4,
    upvoteCount: 21,
    commentCount: 6,
    createdAt: "2026-03-20",
  },
];

export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>
      <div className="space-y-4">
        {DEMO_FEED.map((item) => (
          <FeedItem key={`${item.type}-${item.id}`} {...item} />
        ))}
      </div>
    </div>
  );
}
