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
  type: "trip" | "review" | "journal" | "rating";
  id: string;
  tripId?: string;
  authorName: string;
  authorUsername: string;
  coAuthorName?: string;
  coAuthorUsername?: string;
  caption: string;
  photos?: string[];
  location?: string;
  countryFlag?: string;
  countryCode?: string;
  route?: string[];
  stats?: { days: number; cities: number; photos: number; km: number };
  timeline?: TimelineDay[];
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
  photos = [],
  location,
  countryFlag,
  countryCode,
  route = [],
  stats,
  timeline = [],
  destinationRating,
  likeCount,
  comments,
  createdAt,
}: FeedItemProps) {
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [upvoted, setUpvoted] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const href = type === "trip" ? `/trips/${id}` : `/trips/${tripId || id}`;
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setLikes((prev) => (upvoted ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-brand-card rounded-[14px] border border-brand-border overflow-hidden">
      {/* Header */}
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
          {location && (
            <span className="text-[10px] text-brand-text-muted">{location}</span>
          )}
        </div>
        <span className="text-[10px] text-brand-text-muted shrink-0">
          {formatDate(createdAt)}
        </span>
      </div>

      {/* Photo carousel (optional) */}
      {photos.length > 0 && (
        <div className="relative">
          <Link href={href} className="block">
            <img
              src={photos[photoIndex]}
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

          {/* Carousel dots + arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => setPhotoIndex((prev) => Math.max(0, prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 transition-colors"
                style={{ display: photoIndex === 0 ? "none" : "flex" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => setPhotoIndex((prev) => Math.min(photos.length - 1, prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 transition-colors"
                style={{ display: photoIndex === photos.length - 1 ? "none" : "flex" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === photoIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

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

      {/* Destination rating */}
      {destinationRating && (
        <div className="px-4 mt-2.5">
          <RatingStrip overall={destinationRating.overall} aspects={destinationRating.aspects} />
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

      {/* Action bar — upvote, reply, bookmark */}
      <div className="flex items-center gap-4 px-4 pt-2.5">
        {/* Upvote (compass arrow) */}
        <button onClick={handleUpvote} className="flex items-center gap-1 transition-transform active:scale-110">
          <svg
            className={`w-5 h-5 ${upvoted ? "text-brand-pin-past" : "text-brand-text"}`}
            fill={upvoted ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={upvoted ? 0 : 1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
          </svg>
          <span className={`text-xs font-semibold ${upvoted ? "text-brand-pin-past" : "text-brand-text"}`}>
            {likes}
          </span>
        </button>

        {/* Reply */}
        <button className="flex items-center gap-1">
          <svg className="w-5 h-5 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <span className="text-xs text-brand-text-muted">{comments.length}</span>
        </button>

        {/* Bookmark */}
        <button onClick={() => setSaved(!saved)} className="ml-auto transition-transform active:scale-110">
          <svg
            className={`w-5 h-5 ${saved ? "text-brand-navy fill-brand-navy" : "text-brand-text"}`}
            fill={saved ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
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
