"use client";

import { formatDate } from "@/lib/utils";

interface JournalEntryProps {
  id: string;
  content: string;
  date: string;
  locationCity?: string | null;
  visibility: string;
  upvoteCount: number;
  authorName: string;
}

export function JournalEntry({
  content,
  date,
  locationCity,
  upvoteCount,
  authorName,
}: JournalEntryProps) {
  return (
    <div className="border-l-2 border-accent/30 pl-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <time className="text-sm font-medium text-accent">
          {formatDate(date)}
        </time>
        {locationCity && (
          <span className="text-xs text-foreground/50 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {locationCity}
          </span>
        )}
      </div>
      <div className="prose prose-invert prose-sm max-w-none">
        <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-foreground/40">
        <span>{authorName}</span>
        <button className="flex items-center gap-1 hover:text-accent transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          {upvoteCount}
        </button>
      </div>
    </div>
  );
}
