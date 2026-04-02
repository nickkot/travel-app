"use client";

import { useState, useMemo } from "react";
import { FeedItem, type FeedItemProps } from "@/components/FeedItem";
import { cn } from "@/lib/utils";

const A = {
  eat: { label: "Eat", icon: "\u{1F37D}\u{FE0F}" },
  explore: { label: "Explore", icon: "\u{1F9ED}" },
  connect: { label: "Connect", icon: "\u{1F91D}" },
  live: { label: "Live", icon: "\u{1F3E0}" },
};

const DEMO_FEED: FeedItemProps[] = [
  {
    type: "trip",
    id: "1",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    coAuthorName: "Drift Walker",
    coAuthorUsername: "drift_walker",
    caption: "slow mornings in lisbon. pasteis de nata for breakfast, tram 28 for the views, fado at night.",
    photos: [
      "https://picsum.photos/seed/lisbon-tram/800/600",
      "https://picsum.photos/seed/lisbon-1/800/600",
      "https://picsum.photos/seed/lisbon-2/800/600",
      "https://picsum.photos/seed/lisbon-3/800/600",
    ],
    location: "Lisbon, Portugal",
    countryFlag: "\u{1F1F5}\u{1F1F9}",
    countryCode: "PRT",
    route: ["Lisbon", "Sintra", "Porto", "Lagos"],
    stats: { days: 18, cities: 4, photos: 247, km: 14200 },
    destinationRating: {
      overall: 4.0,
      aspects: [
        { ...A.eat, rating: 4.5 },
        { ...A.explore, rating: 4.5 },
        { ...A.connect, rating: 4.0 },
        { ...A.live, rating: 3.5 },
      ],
    },
    timeline: [
      { day: 1, highlight: "Landed in Lisbon, Alfama walking tour", emoji: "\u{2708}\u{FE0F}" },
      { day: 3, highlight: "Sintra palaces day trip", emoji: "\u{1F3F0}" },
      { day: 7, highlight: "Train to Porto, wine tasting", emoji: "\u{1F377}" },
      { day: 12, highlight: "Road trip to Algarve coast", emoji: "\u{1F3D6}\u{FE0F}" },
      { day: 18, highlight: "Sunset cliffs in Lagos", emoji: "\u{1F305}" },
    ],
    likeCount: 142,
    comments: [
      { username: "waypoint_sam", text: "tram 28 is so underrated" },
      { username: "atlas_explorer", text: "the pasteis de nata at Manteigaria tho" },
      { username: "drift_walker", text: "best trip we ever took together" },
      { username: "sunset_sage", text: "adding this to my list immediately" },
    ],
    createdAt: "2026-03-30",
  },
  // Rating-only post (no photos)
  {
    type: "rating",
    id: "dr1",
    authorName: "Drift Walker",
    authorUsername: "drift_walker",
    caption: "tokyo is flawless. cleanest city, best food, trains that run on the second. I have no notes.",
    location: "Tokyo, Japan",
    countryFlag: "\u{1F1EF}\u{1F1F5}",
    countryCode: "JPN",
    destinationRating: {
      overall: 4.5,
      aspects: [
        { ...A.eat, rating: 5.0 },
        { ...A.explore, rating: 4.5 },
        { ...A.connect, rating: 4.0 },
        { ...A.live, rating: 4.5 },
      ],
    },
    likeCount: 94,
    comments: [
      { username: "nomad_nina", text: "the ramen alone is worth the flight" },
      { username: "waypoint_sam", text: "convenience stores there are better than most restaurants here" },
    ],
    createdAt: "2026-03-29",
  },
  {
    type: "trip",
    id: "2",
    authorName: "Waypoint Sam",
    authorUsername: "waypoint_sam",
    caption: "summit day. 5,895m. cried at the top, not gonna lie.",
    photos: [
      "https://picsum.photos/seed/kilimanjaro-summit/800/600",
      "https://picsum.photos/seed/kili-camp/800/600",
      "https://picsum.photos/seed/kili-trail/800/600",
    ],
    location: "Mt Kilimanjaro, Tanzania",
    countryFlag: "\u{1F1F9}\u{1F1FF}",
    countryCode: "TZA",
    route: ["Moshi", "Machame Gate", "Shira Camp", "Barranco", "Summit"],
    stats: { days: 7, cities: 2, photos: 89, km: 3400 },
    destinationRating: {
      overall: 4.5,
      aspects: [
        { ...A.eat, rating: 3.0 },
        { ...A.explore, rating: 5.0 },
        { ...A.connect, rating: 4.5 },
        { ...A.live, rating: 3.5 },
      ],
    },
    timeline: [
      { day: 1, highlight: "Machame Gate to Machame Camp", emoji: "\u{1F6B6}" },
      { day: 2, highlight: "Through the rainforest to Shira", emoji: "\u{1F332}" },
      { day: 4, highlight: "Barranco Wall scramble", emoji: "\u{1FA78}" },
      { day: 6, highlight: "Midnight summit push begins", emoji: "\u{1F319}" },
      { day: 7, highlight: "Uhuru Peak at sunrise", emoji: "\u{26F0}\u{FE0F}" },
    ],
    likeCount: 287,
    comments: [
      { username: "nomad_nina", text: "LEGEND" },
      { username: "atlas_explorer", text: "how many days was the climb?" },
      { username: "route_runner", text: "this is my dream climb" },
    ],
    createdAt: "2026-03-28",
  },
  // Rating-only post (no photos)
  {
    type: "rating",
    id: "dr2",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    caption: "nairobi is chaos and beauty in equal measure. the safari access is unmatched but the city itself takes some adjusting.",
    location: "Nairobi, Kenya",
    countryFlag: "\u{1F1F0}\u{1F1EA}",
    countryCode: "KEN",
    destinationRating: {
      overall: 3.5,
      aspects: [
        { ...A.eat, rating: 3.5 },
        { ...A.explore, rating: 5.0 },
        { ...A.connect, rating: 4.5 },
        { ...A.live, rating: 2.5 },
      ],
    },
    likeCount: 38,
    comments: [
      { username: "sunset_sage", text: "the masai mara tho" },
    ],
    createdAt: "2026-03-26",
  },
  {
    type: "journal",
    id: "j1",
    tripId: "t3",
    authorName: "Sunset Sage",
    authorUsername: "sunset_sage",
    coAuthorName: "Route Runner",
    coAuthorUsername: "route_runner",
    caption: "day 12. commune 13 went from the most dangerous neighborhood to an open-air art gallery. the resilience here is unreal.",
    photos: [
      "https://picsum.photos/seed/medellin-graffiti/800/600",
      "https://picsum.photos/seed/medellin-1/800/600",
    ],
    location: "Comuna 13, Medellin",
    countryFlag: "\u{1F1E8}\u{1F1F4}",
    countryCode: "COL",
    route: ["Bogota", "Medellin", "Guatape", "Cartagena"],
    stats: { days: 21, cities: 4, photos: 312, km: 8900 },
    destinationRating: {
      overall: 4.5,
      aspects: [
        { ...A.eat, rating: 4.5 },
        { ...A.explore, rating: 4.5 },
        { ...A.connect, rating: 5.0 },
        { ...A.live, rating: 4.0 },
      ],
    },
    likeCount: 64,
    comments: [
      { username: "nomad_nina", text: "the street art tour is a must" },
      { username: "waypoint_sam", text: "medellin is so slept on" },
      { username: "drift_walker", text: "the escalators through the neighborhood are wild" },
    ],
    createdAt: "2026-03-25",
  },
  // Rating-only post
  {
    type: "rating",
    id: "dr3",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    caption: "oaxaca ruined me for mexican food everywhere else. the mole, the mezcal, the markets. two weeks wasn't enough.",
    location: "Oaxaca, Mexico",
    countryFlag: "\u{1F1F2}\u{1F1FD}",
    countryCode: "MEX",
    destinationRating: {
      overall: 4.5,
      aspects: [
        { ...A.eat, rating: 5.0 },
        { ...A.explore, rating: 4.5 },
        { ...A.connect, rating: 4.0 },
        { ...A.live, rating: 4.5 },
      ],
    },
    likeCount: 67,
    comments: [
      { username: "waypoint_sam", text: "the chapulines are incredible" },
      { username: "atlas_explorer", text: "mezcaloteca changed my life" },
    ],
    createdAt: "2026-03-22",
  },
  // User's own posts
  {
    type: "trip",
    id: "my1",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    caption: "two weeks in oaxaca changed everything. the mole negro, the mezcal villages, the sunsets at puerto escondido. already planning the return trip.",
    photos: [
      "https://picsum.photos/seed/oaxaca-me-1/800/600",
      "https://picsum.photos/seed/oaxaca-me-2/800/600",
      "https://picsum.photos/seed/oaxaca-me-3/800/600",
    ],
    location: "Oaxaca, Mexico",
    countryFlag: "\u{1F1F2}\u{1F1FD}",
    countryCode: "MEX",
    route: ["Oaxaca City", "Monte Alban", "Puerto Escondido"],
    stats: { days: 14, cities: 3, photos: 47, km: 4800 },
    destinationRating: {
      overall: 4.5,
      aspects: [
        { ...A.eat, rating: 5.0 },
        { ...A.explore, rating: 4.5 },
        { ...A.connect, rating: 4.0 },
        { ...A.live, rating: 4.5 },
      ],
    },
    timeline: [
      { day: 1, highlight: "Landed in Oaxaca, Jalatlaco walking tour", emoji: "\u{2708}\u{FE0F}" },
      { day: 5, highlight: "Monte Alban at sunrise", emoji: "\u{1F305}" },
      { day: 8, highlight: "Bus to Puerto Escondido", emoji: "\u{1F68C}" },
      { day: 14, highlight: "Last sunset at Playa Zicatela", emoji: "\u{1F305}" },
    ],
    likeCount: 24,
    comments: [
      { username: "nomad_nina", text: "the mezcal villages are unreal" },
      { username: "drift_walker", text: "adding this to my list" },
    ],
    createdAt: "2026-03-20",
  },
  {
    type: "rating",
    id: "mydr1",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    caption: "nairobi is chaos and beauty. the safari access is unmatched but the city takes some adjusting. would go back in a heartbeat.",
    location: "Nairobi, Kenya",
    countryFlag: "\u{1F1F0}\u{1F1EA}",
    countryCode: "KEN",
    destinationRating: {
      overall: 3.5,
      aspects: [
        { ...A.eat, rating: 3.5 },
        { ...A.explore, rating: 5.0 },
        { ...A.connect, rating: 4.5 },
        { ...A.live, rating: 2.5 },
      ],
    },
    likeCount: 38,
    comments: [
      { username: "sunset_sage", text: "the masai mara tho" },
    ],
    createdAt: "2026-03-15",
  },
];

