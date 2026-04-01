"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface FeedItemProps {
  type: "trip" | "review" | "journal";
  id: string;
  tripId?: string;
  authorName: string;
  authorUsername: string;
  title: string;
  preview: string;
  coverUrl?: string | null;
  destinations?: string[];
  rating?: number;
  upvoteCount: number;
  commentCount: number;
  createdAt: string;
}

export function FeedItem({
  type,
  id,
  tripId,
  authorName,
  authorUsername,
  title,
  preview,
  coverUrl,
  destinations,
  rating,
  upvoteCount,
  commentCount,
  createdAt,
}: FeedItemProps) {
  const href =
    type === "trip" ? `/trips/${id}` : `/trips/${tripId || id}`;

  const typeLabel =
    type === "trip"
      ? "shared a trip"
      : type === "review"
        ? "wrote a review"
        : "wrote in their journal";

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden card-hover">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
          {authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${authorUsername}`}
              className="font-medium text-sm hover:text-accent transition-colors"
            >
              {authorName}
            </Link>
            <span className="text-xs text-foreground/40">{typeLabel}</span>
          </div>
          <span className="text-xs text-foreground/40">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {/* Cover */}
      {coverUrl && (
        <Link href={href}>
          <div className="relative h-52">
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="px-4 py-3">
        <Link href={href}>
          <h3 className="font-semibold mb-1 hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>

        {/* Destinations */}
        {destinations && destinations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {destinations.map((d, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full bg-surface-hover text-foreground/60"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        {type === "review" && rating && (
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= rating ? "text-accent fill-accent" : "text-foreground/20"}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        )}

        <p className="text-sm text-foreground/60 line-clamp-2">{preview}</p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 flex items-center gap-4 text-xs text-foreground/40">
        <button className="flex items-center gap-1 hover:text-accent transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          {upvoteCount}
        </button>
        <button className="flex items-center gap-1 hover:text-accent transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
          {commentCount}
        </button>
        <button className="flex items-center gap-1 hover:text-accent transition-colors ml-auto">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}
