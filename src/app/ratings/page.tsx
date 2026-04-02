"use client";

import {
  DestinationRating,
  type DestinationRatingProps,
} from "@/components/DestinationRating";

const ASPECTS = {
  eat: { aspect: "Eat", icon: "\u{1F37D}\u{FE0F}" },
  explore: { aspect: "Explore", icon: "\u{1F9ED}" },
  connect: { aspect: "Connect", icon: "\u{1F91D}" },
  live: { aspect: "Live", icon: "\u{1F3E0}" },
};

const DEMO_RATINGS: DestinationRatingProps[] = [
  {
    id: "dr1",
    city: "Tokyo",
    country: "Japan",
    countryFlag: "\u{1F1EF}\u{1F1F5}",
    overallRating: 4.5,
    aspects: [
      { ...ASPECTS.eat, rating: 5.0 },
      { ...ASPECTS.explore, rating: 4.5 },
      { ...ASPECTS.connect, rating: 4.0 },
      { ...ASPECTS.live, rating: 4.5 },
    ],
    review: "The cleanest, most efficient, most delicious city on earth. Every meal is perfect. Every train is on time. I have no notes.",
    authorName: "Nomad Nina",
    authorUsername: "nomad_nina",
    likeCount: 94,
    createdAt: "Mar 28",
  },
  {
    id: "dr2",
    city: "Oaxaca",
    country: "Mexico",
    countryFlag: "\u{1F1F2}\u{1F1FD}",
    overallRating: 4.5,
    aspects: [
      { ...ASPECTS.eat, rating: 5.0 },
      { ...ASPECTS.explore, rating: 4.5 },
      { ...ASPECTS.connect, rating: 4.0 },
      { ...ASPECTS.live, rating: 4.5 },
    ],
    review: "Oaxaca ruined me for Mexican food everywhere else. The mole, the mezcal, the markets. Two weeks wasn't enough.",
    authorName: "Drift Walker",
    authorUsername: "drift_walker",
    likeCount: 67,
    createdAt: "Mar 25",
  },
  {
    id: "dr3",
    city: "Lisbon",
    country: "Portugal",
    countryFlag: "\u{1F1F5}\u{1F1F9}",
    overallRating: 4.0,
    aspects: [
      { ...ASPECTS.eat, rating: 4.5 },
      { ...ASPECTS.explore, rating: 4.5 },
      { ...ASPECTS.connect, rating: 4.0 },
      { ...ASPECTS.live, rating: 3.5 },
    ],
    review: "The hills will destroy your calves but the views are worth every step. Pasteis de nata every morning, fado every night.",
    authorName: "Waypoint Sam",
    authorUsername: "waypoint_sam",
    likeCount: 52,
    createdAt: "Mar 22",
  },
  {
    id: "dr4",
    city: "Nairobi",
    country: "Kenya",
    countryFlag: "\u{1F1F0}\u{1F1EA}",
    overallRating: 3.5,
    aspects: [
      { ...ASPECTS.eat, rating: 3.5 },
      { ...ASPECTS.explore, rating: 5.0 },
      { ...ASPECTS.connect, rating: 4.5 },
      { ...ASPECTS.live, rating: 2.5 },
    ],
    review: "The gateway to the best safari on earth. The city itself is chaotic and beautiful. Karibu Kenya.",
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    likeCount: 38,
    createdAt: "Mar 18",
  },
  {
    id: "dr5",
    city: "Bangkok",
    country: "Thailand",
    countryFlag: "\u{1F1F9}\u{1F1ED}",
    overallRating: 4.0,
    aspects: [
      { ...ASPECTS.eat, rating: 5.0 },
      { ...ASPECTS.explore, rating: 4.0 },
      { ...ASPECTS.connect, rating: 4.0 },
      { ...ASPECTS.live, rating: 4.0 },
    ],
    review: "Street food that costs $1 and tastes like heaven. Temples that take your breath away. Heat that takes everything else.",
    authorName: "Sunset Sage",
    authorUsername: "sunset_sage",
    likeCount: 71,
    createdAt: "Mar 15",
  },
];

export default function RatingsPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-16 md:pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif text-brand-text">
          Destination Ratings
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1 tracking-wide">
          How your friends rate the places they&apos;ve been
        </p>
      </div>

      <div className="space-y-4">
        {DEMO_RATINGS.map((rating) => (
          <DestinationRating key={rating.id} {...rating} />
        ))}
      </div>
    </div>
  );
}
