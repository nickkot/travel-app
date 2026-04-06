"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JournalEntry } from "@/components/JournalEntry";
import { JournalForm } from "@/components/JournalForm";
import { ReviewForm } from "@/components/ReviewForm";
import { CommentThread } from "@/components/CommentThread";
import { RatingForm } from "@/components/RatingForm";
import { getTripById } from "@/data/demoTrips";
import { formatDate, cn } from "@/lib/utils";

type Tab = "photos" | "journal" | "reviews";

const DEMO_COMMENTS = [
  {
    id: "c1",
    userId: "u2",
    content: "Amazing trip! Adding this to my bucket list.",
    createdAt: "2025-12-01",
    author: { name: "Nomad Nina", username: "nomad_nina", avatarUrl: null },
  },
  {
    id: "c2",
    userId: "u3",
    content: "Great journal entries. Looks like an incredible experience.",
    createdAt: "2025-12-02",
    author: { name: "Drift Walker", username: "drift_walker", avatarUrl: null },
  },
];

export default function TripDetailPage() {
  const params = useParams();
  const tripId = params.id as string;
  const tripData = getTripById(tripId);

  const DEMO_TRIP = tripData || {
    id: tripId, title: "Trip Details", description: "A travel adventure.",
    destinations: [{ city: "Unknown", country: "Unknown" }],
    startDate: "2025-01-01", endDate: "2025-01-07", status: "COMPLETED",
    visibility: "PUBLIC", upvoteCount: 0, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
  };
  const DEMO_PHOTOS = tripData?.photos || [];
  const DEMO_JOURNAL = tripData?.journal || [];
  const DEMO_REVIEWS = tripData?.reviews || [];
  const tripRating = tripData?.rating || { overall: 0, eat: 0, explore: 0, connect: 0, live: 0 };

  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [showRatingForm, setShowRatingForm] = useState(false);

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
            <span className="text-2xl font-serif font-bold text-brand-pin-past">{tripRating.overall.toFixed(1)}</span>
            <span className="text-brand-pin-past">{"\u{2605}"}</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: tripRating.eat, desc: "Food, restaurants, markets, street food" },
            { label: "Explore", icon: "\u{1F9ED}", rating: tripRating.explore, desc: "Nature, architecture, culture, sightseeing" },
            { label: "Connect", icon: "\u{1F91D}", rating: tripRating.connect, desc: "People, nightlife, social vibe" },
            { label: "Live", icon: "\u{1F3E0}", rating: tripRating.live, desc: "Value, transit, walkability, weather" },
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

      {/* Rate button */}
      {!showRatingForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowRatingForm(true)}
            className="w-full py-2.5 rounded-2xl ring-1 ring-brand-border text-sm font-medium text-brand-navy hover:bg-brand-surface transition-colors btn-press flex items-center justify-center gap-2"
          >
            <span>{"\u{2605}"}</span>
            Rate this destination
          </button>
        </div>
      )}

      {/* Rating form */}
      {showRatingForm && (
        <div className="mb-6 bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture">
          <RatingForm
            city={DEMO_TRIP.destinations[0]?.city || ""}
            country={DEMO_TRIP.destinations[0]?.country || ""}
            onSubmit={(data) => {
              setShowRatingForm(false);
            }}
            onClose={() => setShowRatingForm(false)}
          />
        </div>
      )}

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
