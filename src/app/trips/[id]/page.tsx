"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JournalEntry } from "@/components/JournalEntry";
import { JournalForm } from "@/components/JournalForm";
import { ReviewForm } from "@/components/ReviewForm";
import { CommentThread } from "@/components/CommentThread";
import { formatDate, cn } from "@/lib/utils";

type Tab = "photos" | "journal" | "reviews";

// Demo data
const DEMO_TRIP = {
  id: "1",
  title: "Two Weeks in Oaxaca",
  description:
    "Exploring the culinary capital of Mexico. Mezcal tours, market visits, traditional cooking classes, and remote beaches in Puerto Escondido.",
  destinations: [
    { city: "Oaxaca City", country: "Mexico" },
    { city: "Puerto Escondido", country: "Mexico" },
  ],
  startDate: "2025-11-15",
  endDate: "2025-11-29",
  status: "COMPLETED",
  visibility: "PUBLIC",
  upvoteCount: 24,
  authorName: "Atlas Explorer",
  authorUsername: "atlas_explorer",
};

const DEMO_PHOTOS = [
  { id: "p1", url: "https://picsum.photos/seed/oaxaca1/600/400", caption: "Monte Alban at sunrise" },
  { id: "p2", url: "https://picsum.photos/seed/oaxaca2/600/400", caption: "Mercado Benito Juarez" },
  { id: "p3", url: "https://picsum.photos/seed/oaxaca3/600/400", caption: "Mezcal tasting in Matatan" },
  { id: "p4", url: "https://picsum.photos/seed/oaxaca4/600/400", caption: "Street art in Jalatlaco" },
  { id: "p5", url: "https://picsum.photos/seed/oaxaca5/600/400", caption: "Sunset at Playa Zicatela" },
  { id: "p6", url: "https://picsum.photos/seed/oaxaca6/600/400", caption: null },
];

const DEMO_JOURNAL = [
  {
    id: "j1",
    content:
      "Arrived in Oaxaca City late afternoon. The light here is incredible — golden hour lasts forever. Checked into a small guesthouse in Jalatlaco. The neighborhood is covered in murals. Had tlayudas from a street vendor for dinner. This is going to be a good trip.",
    date: "2025-11-15",
    locationCity: "Oaxaca City",
    visibility: "PUBLIC",
    upvoteCount: 8,
    authorName: "Atlas Explorer",
  },
  {
    id: "j2",
    content:
      "Spent the whole morning at Mercado Benito Juarez and the adjacent 20 de Noviembre market. The chapulines are better than expected — nutty, crunchy, with a lime-chile hit. Talked to a woman who's been selling mole negro from the same stall for 30 years. Bought a bag of her paste to bring home. In the afternoon, joined a mezcal tour in the surrounding villages. The difference between industrial and artisanal mezcal is night and day.",
    date: "2025-11-17",
    locationCity: "Oaxaca City",
    visibility: "PUBLIC",
    upvoteCount: 15,
    authorName: "Atlas Explorer",
  },
  {
    id: "j3",
    content:
      "Bus to Puerto Escondido. 7 hours through the mountains — winding roads, stunning views of the Sierra Madre del Sur. The coast is a completely different world from the highland. Humidity hit me like a wall. Checked the surf at Zicatela — massive barrels, way beyond my level. Settled for the calmer waters at Carrizalillo.",
    date: "2025-11-21",
    locationCity: "Puerto Escondido",
    visibility: "PUBLIC",
    upvoteCount: 6,
    authorName: "Atlas Explorer",
  },
];

const DEMO_REVIEWS = [
  {
    id: "r1",
    placeName: "Mercado Benito Juarez",
    placeType: "Market",
    rating: 5,
    content:
      "The real heart of Oaxacan food culture. Skip the tourist restaurants — everything you need is here.",
    city: "Oaxaca City",
    upvoteCount: 12,
  },
  {
    id: "r2",
    placeName: "Mezcaloteca",
    placeType: "Bar",
    rating: 5,
    content:
      "Not a bar — an education. They guide you through curated flights of artisanal mezcals. Changed how I think about spirits.",
    city: "Oaxaca City",
    upvoteCount: 9,
  },
];

const DEMO_COMMENTS = [
  {
    id: "c1",
    userId: "u2",
    content: "The journal entries are amazing. Adding Oaxaca to my bucket list!",
    createdAt: "2025-12-01",
    author: { name: "Nomad Nina", username: "nomad_nina", avatarUrl: null },
  },
  {
    id: "c2",
    userId: "u3",
    content:
      "Mezcaloteca is incredible. Did you make it to the villages around Matatan for the palenques?",
    createdAt: "2025-12-02",
    author: {
      name: "Drift Walker",
      username: "drift_walker",
      avatarUrl: null,
    },
  },
];

