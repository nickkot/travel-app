"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export interface FeedItemProps {
  type: "trip" | "review" | "journal";
  id: string;
  tripId?: string;
  authorName: string;
  authorUsername: string;
  coAuthorName?: string;
  coAuthorUsername?: string;
  caption: string;
  photoUrl: string;
  location?: string;
  rating?: number;
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
  photoUrl,
  location,
  rating,
  likeCount,
  comments,
  createdAt,
}: FeedItemProps) {
  const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likes, setLikes] = useState(likeCount);

  const href = type === "trip" ? `/trips/${id}` : `/trips/${tripId || id}`;
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="border-b border-brand-border pb-4">
      {/* Header — author + co-author + location */}
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
            <div className="text-xs text-brand-text-muted">{location}</div>
          )}
        </div>
        <span className="text-[10px] text-brand-text-muted shrink-0">
          {formatDate(createdAt)}
        </span>
      </div>

      {/* Photo — full width, tappable */}
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] bg-brand-surface overflow-hidden">
          <img
            src={photoUrl}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Rating overlay for reviews */}
          {type === "review" && rating && (
            <div className="absolute bottom-3 left-3 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${star <= rating ? "text-brand-pin-past" : "text-white/30"}`}
                >
                  {"\u{2605}"}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Action bar */}
      <div className="flex items-center gap-4 px-4 pt-3">
        <button onClick={handleLike} className="transition-transform active:scale-125">
          <svg
            className={`w-6 h-6 ${liked ? "text-red-500 fill-red-500" : "text-brand-text"}`}
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
        <button>
          <svg className="w-6 h-6 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
        </button>
        <button className="ml-auto">
          <svg className="w-6 h-6 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>

      {/* Likes */}
      <div className="px-4 pt-1">
        <span className="text-sm font-semibold text-brand-text">
          {likes.toLocaleString()} likes
        </span>
      </div>

      {/* Caption */}
      <div className="px-4 pt-1">
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

      {/* Comments */}
      {comments.length > 0 && (
        <div className="px-4 pt-1.5 space-y-0.5">
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
      )}
    </div>
  );
}
