"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Streamlined recommendation form used by locals to publish insider tips
 * for visitors to their home city. Differences from ReviewForm:
 *   - city/country/lat/lng are fixed to the author's base location
 *   - pitched as an "insider tip" rather than a traveler's review
 *   - earns LOCAL_GUIDE miles (300) instead of WRITE_REVIEW (50)
 *
 * The backend (/api/reviews POST) detects the local match automatically
 * based on the author's stored base city — this form does not need to
 * send an isLocalGuide flag.
 */

const PLACE_TYPES = [
  "Restaurant",
  "Cafe",
  "Bar",
  "Neighborhood",
  "Market",
  "Museum",
  "Park",
  "Beach",
  "Experience",
  "Hotel",
  "Other",
];

interface LocalGuideFormProps {
  baseCity: string;
  baseCountry: string;
  baseLat: number;
  baseLng: number;
  onSubmit: (data: {
    placeName: string;
    placeType: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    rating: number;
    content: string;
  }) => void;
  onCancel?: () => void;
  onEditHomeBase?: () => void;
  isLoading?: boolean;
}

export function LocalGuideForm({
  baseCity,
  baseCountry,
  baseLat,
  baseLng,
  onSubmit,
  onCancel,
  onEditHomeBase,
  isLoading,
}: LocalGuideFormProps) {
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("Restaurant");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      placeName,
      placeType,
      city: baseCity,
      country: baseCountry,
      lat: baseLat,
      lng: baseLng,
      rating,
      content,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-brand-card rounded-2xl ring-1 ring-brand-border p-5"
    >
      {/* Locked home-base indicator */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-navy/5 ring-1 ring-brand-navy/15">
        <svg
          className="w-4 h-4 mt-0.5 text-brand-navy shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-brand-navy">
            Recommending in {baseCity}, {baseCountry}
          </p>
          <p className="text-[11px] text-brand-text-muted mt-0.5">
            Local picks earn{" "}
            <span className="font-semibold text-brand-navy">300 miles</span>.
            {onEditHomeBase && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={onEditHomeBase}
                  className="underline hover:text-brand-text transition-colors"
                >
                  Change home base
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          Place name
        </label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Manteigaria, Fabrica Coffee, Miradouro da Graça..."
          required
          maxLength={80}
          className="w-full px-4 py-2.5 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy/30 text-brand-text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PLACE_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPlaceType(type)}
              className={cn(
                "px-3 py-1 rounded-full text-xs border transition-colors",
                placeType === type
                  ? "bg-brand-navy text-parchment border-brand-navy"
                  : "border-brand-border text-brand-text-secondary hover:border-brand-navy-muted"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          How much do you love it?
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={cn(
                  "w-7 h-7",
                  star <= rating
                    ? "text-brand-pin-past fill-brand-pin-past"
                    : "text-brand-text-muted/30"
                )}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          Your insider tip
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What should visitors order? When's the best time to go? What do tourists always miss?"
          rows={4}
          required
          maxLength={500}
          className="w-full px-4 py-2.5 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy/30 resize-none text-brand-text"
        />
        <p className="text-[10px] text-brand-text-muted mt-1 text-right">
          {content.length}/500
        </p>
      </div>

      <div className="flex items-center gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || !placeName.trim() || !content.trim() || rating === 0}
          className="flex-1 py-2.5 bg-brand-navy text-parchment text-sm font-semibold rounded-xl hover:bg-brand-navy-hover transition-colors disabled:opacity-50 btn-press"
        >
          {isLoading ? "Publishing..." : "Publish recommendation"}
        </button>
      </div>
    </form>
  );
}
