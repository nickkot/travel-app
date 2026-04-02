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
  photoCount,
  reviewCount,
}: TripCardProps) {
  const statusLabel =
    status === "COMPLETED"
      ? "Visited"
      : status === "ACTIVE"
        ? "Traveling"
        : isFuture
          ? "Upcoming"
          : "Planned";

  return (
    <Link href={`/trips/${id}`}>
      <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover">
        {/* Photo or gradient fallback */}
        {coverPhotoUrl ? (
          <img
            src={coverPhotoUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-muted to-brand-pin-past/60" />
        )}

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white/90">
            {statusLabel}
          </span>
        </div>

        {/* Stats — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {photoCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/15 backdrop-blur-sm text-white/80 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              {photoCount}
            </span>
          )}
          {upvoteCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/15 backdrop-blur-sm text-white/80 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
              {upvoteCount}
            </span>
          )}
        </div>

        {/* Bottom content — overlaid on scrim */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Dates */}
          {startDate && (
            <p className="text-[11px] font-medium text-white/60 uppercase tracking-wider">
              {formatDate(startDate)}
              {endDate && ` — ${formatDate(endDate)}`}
            </p>
          )}

          {/* Title */}
          <h3 className="font-serif font-bold text-lg text-white leading-tight">
            {title}
          </h3>

          {/* Destination pills */}
          <div className="flex flex-wrap gap-1.5">
            {destinations.slice(0, 3).map((d, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/15 backdrop-blur-sm text-white/80"
              >
                {d.city}, {d.country}
              </span>
            ))}
            {destinations.length > 3 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/15 backdrop-blur-sm text-white/60">
                +{destinations.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
