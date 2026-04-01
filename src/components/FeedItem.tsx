"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { RatingStrip, type RatingStripAspect } from "./RatingStrip";

export interface TimelineDay {
  day: number;
  highlight: string;
  emoji: string;
}

export interface FeedItemProps {
  type: "trip" | "review" | "journal";
  id: string;
  tripId?: string;
  authorName: string;
  authorUsername: string;
  coAuthorName?: string;
  coAuthorUsername?: string;
  caption: string;
  heroPhoto: string;
  photos?: string[];
  location?: string;
  countryFlag?: string;
  countryCode?: string;
  route?: string[];
  stats?: { days: number; cities: number; photos: number; km: number };
  timeline?: TimelineDay[];
  rating?: number;
  destinationRating?: { overall: number; aspects: RatingStripAspect[] };
  likeCount: number;
  comments: { username: string; text: string }[];
  createdAt: string;
}

export function FeedItem({
  type,
  id,
  tripId,
  authorName,
  authorUsername,
  coAuthorName,
  coAuthorUsername,
  caption,
  heroPhoto,
  photos = [],
  location,
  countryFlag,
  countryCode,
  route = [],
  stats,
  timeline = [],
  rating,
  destinationRating,
  likeCount,
  comments,
  createdAt,
}: FeedItemProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const href = type === "trip" ? `/trips/${id}` : `/trips/${tripId || id}`;
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-brand-card rounded-[14px] border border-brand-border overflow-hidden">
      {/* Header — author + co-author */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy font-bold text-xs">
          {authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-sm">
            <Link
              href={`/profile/${authorUsername}`}
              className="font-semibold text-brand-text hover:text-brand-navy"
            >
              {authorName}
            </Link>
            {coAuthorName && coAuthorUsername && (
              <>
                <span className="text-brand-text-muted">with</span>
                <Link
                  href={`/profile/${coAuthorUsername}`}
                  className="font-semibold text-brand-text hover:text-brand-navy"
                >
                  {coAuthorName}
                </Link>
              </>
            )}
          </div>
          <span className="text-[10px] text-brand-text-muted">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {/* Hero photo with passport stamp overlay */}
      <div className="relative">
        <Link href={href} className="block">
          <img
            src={heroPhoto}
            alt={caption}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        </Link>

        {/* Country flag tag */}
        {countryFlag && countryCode && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <span className="text-sm leading-none">{countryFlag}</span>
            <span className="text-[11px] font-medium text-white/90">{countryCode}</span>
          </div>
        )}

        {/* Rating overlay for reviews */}
        {type === "review" && rating && (
          <div className="absolute bottom-3 left-3 bg-brand-bg/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${star <= rating ? "text-brand-pin-past" : "text-brand-text-muted/30"}`}
              >
                {"\u{2605}"}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Route strip */}
      {route.length > 0 && (
        <div className="px-4 pt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {route.map((city, i) => (
            <span key={i} className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-semibold text-brand-navy whitespace-nowrap">{city}</span>
              {i < route.length - 1 && (
                <svg className="w-3 h-3 text-brand-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Stats bar */}
      {stats && (
        <div className="mx-4 mt-2.5 flex items-center justify-between bg-brand-surface rounded-lg px-3 py-2">
          <StatPill icon={"\u{1F4C5}"} value={`${stats.days}d`} label="days" />
          <div className="w-px h-5 bg-brand-border" />
          <StatPill icon={"\u{1F3D9}\u{FE0F}"} value={String(stats.cities)} label="cities" />
          <div className="w-px h-5 bg-brand-border" />
          <StatPill icon={"\u{1F4F8}"} value={String(stats.photos)} label="photos" />
          <div className="w-px h-5 bg-brand-border" />
          <StatPill icon={"\u{2708}\u{FE0F}"} value={`${(stats.km / 1000).toFixed(1)}k`} label="km" />
        </div>
      )}

      {/* Destination rating strip */}
      {destinationRating && (
        <div className="px-4 mt-2.5">
          <RatingStrip overall={destinationRating.overall} aspects={destinationRating.aspects} />
        </div>
      )}

      {/* Photo mosaic gallery */}
      {photos.length > 0 && (
        <div className="px-4 mt-2.5">
          <div
            className={`grid gap-1.5 rounded-lg overflow-hidden ${
              photos.length === 1
                ? "grid-cols-1"
                : photos.length === 2
                  ? "grid-cols-2"
                  : photos.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2"
            }`}
          >
            {(showGallery ? photos : photos.slice(0, 4)).map((url, i) => (
              <div
                key={i}
                className={`relative ${photos.length === 3 && i === 0 ? "row-span-2" : ""}`}
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className={`w-full object-cover rounded-sm ${
                    photos.length === 3 && i === 0 ? "h-full" : "aspect-square"
                  }`}
                  loading="lazy"
                />
                {/* +N overlay on last visible photo */}
                {!showGallery && i === 3 && photos.length > 4 && (
                  <button
                    onClick={() => setShowGallery(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-sm"
                  >
                    <span className="text-white font-bold text-lg">+{photos.length - 4}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          {photos.length > 4 && showGallery && (
            <button
              onClick={() => setShowGallery(false)}
              className="text-xs text-brand-text-muted mt-1.5 hover:text-brand-text"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {/* Mini trip timeline */}
      {timeline.length > 0 && (
        <div className="px-4 mt-2.5">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="text-xs font-medium text-brand-navy flex items-center gap-1"
          >
            <span>{"\u{1F4CB}"}</span>
            {showTimeline ? "Hide timeline" : `View ${timeline.length}-day timeline`}
          </button>
          {showTimeline && (
            <div className="mt-2 ml-1 border-l-2 border-brand-pin-past/30 pl-3 space-y-2">
              {timeline.map((day) => (
                <div key={day.day} className="flex items-start gap-2 relative">
                  <div className="absolute -left-[17px] top-0.5 w-2 h-2 rounded-full bg-brand-pin-past" />
                  <span className="text-[10px] font-bold text-brand-pin-past shrink-0 mt-0.5">
                    D{day.day}
                  </span>
                  <span className="text-xs text-brand-text-secondary">
                    {day.emoji} {day.highlight}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Caption */}
      <div className="px-4 pt-2.5">
        <p className="text-sm text-brand-text">
          <Link
            href={`/profile/${authorUsername}`}
            className="font-semibold hover:text-brand-navy"
          >
            {authorName}
          </Link>{" "}
          <span className="text-brand-text-secondary">{caption}</span>
        </p>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-4 px-4 pt-2.5">
        <button onClick={handleLike} className="transition-transform active:scale-125">
          <svg
            className={`w-5.5 h-5.5 ${liked ? "text-red-500 fill-red-500" : "text-brand-text"}`}
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
        </button>
        <span className="text-xs font-semibold text-brand-text">{likes.toLocaleString()}</span>
        <button>
          <svg className="w-5.5 h-5.5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
        </button>
        <button className="ml-auto">
          <svg className="w-5.5 h-5.5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>

      {/* Comments */}
      <div className="px-4 pt-1.5 pb-4 space-y-0.5">
        {comments.length > 2 && !showAllComments && (
          <button
            onClick={() => setShowAllComments(true)}
            className="text-xs text-brand-text-muted hover:text-brand-text"
          >
            View all {comments.length} comments
          </button>
        )}
        {visibleComments.map((c, i) => (
          <p key={i} className="text-sm text-brand-text">
            <span className="font-semibold">{c.username}</span>{" "}
            <span className="text-brand-text-secondary">{c.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function StatPill({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs">{icon}</span>
      <span className="text-xs font-bold text-brand-text">{value}</span>
      <span className="text-[10px] text-brand-text-muted">{label}</span>
    </div>
  );
}
