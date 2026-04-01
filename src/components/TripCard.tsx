"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface TripCardProps {
  id: string;
  title: string;
  coverPhotoUrl: string | null;
  destinations: { city: string; country: string }[];
  startDate: string | null;
  endDate: string | null;
  status: string;
  isFuture: boolean;
  upvoteCount: number;
  authorName: string;
  authorUsername: string;
  photoCount: number;
  reviewCount: number;
}

export function TripCard({
  id,
  title,
  coverPhotoUrl,
  destinations,
  startDate,
  endDate,
  status,
  isFuture,
  upvoteCount,
  authorName,
  authorUsername,
  photoCount,
  reviewCount,
}: TripCardProps) {
  const statusColors = {
    PLANNED: "bg-accent-cool/20 text-accent-cool",
    ACTIVE: "bg-green-500/20 text-green-400",
    COMPLETED: "bg-accent/20 text-accent",
  };

  return (
    <Link href={`/trips/${id}`}>
      <div className="card-hover bg-surface rounded-xl border border-border overflow-hidden">
        {/* Cover image */}
        <div className="relative h-48 bg-surface-hover">
          {coverPhotoUrl ? (
            <img
              src={coverPhotoUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground/20">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
          {/* Status badge */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || statusColors.PLANNED}`}
          >
            {status === "COMPLETED"
              ? "Visited"
              : status === "ACTIVE"
                ? "Traveling"
                : isFuture
                  ? "Upcoming"
                  : "Planned"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>

          {/* Destinations */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {destinations.slice(0, 3).map((d, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full bg-surface-hover text-foreground/70"
              >
                {d.city}, {d.country}
              </span>
            ))}
            {destinations.length > 3 && (
              <span className="text-xs text-foreground/50">
                +{destinations.length - 3} more
              </span>
            )}
          </div>

          {/* Dates */}
          {startDate && (
            <p className="text-sm text-foreground/50 mb-3">
              {formatDate(startDate)}
              {endDate && ` — ${formatDate(endDate)}`}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                {authorName.charAt(0)}
              </div>
              <span className="text-sm text-foreground/70">
                @{authorUsername}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-foreground/50">
              {photoCount > 0 && <span>{photoCount} photos</span>}
              {reviewCount > 0 && <span>{reviewCount} reviews</span>}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                {upvoteCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
