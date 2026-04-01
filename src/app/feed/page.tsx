"use client";

import { FeedItem, type FeedItemProps } from "@/components/FeedItem";

const DEMO_FEED: FeedItemProps[] = [
  {
    type: "trip",
    id: "1",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    coAuthorName: "Drift Walker",
    coAuthorUsername: "drift_walker",
    caption: "slow mornings in lisbon. pasteis de nata for breakfast, tram 28 for the views, fado at night.",
    heroPhoto: "https://picsum.photos/seed/lisbon-tram/800/600",
    photos: [
      "https://picsum.photos/seed/lisbon-1/400/400",
      "https://picsum.photos/seed/lisbon-2/400/400",
      "https://picsum.photos/seed/lisbon-3/400/400",
      "https://picsum.photos/seed/lisbon-4/400/400",
    ],
    location: "Lisbon, Portugal",
    countryFlag: "\u{1F1F5}\u{1F1F9}",
    countryCode: "PRT",
    route: ["Lisbon", "Sintra", "Porto", "Lagos"],
    stats: { days: 18, cities: 4, photos: 247, km: 14200 },
    destinationRating: {
      overall: 4.0,
      aspects: [
        { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: 4.5 },
        { label: "Explore", icon: "\u{1F9ED}", rating: 4.5 },
        { label: "Connect", icon: "\u{1F91D}", rating: 4.0 },
        { label: "Live", icon: "\u{1F3E0}", rating: 3.5 },
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
  {
    type: "trip",
    id: "2",
    authorName: "Waypoint Sam",
    authorUsername: "waypoint_sam",
    caption: "summit day. 5,895m. cried at the top, not gonna lie.",
    heroPhoto: "https://picsum.photos/seed/kilimanjaro-summit/800/600",
    photos: [
      "https://picsum.photos/seed/kili-camp/400/400",
      "https://picsum.photos/seed/kili-trail/400/400",
      "https://picsum.photos/seed/kili-clouds/400/400",
    ],
    location: "Mt Kilimanjaro, Tanzania",
    countryFlag: "\u{1F1F9}\u{1F1FF}",
    countryCode: "TZA",
    route: ["Moshi", "Machame Gate", "Shira Camp", "Barranco", "Summit"],
    stats: { days: 7, cities: 2, photos: 89, km: 3400 },
    destinationRating: {
      overall: 4.5,
      aspects: [
        { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: 3.0 },
        { label: "Explore", icon: "\u{1F9ED}", rating: 5.0 },
        { label: "Connect", icon: "\u{1F91D}", rating: 4.5 },
        { label: "Live", icon: "\u{1F3E0}", rating: 3.5 },
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
      { username: "drift_walker", text: "the clouds below you!!" },
    ],
    createdAt: "2026-03-28",
  },
  {
    type: "review",
    id: "r1",
    tripId: "t5",
    authorName: "Drift Walker",
    authorUsername: "drift_walker",
    caption: "narisawa. two stars but deserves three. every course is a love letter to japan's forests.",
    heroPhoto: "https://picsum.photos/seed/narisawa-food/800/600",
    photos: [
      "https://picsum.photos/seed/narisawa-1/400/400",
      "https://picsum.photos/seed/narisawa-2/400/400",
    ],
    location: "Narisawa, Tokyo",
    countryFlag: "\u{1F1EF}\u{1F1F5}",
    countryCode: "JPN",
    rating: 5,
    likeCount: 89,
    comments: [
      { username: "nomad_nina", text: "the bread course alone is worth the trip" },
      { username: "sunset_sage", text: "how far in advance did you book?" },
    ],
    createdAt: "2026-03-27",
  },
  {
    type: "journal",
    id: "j1",
    tripId: "t3",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    coAuthorName: "Route Runner",
    coAuthorUsername: "route_runner",
    caption: "day 12. commune 13 went from the most dangerous neighborhood to an open-air art gallery. the resilience here is unreal.",
    heroPhoto: "https://picsum.photos/seed/medellin-graffiti/800/600",
    photos: [
      "https://picsum.photos/seed/medellin-1/400/400",
      "https://picsum.photos/seed/medellin-2/400/400",
      "https://picsum.photos/seed/medellin-3/400/400",
      "https://picsum.photos/seed/medellin-4/400/400",
      "https://picsum.photos/seed/medellin-5/400/400",
      "https://picsum.photos/seed/medellin-6/400/400",
    ],
    location: "Comuna 13, Medellin",
    countryFlag: "\u{1F1E8}\u{1F1F4}",
    countryCode: "COL",
    route: ["Bogota", "Medellin", "Guatape", "Cartagena"],
    stats: { days: 21, cities: 4, photos: 312, km: 8900 },
    destinationRating: {
      overall: 4.5,
      aspects: [
        { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: 4.5 },
        { label: "Explore", icon: "\u{1F9ED}", rating: 4.5 },
        { label: "Connect", icon: "\u{1F91D}", rating: 5.0 },
        { label: "Live", icon: "\u{1F3E0}", rating: 4.0 },
      ],
    },
    timeline: [
      { day: 1, highlight: "Bogota street food tour", emoji: "\u{1F32E}" },
      { day: 5, highlight: "Flew to Medellin, settled in El Poblado", emoji: "\u{2708}\u{FE0F}" },
      { day: 9, highlight: "Day trip to Guatape, climbed the Rock", emoji: "\u{1FA78}" },
      { day: 12, highlight: "Comuna 13 street art + escalators", emoji: "\u{1F3A8}" },
      { day: 18, highlight: "Cartagena old town & beach days", emoji: "\u{1F3D6}\u{FE0F}" },
    ],
    likeCount: 64,
    comments: [
      { username: "nomad_nina", text: "the street art tour is a must" },
      { username: "waypoint_sam", text: "medellin is so slept on" },
      { username: "drift_walker", text: "the escalators through the neighborhood are wild" },
    ],
    createdAt: "2026-03-25",
  },
  {
    type: "trip",
    id: "3",
    authorName: "Sunset Sage",
    authorUsername: "sunset_sage",
    caption: "golden hour at the sahara. no wifi, no plan, just dunes and stars.",
    heroPhoto: "https://picsum.photos/seed/sahara-sunset/800/600",
    photos: [
      "https://picsum.photos/seed/sahara-1/400/400",
      "https://picsum.photos/seed/sahara-2/400/400",
      "https://picsum.photos/seed/sahara-3/400/400",
      "https://picsum.photos/seed/sahara-4/400/400",
    ],
    location: "Merzouga, Morocco",
    countryFlag: "\u{1F1F2}\u{1F1E6}",
    countryCode: "MAR",
    route: ["Marrakech", "Ait Benhaddou", "Todra Gorge", "Merzouga"],
    stats: { days: 10, cities: 4, photos: 178, km: 5600 },
    destinationRating: {
      overall: 4.0,
      aspects: [
        { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: 4.0 },
        { label: "Explore", icon: "\u{1F9ED}", rating: 5.0 },
        { label: "Connect", icon: "\u{1F91D}", rating: 3.5 },
        { label: "Live", icon: "\u{1F3E0}", rating: 3.5 },
      ],
    },
    timeline: [
      { day: 1, highlight: "Marrakech medina & Jemaa el-Fnaa", emoji: "\u{1F3EA}" },
      { day: 3, highlight: "Ait Benhaddou kasbah at sunrise", emoji: "\u{1F305}" },
      { day: 5, highlight: "Todra Gorge canyon hike", emoji: "\u{26F0}\u{FE0F}" },
      { day: 7, highlight: "Camel trek into the Sahara dunes", emoji: "\u{1F42A}" },
      { day: 9, highlight: "Night under the stars, zero light pollution", emoji: "\u{2B50}" },
    ],
    likeCount: 203,
    comments: [
      { username: "atlas_explorer", text: "the stars in the sahara hit different" },
      { username: "nomad_nina", text: "how did you get there from marrakech?" },
      { username: "sunset_sage", text: "shared minivan, 10 hrs but so worth it" },
    ],
    createdAt: "2026-03-22",
  },
];

export default function FeedPage() {
  return (
    <div className="max-w-lg mx-auto pt-16 md:pt-20 pb-20 px-4 space-y-4">
      {DEMO_FEED.map((item) => (
        <FeedItem key={`${item.type}-${item.id}`} {...item} />
      ))}
    </div>
  );
}