export default function TripDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("photos");

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "photos", label: "Photos", count: DEMO_PHOTOS.length },
    { key: "journal", label: "Journal", count: DEMO_JOURNAL.length },
    { key: "reviews", label: "Reviews", count: DEMO_REVIEWS.length },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Trip header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-pin-past/10 text-brand-pin-past">
            Visited
          </span>
          <span className="text-sm text-brand-text-muted">
            {DEMO_TRIP.visibility}
          </span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-brand-text mb-2">{DEMO_TRIP.title}</h1>
        <p className="text-brand-text-secondary mb-3">{DEMO_TRIP.description}</p>

        {/* Destinations */}
        <div className="flex flex-wrap gap-2 mb-3">
          {DEMO_TRIP.destinations.map((d, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-sm text-brand-text"
            >
              {d.city}, {d.country}
            </span>
          ))}
        </div>

        {/* Dates & author */}
        <div className="flex items-center gap-4 text-sm text-brand-text-muted">
          <span>
            {formatDate(DEMO_TRIP.startDate)} — {formatDate(DEMO_TRIP.endDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-[10px] font-bold">
              {DEMO_TRIP.authorName.charAt(0)}
            </div>
            @{DEMO_TRIP.authorUsername}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            {DEMO_TRIP.upvoteCount}
          </span>
        </div>
      </div>

      {/* Destination rating */}
      <div className="mb-6 bg-brand-card rounded-[14px] border border-brand-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-brand-text">Destination Rating</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-serif font-bold text-brand-pin-past">4.5</span>
            <span className="text-brand-pin-past">{"\u{2605}"}</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: 5.0, desc: "Food, restaurants, markets, street food" },
            { label: "Explore", icon: "\u{1F9ED}", rating: 4.5, desc: "Nature, architecture, culture, sightseeing" },
            { label: "Connect", icon: "\u{1F91D}", rating: 4.0, desc: "People, nightlife, social vibe" },
            { label: "Live", icon: "\u{1F3E0}", rating: 4.5, desc: "Value, transit, walkability, weather" },
          ].map((a) => (
            <div key={a.label} className="flex items-center gap-3">
              <span className="text-lg w-7 text-center">{a.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-brand-text">{a.label}</span>
                  <span className="text-sm font-bold text-brand-text">{a.rating.toFixed(1)}</span>
                </div>
                <div className="w-full h-2 bg-brand-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-pin-past rounded-full"
                    style={{ width: `${(a.rating / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-brand-text-muted mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-brand-surface rounded-lg border border-brand-border p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-brand-navy text-parchment"
                : "text-brand-text-secondary hover:text-brand-text"
            )}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "photos" && (
        <div>
          <PhotoGrid photos={DEMO_PHOTOS} editable />
        </div>
      )}

      {activeTab === "journal" && (
        <div className="space-y-6">
          <JournalForm
            tripId={params.id as string}
            onSubmit={(data) => console.log("New journal entry:", data)}
          />
          <div className="space-y-4">
            {DEMO_JOURNAL.map((entry) => (
              <JournalEntry key={entry.id} {...entry} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-6">
          {/* Existing reviews */}
          <div className="space-y-4">
            {DEMO_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-brand-card rounded-[10px] border border-brand-border p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-brand-text">{review.placeName}</h4>
                    <span className="text-xs text-brand-text-muted">
                      {review.placeType} in {review.city}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={cn(
                          "w-4 h-4",
                          star <= review.rating
                            ? "text-brand-pin-past fill-brand-pin-past"
                            : "text-brand-text-muted/30"
                        )}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-brand-text-secondary">{review.content}</p>
                <div className="mt-2 text-xs text-brand-text-muted flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                  {review.upvoteCount}
                </div>
              </div>
            ))}
          </div>

          {/* Add review form */}
          <div className="bg-brand-card rounded-[10px] border border-brand-border p-5">
            <h3 className="font-medium text-brand-text mb-4">Add a Review</h3>
            <ReviewForm
              tripId={params.id as string}
              onSubmit={(data) => console.log("New review:", data)}
            />
          </div>
        </div>
      )}

      {/* Comments section */}
      <div className="mt-8 pt-6 border-t border-brand-border">
        <CommentThread
          comments={DEMO_COMMENTS}
          onSubmit={(content) => console.log("New comment:", content)}
        />
      </div>
    </div>
  );
}
