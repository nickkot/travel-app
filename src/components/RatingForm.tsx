"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingFormProps {
  city: string;
  country: string;
  onSubmit: (data: {
    overall: number;
    eat: number;
    explore: number;
    connect: number;
    live: number;
    review: string;
  }) => void;
  onClose: () => void;
}

function StarPicker({
  value,
  onChange,
  size = "lg",
}: {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "lg";
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  const starSize = size === "lg" ? "text-3xl" : "text-xl";

  return (
    <div className="flex items-center gap-1">
      {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => {
        const isHalf = star % 1 !== 0;
        const fullStar = Math.ceil(star);
        // Only render on full stars (we handle halves via left/right click regions)
        if (isHalf) return null;

        const filled = display >= fullStar;
        const halfFilled = !filled && display >= fullStar - 0.5;

        return (
          <button
            key={fullStar}
            type="button"
            className={cn("relative transition-transform hover:scale-110", starSize)}
            onMouseEnter={() => setHover(fullStar)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              // Toggle between full and half on re-click
              if (value === fullStar) {
                onChange(fullStar - 0.5);
              } else if (value === fullStar - 0.5) {
                onChange(0);
              } else {
                onChange(fullStar);
              }
            }}
          >
            <span className={filled ? "text-brand-pin-past" : halfFilled ? "text-brand-pin-past" : "text-brand-text-muted/25"}>
              {filled ? "\u{2605}" : halfFilled ? "\u{272F}" : "\u{2606}"}
            </span>
          </button>
        );
      })}
      {value > 0 && (
        <span className="text-sm font-bold text-brand-text ml-2">{value.toFixed(1)}</span>
      )}
    </div>
  );
}

function ThemeSlider({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg w-7 text-center">{icon}</span>
      <span className="text-sm font-medium text-brand-text w-16">{label}</span>
      <div className="flex-1">
        <StarPicker value={value} onChange={onChange} size="sm" />
      </div>
    </div>
  );
}

export function RatingForm({ city, country, onSubmit, onClose }: RatingFormProps) {
  const [overall, setOverall] = useState(0);
  const [eat, setEat] = useState(0);
  const [explore, setExplore] = useState(0);
  const [connect, setConnect] = useState(0);
  const [live, setLive] = useState(0);
  const [review, setReview] = useState("");

  const canSubmit = overall > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ overall, eat, explore, connect, live, review });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-serif text-brand-text">
            Rate {city}
          </h3>
          <p className="text-xs text-brand-text-muted">{country}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-brand-text-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Overall rating */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">Overall</label>
        <StarPicker value={overall} onChange={setOverall} />
        <p className="text-[10px] text-brand-text-muted mt-1">Tap a star. Tap again for half star. Tap once more to clear.</p>
      </div>

      {/* Theme ratings */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-brand-text">Themes</label>
        <ThemeSlider label="Eat" icon={"\u{1F37D}\u{FE0F}"} value={eat} onChange={setEat} />
        <ThemeSlider label="Explore" icon={"\u{1F9ED}"} value={explore} onChange={setExplore} />
        <ThemeSlider label="Connect" icon={"\u{1F91D}"} value={connect} onChange={setConnect} />
        <ThemeSlider label="Live" icon={"\u{1F3E0}"} value={live} onChange={setLive} />
      </div>

      {/* Review text */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">
          Quick take <span className="text-brand-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="What's your one-liner on this place?"
          rows={2}
          maxLength={280}
          className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors resize-none text-sm text-brand-text"
        />
        <p className="text-[10px] text-brand-text-muted text-right mt-0.5">{review.length}/280</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 bg-brand-navy text-parchment font-semibold rounded-lg hover:bg-brand-navy-hover transition-colors disabled:opacity-40 btn-press"
      >
        Post Rating
      </button>
    </form>
  );
}
