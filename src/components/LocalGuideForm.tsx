"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Streamlined recommendation form used by locals to publish insider tips
 * for visitors to their home city. Differences from ReviewForm:
 *   - city/country/lat/lng are fixed to the author's base location(s)
 *   - supports picking between two home cities when the author has both
 *   - category list is broader than a traveler's review: places to eat,
 *     spots to see, neighborhoods, streets, vibes, general tips, etc.
 *   - earns LOCAL_GUIDE miles (300) instead of WRITE_REVIEW (50)
 *
 * The backend (/api/reviews POST) detects the local match automatically
 * based on the author's stored base cities — this form does not need to
 * send an isLocalGuide flag.
 */

export interface HomeBase {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

/** Grouped categories — each group renders as a labeled row of chips. */
const CATEGORY_GROUPS: { label: string; types: string[] }[] = [
  { label: "Eat & drink", types: ["Restaurant", "Cafe", "Bar", "Market"] },
  { label: "See & do", types: ["Viewpoint", "Attraction", "Museum", "Experience", "Park", "Beach"] },
  { label: "Wander", types: ["Neighborhood", "Street"] },
  { label: "Tips & vibes", types: ["Vibe", "Tip"] },
  { label: "Stay", types: ["Hotel"] },
];

/** Categories that don't represent a specific venue — labels and copy adapt. */
const NON_PLACE_TYPES = new Set(["Vibe", "Tip", "Street", "Neighborhood"]);

const PLACEHOLDERS: Record<string, { name: string; content: string }> = {
  Restaurant: {
    name: "Manteigaria, O Velho Eurico, Cervejaria Ramiro...",
    content: "What should visitors order? When's the best time to go?",
  },
  Cafe: {
    name: "Fabrica Coffee Roasters, Hello Kristof...",
    content: "Espresso, pastry, or the quiet corner worth sitting in.",
  },
  Bar: {
    name: "Red Frog, Pensao Amor, By the Wine...",
    content: "The drink to order, the crowd, the best night of the week.",
  },
  Market: {
    name: "Mercado de Campo de Ourique, Time Out Market...",
    content: "Which stall to hit first, what day has the best atmosphere.",
  },
  Viewpoint: {
    name: "Miradouro da Graça, Castelo hill at sunset...",
    content: "The best time of day, how to get there without the crowds.",
  },
  Attraction: {
    name: "Jerónimos Monastery, LX Factory, Berardo...",
    content: "What most tourists miss — the detail worth stopping for.",
  },
  Museum: {
    name: "Gulbenkian, MAAT, Azulejo...",
    content: "Which wing to start in and the hour that has no queue.",
  },
  Experience: {
    name: "Fado in Alfama, sunset sailing on the Tejo...",
    content: "How to book it local-style, not tourist-style.",
  },
  Park: {
    name: "Jardim da Estrela, Parque Eduardo VII...",
    content: "The bench with the best view, the morning vs evening vibe.",
  },
  Beach: {
    name: "Praia do Guincho, Costa da Caparica...",
    content: "Which stretch has the right waves, the shack for grilled fish.",
  },
  Neighborhood: {
    name: "Alfama, Graça, Campo de Ourique...",
    content: "What the area feels like, when to walk it, where to start.",
  },
  Street: {
    name: "Rua das Gaivotas, Rua de São Paulo, Travessa do Fala-Só...",
    content: "Why this block matters — shops, doors, the way the light hits.",
  },
  Vibe: {
    name: "Late-night Bairro Alto, Sunday morning in Santos...",
    content: "Paint the mood. The sounds, the smells, why it lingers.",
  },
  Tip: {
    name: "Avoid Tram 28 after 10am, buy a Viva Viagem from a kiosk...",
    content: "The one thing every visitor gets wrong that you'd fix.",
  },
  Hotel: {
    name: "Santa Clara 1728, The Lumiares, Palacio Belmonte...",
    content: "Who it's right for, what floor to ask for, the breakfast call.",
  },
};

interface LocalGuideFormProps {
  /** One or two home cities. When two are provided the form shows a toggle. */
  bases: HomeBase[];
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
  bases,
  onSubmit,
  onCancel,
  onEditHomeBase,
  isLoading,
}: LocalGuideFormProps) {
  const [activeBaseIdx, setActiveBaseIdx] = useState(0);
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("Restaurant");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  // Reset selected base if it falls out of range when bases shrink
  useEffect(() => {
    if (activeBaseIdx >= bases.length) setActiveBaseIdx(0);
  }, [bases.length, activeBaseIdx]);

  const base = bases[activeBaseIdx] ?? bases[0];
  const isNonPlace = NON_PLACE_TYPES.has(placeType);
  const copy = PLACEHOLDERS[placeType] ?? PLACEHOLDERS.Restaurant;
  const nameLabel = isNonPlace
    ? placeType === "Vibe"
      ? "Headline"
      : placeType === "Tip"
        ? "The tip, in one line"
        : "Name"
    : "Place name";
  const contentLabel = isNonPlace
    ? "Tell visitors what to know"
    : "Your insider tip";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!base) return;
    onSubmit({
      placeName,
      placeType,
      city: base.city,
      country: base.country,
      lat: base.lat,
      lng: base.lng,
      rating,
      content,
    });
  };

  if (!base) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-brand-card rounded-2xl ring-1 ring-brand-border p-5"
    >
      {/* Base-city header — with toggle when the user has two home cities */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-navy/5 ring-1 ring-brand-navy/15">
        <svg
          className="w-4 h-4 mt-0.5 text-brand-navy shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
        </svg>
        <div className="flex-1 min-w-0">
          {bases.length > 1 ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-navy/70 mb-1">
                Recommending for
              </p>
              <div className="flex gap-1 flex-wrap">
                {bases.map((b, i) => (
                  <button
                    key={`${b.city}|${b.country}`}
                    type="button"
                    onClick={() => setActiveBaseIdx(i)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold transition-colors",
                      i === activeBaseIdx
                        ? "bg-brand-navy text-parchment"
                        : "bg-brand-surface text-brand-text hover:bg-brand-navy/10"
                    )}
                  >
                    {b.city}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm font-semibold text-brand-navy">
              Recommending in {base.city}, {base.country}
            </p>
          )}
          <p className="text-[11px] text-brand-text-muted mt-1.5">
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
                  Manage home bases
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Category — grouped chips so non-place types like Vibe and Tip
          are discoverable without hiding food/drink behind a long list. */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">
          Category
        </label>
        <div className="space-y-2">
          {CATEGORY_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted mb-1">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.types.map((type) => (
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
          ))}
        </div>
      </div>

      {/* Headline / place name — label and copy shift by category */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          {nameLabel}
        </label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder={copy.name}
          required
          maxLength={100}
          className="w-full px-4 py-2.5 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy/30 text-brand-text"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          {isNonPlace ? "How strongly do you recommend this?" : "How much do you love it?"}
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
          {contentLabel}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={copy.content}
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
