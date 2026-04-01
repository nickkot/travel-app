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
    caption: "slow mornings in lisbon. pasteis de nata for breakfast, tram 28 for the views, fado at night. this city just gets it.",
    photoUrl: "https://picsum.photos/seed/lisbon-tram/800/1000",
    location: "Lisbon, Portugal",
    likeCount: 142,
    comments: [
      { username: "waypoint_sam", text: "tram 28 is so underrated" },
      { username: "atlas_explorer", text: "the pasteis de nata at Manteigaria though" },
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
    photoUrl: "https://picsum.photos/seed/kilimanjaro-summit/800/1000",
    location: "Mt Kilimanjaro, Tanzania",
    likeCount: 287,
    comments: [
      { username: "nomad_nina", text: "LEGEND" },
      { username: "atlas_explorer", text: "how many days was the climb?" },
      { username: "waypoint_sam", text: "7 days machame route. worth every step" },
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
    caption: "narisawa. two stars but honestly deserves three. every course is a love letter to japan's forests.",
    photoUrl: "https://picsum.photos/seed/narisawa-food/800/1000",
    location: "Narisawa, Tokyo",
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
    caption: "day 12. commune 13 went from the most dangerous neighborhood in medellin to an open-air art gallery. the resilience here is unreal.",
    photoUrl: "https://picsum.photos/seed/medellin-graffiti/800/1000",
    location: "Comuna 13, Medellin",
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
    caption: "golden hour at the sahara. no wifi, no plan, just dunes and stars. this is the reset i needed.",
    photoUrl: "https://picsum.photos/seed/sahara-sunset/800/1000",
    location: "Merzouga, Morocco",
    likeCount: 203,
    comments: [
      { username: "atlas_explorer", text: "the stars in the sahara hit different" },
      { username: "nomad_nina", text: "how did you get there from marrakech?" },
      { username: "sunset_sage", text: "shared minivan, 10 hrs but so worth it" },
    ],
    createdAt: "2026-03-22",
  },
  {
    type: "trip",
    id: "4",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    caption: "istanbul at dusk. the call to prayer echoing across the bosphorus while the city turns gold. some places just stop you in your tracks.",
    photoUrl: "https://picsum.photos/seed/istanbul-mosque/800/1000",
    location: "Istanbul, Turkey",
    likeCount: 178,
    comments: [
      { username: "waypoint_sam", text: "the rooftop views are everything" },
      { username: "drift_walker", text: "get the simit from the street vendors near galata" },
    ],
    createdAt: "2026-03-19",
  },
];

export default function FeedPage() {
  return (
    <div className="max-w-lg mx-auto pt-16 md:pt-20 pb-20 bg-brand-bg">
      {DEMO_FEED.map((item) => (
        <FeedItem key={`${item.type}-${item.id}`} {...item} />
      ))}
    </div>
  );
}
