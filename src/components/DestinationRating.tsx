"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AspectRating {
  aspect: string;
  icon: string;
  rating: number; // 0.5 to 5.0
}

export interface DestinationRatingProps {
  id: string;
  city: string;
  country: string;
  countryFlag: string;
  overallRating: number;
  aspects: AspectRating[];
  review?: string;
  authorName: string;
  authorUsername: string;
  likeCount: number;
  createdAt: string;
}

function HalfStars({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };
  return (
    <div className={cn("flex items-center gap-px", sizes[size])}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span
            key={star}
            className={cn(
              filled
                ? "text-brand-pin-past"
                : half
                  ? "text-brand-pin-past"
                  : "text-brand-text-muted/25"
            )}
          >
            {filled ? "\u{2605}" : half ? "\u{272F}" : "\u{2606}"}
          </span>
        );
      })}
    </div>
  );
}

function AspectBar({ aspect }: { aspect: AspectRating }) {
  const pct = (aspect.rating / 5) * 100;
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm w-5 text-center">{aspect.icon}</span>
      <span className="text-xs text-brand-text-secondary w-20 truncate">
        {aspect.aspect}
      </span>
      <div className="flex-1 h-2 bg-brand-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-pin-past rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-brand-text w-7 text-right">
        {aspect.rating.toFixed(1)}
      </span>
    </div>
  );
}

export function DestinationRating({
  city,
  country,
  countryFlag,
  overallRating,
  aspects,
  review,
  authorName,
  authorUsername,
  likeCount,
  createdAt,
}: DestinationRatingProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-brand-card rounded-[14px] border border-brand-border p-5">
      {/* Header: destination + overall score */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{countryFlag}</span>
            <h3 className="font-serif font-bold text-lg text-brand-text">{city}</h3>
          </div>
          <p className="text-sm text-brand-text-secondary mt-0.5">{country}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-serif font-bold text-brand-pin-past leading-none">
            {overallRating.toFixed(1)}
          </div>
          <HalfStars rating={overallRating} size="sm" />
        </div>
      </div>

      {/* Aspect ratings */}
      <div className="space-y-2 mb-3">
        {aspects.map((a) => (
          <AspectBar key={a.aspect} aspect={a} />
        ))}
      </div>

      {/* Review text */}
      {review && (
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-3 italic">
          &ldquo;{review}&rdquo;
        </p>
      )}

      {/* Footer: author + like */}
      <div className="flex items-center justify-between pt-3 border-t border-brand-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-[10px] font-bold">
            {authorName.charAt(0)}
          </div>
          <Link
            href={`/profile/${authorUsername}`}
            className="text-sm font-medium text-brand-text hover:text-brand-navy"
          >
            {authorName}
          </Link>
          <span className="text-xs text-brand-text-muted">{createdAt}</span>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm transition-transform active:scale-110"
        >
          <svg
            className={cn("w-4.5 h-4.5", liked ? "text-red-500 fill-red-500" : "text-brand-text-muted")}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={liked ? 0 : 1.5}
            fill={liked ? "currentColor" : "none"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className={cn("text-xs font-medium", liked ? "text-red-500" : "text-brand-text-muted")}>
            {likes}
          </span>
        </button>
      </div>
    </div>
  );
}
