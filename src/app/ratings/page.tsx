"use client";

import {
  DestinationRating,
  type DestinationRatingProps,
} from "@/components/DestinationRating";

const ASPECT_PRESETS = {
  food: { aspect: "Food", icon: "\u{1F37D}\u{FE0F}" },
  nature: { aspect: "Nature", icon: "\u{1F3DE}\u{FE0F}" },
  culture: { aspect: "Culture", icon: "\u{1F3DB}\u{FE0F}" },
  people: { aspect: "People", icon: "\u{1F91D}" },
  nightlife: { aspect: "Nightlife", icon: "\u{1F378}" },
  safety: { aspect: "Safety", icon: "\u{1F6E1}\u{FE0F}" },
  value: { aspect: "Value", icon: "\u{1F4B0}" },
  transit: { aspect: "Transit", icon: "\u{1F687}" },
  walkability: { aspect: "Walkability", icon: "\u{1F6B6}" },
  architecture: { aspect: "Architecture", icon: "\u{1F3D7}\u{FE0F}" },
  beaches: { aspect: "Beaches", icon: "\u{1F3D6}\u{FE0F}" },
  weather: { aspect: "Weather", icon: "\u{2600}\u{FE0F}" },
};

const DEMO_RATINGS: DestinationRatingProps[] = [
  {
    id: "dr1",
    city: "Tokyo",
    country: "Japan",
    countryFlag: "\u{1F1EF}\u{1F1F5}",
    overallRating: 4.5,
    aspects: [
      { ...ASPECT_PRESETS.food, rating: 5.0 },
      { ...ASPECT_PRESETS.culture, rating: 5.0 },
      { ...ASPECT_PRESETS.safety, rating: 5.0 },
      { ...ASPECT_PRESETS.transit, rating: 4.5 },
      { ...ASPECT_PRESETS.people, rating: 4.0 },
      { ...ASPECT_PRESETS.nightlife, rating: 4.0 },
      { ...ASPECT_PRESETS.value, rating: 3.0 },
      { ...ASPECT_PRESETS.architecture, rating: 4.5 },
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
      { ...ASPECT_PRESETS.food, rating: 5.0 },
      { ...ASPECT_PRESETS.culture, rating: 5.0 },
      { ...ASPECT_PRESETS.value, rating: 4.5 },
      { ...ASPECT_PRESETS.people, rating: 4.5 },
      { ...ASPECT_PRESETS.walkability, rating: 4.0 },
      { ...ASPECT_PRESETS.nature, rating: 4.0 },
      { ...ASPECT_PRESETS.nightlife, rating: 3.5 },
      { ...ASPECT_PRESETS.safety, rating: 3.5 },
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
      { ...ASPECT_PRESETS.walkability, rating: 4.5 },
      { ...ASPECT_PRESETS.food, rating: 4.5 },
      { ...ASPECT_PRESETS.architecture, rating: 4.5 },
      { ...ASPECT_PRESETS.weather, rating: 4.0 },
      { ...ASPECT_PRESETS.value, rating: 3.5 },
      { ...ASPECT_PRESETS.nightlife, rating: 4.0 },
      { ...ASPECT_PRESETS.transit, rating: 3.5 },
      { ...ASPECT_PRESETS.people, rating: 4.0 },
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
      { ...ASPECT_PRESETS.nature, rating: 5.0 },
      { ...ASPECT_PRESETS.people, rating: 4.5 },
      { ...ASPECT_PRESETS.culture, rating: 4.0 },
      { ...ASPECT_PRESETS.food, rating: 3.5 },
      { ...ASPECT_PRESETS.value, rating: 4.0 },
      { ...ASPECT_PRESETS.safety, rating: 2.5 },
      { ...ASPECT_PRESETS.transit, rating: 2.0 },
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
      { ...ASPECT_PRESETS.food, rating: 5.0 },
      { ...ASPECT_PRESETS.value, rating: 5.0 },
      { ...ASPECT_PRESETS.nightlife, rating: 4.5 },
      { ...ASPECT_PRESETS.culture, rating: 4.0 },
      { ...ASPECT_PRESETS.transit, rating: 3.5 },
      { ...ASPECT_PRESETS.people, rating: 4.0 },
      { ...ASPECT_PRESETS.walkability, rating: 2.0 },
      { ...ASPECT_PRESETS.weather, rating: 2.5 },
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
        <h1 className="text-2xl font-bold font-serif text-brand-text">
          Destination Ratings
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
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
