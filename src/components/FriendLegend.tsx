"use client";

import { useState } from "react";
import type { FriendData } from "@/types";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_ICONS } from "@/lib/tierStyles";
import { BadgeStrip } from "./BadgeStrip";
import { cn } from "@/lib/utils";

interface FriendLegendProps {
  friends: FriendData[];
  selectedFriendIds: string[];
  onToggleFriend: (friendId: string) => void;
}

export function FriendLegend({
  friends,
  selectedFriendIds,
  onToggleFriend,
}: FriendLegendProps) {
  const selectedSet = new Set(selectedFriendIds);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="text-xs text-brand-text-muted mb-2">Friends&apos; Travels</div>

      {/* Your pins legend */}
      <div className="flex items-center gap-2 pb-2 border-b border-brand-border">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-pin-past" />
        <span className="text-sm text-brand-text font-medium">You</span>
      </div>

      {/* Friend toggles */}
      {friends.map((friend) => {
        const isSelected = selectedSet.has(friend.id);
        const isExpanded = expandedId === friend.id;
        const tierDef = TIER_THRESHOLDS.find((t) => t.tier === friend.tier);
        const tierStyle = TIER_BADGE_STYLES[friend.tier] || TIER_BADGE_STYLES[1];

        return (
          <div key={friend.id}>
            <div className="flex items-start gap-2.5 w-full">
              {/* Toggle checkbox */}
              <button
                onClick={() => onToggleFriend(friend.id)}
                className="mt-0.5 shrink-0"
              >
                <div
                  className="w-3 h-3 rounded-full border-2 transition-all flex items-center justify-center"
                  style={{
                    borderColor: friend.color,
                    backgroundColor: isSelected ? friend.color : "transparent",
                  }}
                >
                  {isSelected && (
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06L4.25 7.22l4.97-4.94a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Name + tier + stats (clickable to expand badges) */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : friend.id)}
                className="flex-1 min-w-0 text-left"
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: isSelected ? friend.color : undefined }}
                  >
                    {friend.name}
                  </span>
                  {tierDef && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none",
                        tierStyle.bg,
                        tierStyle.text
                      )}
                    >
                      {TIER_ICONS[tierDef.icon]} {tierDef.name}
                    </span>
                  )}
                </div>
                <div className="text-xs text-brand-text-muted mt-0.5">
                  {friend.pins.length} places
                  {friend.earnedBadges.length > 0 && (
                    <> &middot; {friend.earnedBadges.length} badge{friend.earnedBadges.length !== 1 ? "s" : ""}</>
                  )}
                </div>
              </button>
            </div>

            {/* Expandable badge strip */}
            {isExpanded && friend.earnedBadges.length > 0 && (
              <div className="ml-5.5 mt-1.5 pl-2 border-l-2 border-brand-border">
                <BadgeStrip earnedBadges={friend.earnedBadges} />
              </div>
            )}
          </div>
        );
      })}

      {/* Shared countries legend */}
      <div className="pt-2 border-t border-brand-border space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "rgba(180, 150, 210, 0.85)" }} />
          <span className="text-xs text-brand-text-muted">Both visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "rgba(160, 140, 200, 0.7)" }} />
          <span className="text-xs text-brand-text-muted">Friends only</span>
        </div>
      </div>
    </div>
  );
}
