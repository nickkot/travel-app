"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_ICONS } from "@/lib/tierStyles";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  tier: number;
  compassMiles: number;
}

// Demo results for when API is unavailable
const DEMO_USERS: SearchResult[] = [
  { id: "fr1", name: "Nomad Nina", username: "nomad_nina", avatarUrl: null, tier: 3, compassMiles: 7200 },
  { id: "fr2", name: "Drift Walker", username: "drift_walker", avatarUrl: null, tier: 2, compassMiles: 2800 },
  { id: "fr3", name: "Waypoint Sam", username: "waypoint_sam", avatarUrl: null, tier: 4, compassMiles: 18500 },
  { id: "fr4", name: "Atlas Explorer", username: "atlas_explorer", avatarUrl: null, tier: 2, compassMiles: 3200 },
  { id: "fr5", name: "Sunset Sage", username: "sunset_sage", avatarUrl: null, tier: 3, compassMiles: 5400 },
  { id: "fr6", name: "Route Runner", username: "route_runner", avatarUrl: null, tier: 1, compassMiles: 800 },
];

function SearchResultRow({ user: u, isMe }: { user: SearchResult; isMe: boolean }) {
  const [following, setFollowing] = useState(false);
  const tierDef = TIER_THRESHOLDS.find((t) => t.tier === u.tier);
  const tierStyle = TIER_BADGE_STYLES[u.tier] || TIER_BADGE_STYLES[1];

  const handleFollow = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowing((prev) => !prev);
  }, []);

  return (
    <Link
      href={isMe ? "/profile" : `/profile/${u.username}`}
      className="flex items-center gap-3 p-3 rounded-2xl ring-1 ring-brand-border hover:bg-brand-surface transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy font-bold text-sm shrink-0">
        {u.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-brand-text truncate">
            {u.name}
          </span>
          {tierDef && (
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none shrink-0",
                tierStyle.bg,
                tierStyle.text
              )}
            >
              {TIER_ICONS[tierDef.icon]}
            </span>
          )}
        </div>
        <span className="text-xs text-brand-text-muted">@{u.username}</span>
      </div>
      {!isMe && (
        <button
          onClick={handleFollow}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-press shrink-0",
            following
              ? "border border-brand-border text-brand-text hover:bg-brand-surface"
              : "bg-brand-navy text-parchment hover:bg-brand-navy-hover"
          )}
        >
          {following ? "Following" : "Follow"}
        </button>
      )}
    </Link>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      // Try API first, fall back to demo filter
      fetch(`/api/users/search?q=${encodeURIComponent(query.trim())}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data.users || []);
          setSearched(true);
        })
        .catch(() => {
          // Fallback: filter demo data
          const q = query.toLowerCase();
          const filtered = DEMO_USERS.filter(
            (u) =>
              u.name.toLowerCase().includes(q) ||
              u.username.toLowerCase().includes(q)
          );
          setResults(filtered);
          setSearched(true);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-lg mx-auto px-4 pt-16 md:pt-20 pb-20">
      {/* Close button */}
      <div className="flex items-center justify-end mb-2">
        <Link
          href="/profile"
          className="p-2 rounded-lg text-brand-text-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>
      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search travelers..."
          className="w-full pl-11 pr-4 py-3 bg-brand-bg ring-1 ring-brand-border rounded-2xl focus:outline-none focus:ring-brand-navy transition-all text-brand-text placeholder:text-brand-text-muted"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((u) => (
            <SearchResultRow key={u.id} user={u} isMe={user?.username === u.username} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!searched && !query && (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-brand-text-muted/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-brand-text-muted">Search for travelers by name or username</p>
        </div>
      )}

      {/* No results */}
      {searched && results.length === 0 && query && (
        <div className="text-center py-16">
          <p className="text-brand-text-muted">No travelers found matching &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
