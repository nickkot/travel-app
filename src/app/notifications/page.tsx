"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NotificationType = "follow" | "upvote" | "comment" | "badge" | "milestone";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  fromUser: string;
  fromUsername: string;
  time: string;
  read: boolean;
  linkHref: string;
}

const TYPE_ICONS: Record<NotificationType, string> = {
  follow: "\u{1F464}",
  upvote: "\u{2B06}\u{FE0F}",
  comment: "\u{1F4AC}",
  badge: "\u{1F3C5}",
  milestone: "\u{1F389}",
};

const TYPE_LABELS: Record<NotificationType, string> = {
  follow: "Follows",
  upvote: "Upvotes",
  comment: "Comments",
  badge: "Badges",
  milestone: "Milestones",
};

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "follow", message: "started following you", fromUser: "Nomad Nina", fromUsername: "nomad_nina", time: "2m ago", read: false, linkHref: "/profile/nomad_nina" },
  { id: "n2", type: "upvote", message: "upvoted your Oaxaca trip", fromUser: "Waypoint Sam", fromUsername: "waypoint_sam", time: "15m ago", read: false, linkHref: "/trips/1" },
  { id: "n3", type: "comment", message: "replied: \"the mezcal villages are unreal\"", fromUser: "Drift Walker", fromUsername: "drift_walker", time: "1h ago", read: false, linkHref: "/trips/1" },
  { id: "n4", type: "follow", message: "started following you", fromUser: "Sunset Sage", fromUsername: "sunset_sage", time: "3h ago", read: true, linkHref: "/profile/sunset_sage" },
  { id: "n5", type: "badge", message: "You earned the Hemisphere Hopper badge!", fromUser: "Stampy", fromUsername: "", time: "1d ago", read: true, linkHref: "/profile" },
  { id: "n6", type: "upvote", message: "upvoted your Nairobi rating", fromUser: "Atlas Explorer", fromUsername: "atlas_explorer", time: "2d ago", read: true, linkHref: "/ratings" },
  { id: "n7", type: "comment", message: "commented on your Japan trip: \"Ichiran is the GOAT\"", fromUser: "Nomad Nina", fromUsername: "nomad_nina", time: "2d ago", read: true, linkHref: "/trips/2" },
  { id: "n8", type: "milestone", message: "You've visited 10 countries! Keep exploring.", fromUser: "Stampy", fromUsername: "", time: "3d ago", read: true, linkHref: "/profile" },
  { id: "n9", type: "upvote", message: "upvoted your Rome review", fromUser: "Drift Walker", fromUsername: "drift_walker", time: "4d ago", read: true, linkHref: "/trips/3" },
  { id: "n10", type: "follow", message: "started following you", fromUser: "Trail Blazer", fromUsername: "trail_blazer", time: "5d ago", read: true, linkHref: "/profile/trail_blazer" },
  { id: "n11", type: "comment", message: "replied: \"adding Guadalajara to my list!\"", fromUser: "Sunset Sage", fromUsername: "sunset_sage", time: "5d ago", read: true, linkHref: "/trips/mx2" },
  { id: "n12", type: "badge", message: "You earned the Culinary Explorer badge!", fromUser: "Stampy", fromUsername: "", time: "1w ago", read: true, linkHref: "/profile" },
];

type FilterType = "all" | NotificationType;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = filter === "all"
    ? notifications
    : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "follow", label: "Follows" },
    { key: "upvote", label: "Upvotes" },
    { key: "comment", label: "Comments" },
    { key: "badge", label: "Badges" },
    { key: "milestone", label: "Milestones" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-brand-text">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-brand-text-muted mt-0.5">
              {unreadCount} unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="px-3 py-1.5 text-xs font-medium text-brand-navy hover:bg-brand-surface rounded-lg transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {filters.map((f) => {
          const count = f.key === "all"
            ? notifications.length
            : notifications.filter((n) => n.type === f.key).length;
          if (count === 0 && f.key !== "all") return null;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                filter === f.key
                  ? "bg-brand-navy text-parchment"
                  : "bg-brand-surface text-brand-text-secondary hover:text-brand-text border border-brand-border"
              )}
            >
              {f.label}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="space-y-1">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-brand-text-muted">
            <p className="text-3xl mb-2">{"\u{1F514}"}</p>
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          filtered.map((n) => (
            <Link
              key={n.id}
              href={n.linkHref}
              onClick={() => markRead(n.id)}
              className={cn(
                "flex items-start gap-3 px-4 py-3.5 rounded-xl transition-colors group",
                !n.read
                  ? "bg-brand-navy/[0.04] hover:bg-brand-navy/[0.07]"
                  : "hover:bg-brand-surface"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 mt-0.5",
                !n.read ? "bg-brand-navy/10" : "bg-brand-surface"
              )}>
                {TYPE_ICONS[n.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-brand-text leading-snug">
                  <span className="font-semibold">{n.fromUser}</span>{" "}
                  <span className="text-brand-text-secondary">{n.message}</span>
                </p>
                <span className="text-[11px] text-brand-text-muted mt-0.5 block">
                  {n.time}
                </span>
              </div>

              {/* Unread indicator */}
              {!n.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-brand-pin-past shrink-0 mt-2" />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