const CURRENT_USERNAME = "atlas_explorer";

type FeedFilter = "all" | "mine";
type FeedSort = "recent" | "top-rated";

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [sort, setSort] = useState<FeedSort>("recent");

  const filteredFeed = useMemo(() => {
    let feed = DEMO_FEED;
    if (filter === "mine") {
      feed = feed.filter((item) => item.authorUsername === CURRENT_USERNAME);
    }
    if (sort === "top-rated") {
      feed = [...feed].sort(
        (a, b) => (b.destinationRating?.overall ?? 0) - (a.destinationRating?.overall ?? 0)
      );
    }
    return feed;
  }, [filter, sort]);

  return (
    <div className="max-w-lg mx-auto pt-16 md:pt-20 pb-20 px-4">
      {/* Filter toggle */}
      <div className="flex items-center gap-1 mb-3 bg-brand-surface rounded-full p-1 ring-1 ring-brand-border">
        {(["all", "mine"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300",
              filter === f
                ? "bg-brand-navy text-parchment shadow-sm"
                : "text-brand-text-secondary hover:text-brand-text"
            )}
          >
            {f === "all" ? "All Trips" : "My Trips"}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 mb-4">
        {(["recent", "top-rated"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all",
              sort === s
                ? "bg-brand-pin-past/10 text-brand-pin-past ring-1 ring-brand-pin-past/30"
                : "text-brand-text-muted hover:text-brand-text"
            )}
          >
            {s === "recent" ? "Recent" : "Top Rated"}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filteredFeed.map((item) => (
          <FeedItem key={`${item.type}-${item.id}`} {...item} />
        ))}
      </div>

      {filteredFeed.length === 0 && (
        <div className="text-center py-16 text-brand-text-muted">
          <p className="text-lg font-serif">No trips yet</p>
          <p className="text-sm mt-1">Start logging your travels to see them here</p>
        </div>
      )}
    </div>
  );
}
