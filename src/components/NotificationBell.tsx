"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "follow" | "upvote" | "comment" | "badge";
  message: string;
  fromUser: string;
  fromUsername: string;
  time: string;
  read: boolean;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "follow", message: "started following you", fromUser: "Nomad Nina", fromUsername: "nomad_nina", time: "2m ago", read: false },
  { id: "n2", type: "upvote", message: "upvoted your Oaxaca trip", fromUser: "Waypoint Sam", fromUsername: "waypoint_sam", time: "15m ago", read: false },
  { id: "n3", type: "comment", message: "replied: \"the mezcal villages are unreal\"", fromUser: "Drift Walker", fromUsername: "drift_walker", time: "1h ago", read: false },
  { id: "n4", type: "follow", message: "started following you", fromUser: "Sunset Sage", fromUsername: "sunset_sage", time: "3h ago", read: true },
  { id: "n5", type: "badge", message: "You earned the Hemisphere Hopper badge!", fromUser: "Stampy", fromUsername: "", time: "1d ago", read: true },
  { id: "n6", type: "upvote", message: "upvoted your Nairobi rating", fromUser: "Atlas Explorer", fromUsername: "atlas_explorer", time: "2d ago", read: true },
];

const TYPE_ICONS: Record<string, string> = {
  follow: "\u{1F464}",
  upvote: "\u{2B06}\u{FE0F}",
  comment: "\u{1F4AC}",
  badge: "\u{1F3C5}",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-lg text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-pin-past text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-brand-bg rounded-2xl ring-1 ring-brand-border shadow-xl overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
            <span className="text-sm font-semibold text-brand-text">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-brand-navy hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <Link
                key={n.id}
                href={n.fromUsername ? `/profile/${n.fromUsername}` : "/profile"}
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((x) => (x.id === n.id ? { ...x, read: true } : x))
                  );
                  setOpen(false);
                }}
                className={`flex items-start gap-3 px-4 py-3 hover:bg-brand-surface transition-colors ${
                  !n.read ? "bg-brand-navy/[0.03]" : ""
                }`}
              >
                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-sm shrink-0 mt-0.5">
                  {TYPE_ICONS[n.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-text">
                    <span className="font-semibold">{n.fromUser}</span>{" "}
                    <span className="text-brand-text-secondary">{n.message}</span>
                  </p>
                  <span className="text-[10px] text-brand-text-muted">{n.time}</span>
                </div>

                {/* Unread dot */}
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-brand-pin-past shrink-0 mt-2" />
                )}
              </Link>
            ))}
          </div>

          {/* View all link */}
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block text-center px-4 py-3 border-t border-brand-border text-xs font-medium text-brand-navy hover:bg-brand-surface transition-colors"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
