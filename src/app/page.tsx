"use client";

import { useState, useCallback } from "react";
import { Globe } from "@/components/Globe";
import { FriendLegend } from "@/components/FriendLegend";
import { DEMO_FRIENDS } from "@/data/demoFriends";
import type { GlobePin, GlobeMode } from "@/types";

// Demo data for the globe
const DEMO_PAST_PINS: GlobePin[] = [
  { id: "1", lat: 17.0654, lng: -96.7236, city: "Oaxaca", country: "Mexico", type: "past" },
  { id: "2", lat: 35.6762, lng: 139.6503, city: "Tokyo", country: "Japan", type: "past" },
  { id: "3", lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy", type: "past" },
  { id: "4", lat: -33.8688, lng: 151.2093, city: "Sydney", country: "Australia", type: "past" },
  { id: "5", lat: 48.8566, lng: 2.3522, city: "Paris", country: "France", type: "past" },
  { id: "6", lat: 13.7563, lng: 100.5018, city: "Bangkok", country: "Thailand", type: "past" },
  { id: "7", lat: -13.1631, lng: -72.545, city: "Cusco", country: "Peru", type: "past" },
  { id: "8", lat: 28.6139, lng: 77.209, city: "Delhi", country: "India", type: "past" },
  { id: "9", lat: 55.7558, lng: 37.6173, city: "Moscow", country: "Russia", type: "past" },
  { id: "10", lat: -1.2921, lng: 36.8219, city: "Nairobi", country: "Kenya", type: "past" },
];

const DEMO_FUTURE_PINS: GlobePin[] = [
  { id: "f1", lat: 64.1466, lng: -21.9426, city: "Reykjavik", country: "Iceland", type: "future" },
  { id: "f2", lat: -22.9068, lng: -43.1729, city: "Rio de Janeiro", country: "Brazil", type: "future" },
  { id: "f3", lat: 1.3521, lng: 103.8198, city: "Singapore", country: "Singapore", type: "future" },
];

const DEMO_WISHLIST_PINS: GlobePin[] = [
  { id: "w1", lat: -8.3405, lng: 115.092, city: "Ubud", country: "Indonesia", type: "wishlist" },
  { id: "w2", lat: 27.1751, lng: 78.0421, city: "Agra", country: "India", type: "wishlist" },
  { id: "w3", lat: 37.9838, lng: 23.7275, city: "Athens", country: "Greece", type: "wishlist" },
  { id: "w4", lat: -33.9249, lng: 18.4241, city: "Cape Town", country: "South Africa", type: "wishlist" },
];

const DEMO_VISITED_COUNTRIES = [
  "Mexico", "Japan", "Italy", "Australia", "France",
  "Thailand", "Peru", "India", "Russia", "Kenya",
];

export default function HomePage() {
  const [selectedPin, setSelectedPin] = useState<GlobePin | null>(null);
  const [mode, setMode] = useState<GlobeMode>("pins");
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>(
    () => DEMO_FRIENDS.map((f) => f.id)
  );

  const handlePinClick = useCallback((pin: GlobePin) => {
    setSelectedPin(pin);
  }, []);

  const handleToggleFriend = useCallback((friendId: string) => {
    setSelectedFriendIds((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  }, []);

  return (
    <div className="relative h-screen pt-0 md:pt-16">
      <Globe
        pastPins={DEMO_PAST_PINS}
        futurePins={DEMO_FUTURE_PINS}
        wishlistPins={DEMO_WISHLIST_PINS}
        visitedCountries={DEMO_VISITED_COUNTRIES}
        friends={DEMO_FRIENDS}
        selectedFriendIds={selectedFriendIds}
        mode={mode}
        onModeChange={setMode}
        onPinClick={handlePinClick}
      />

      {/* Selected pin slide-up card */}
      {selectedPin && (
        <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 bg-brand-bg/95 backdrop-blur-md rounded-xl border border-brand-border p-5 shadow-2xl w-[90vw] max-w-sm">
          <button
            onClick={() => setSelectedPin(null)}
            className="absolute top-3 right-3 text-brand-text-muted hover:text-brand-text"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: selectedPin.friendId
                  ? DEMO_FRIENDS.find((f) => f.id === selectedPin.friendId)?.color ?? "#999"
                  : selectedPin.type === "past"
                    ? "#c4623a"
                    : selectedPin.type === "future"
                      ? "#1c2b4a"
                      : "#5c8a6e",
              }}
            />
            <span className="text-xs uppercase tracking-wider text-brand-text-muted">
              {selectedPin.friendName
                ? `${selectedPin.friendName}'s trip`
                : selectedPin.type === "past"
                  ? "Visited"
                  : selectedPin.type === "future"
                    ? "Upcoming"
                    : "Bucket List"}
            </span>
          </div>

          <h2 className="text-xl font-bold font-serif text-brand-text mb-1">{selectedPin.city}</h2>
          <p className="text-brand-text-secondary">{selectedPin.country}</p>

          {selectedPin.friendName ? (
            <a
              href={`/profile/${DEMO_FRIENDS.find((f) => f.id === selectedPin.friendId)?.username}`}
              className="mt-4 w-full py-2 bg-brand-navy text-parchment font-medium rounded-lg text-sm hover:bg-brand-navy-hover transition-colors block text-center"
            >
              View {selectedPin.friendName}&apos;s Profile
            </a>
          ) : (
            selectedPin.type !== "wishlist" && (
              <button className="mt-4 w-full py-2 bg-brand-navy text-parchment font-medium rounded-lg text-sm hover:bg-brand-navy-hover transition-colors">
                View Trip Details
              </button>
            )
          )}
        </div>
      )}

      {/* Side panel — stats overlay or friend legend */}
      <div className="absolute top-20 md:top-24 left-4 bg-brand-bg/80 backdrop-blur-md rounded-xl border border-brand-border p-4 shadow-lg hidden md:block min-w-[180px]">
        {mode === "friends" ? (
          <FriendLegend
            friends={DEMO_FRIENDS}
            selectedFriendIds={selectedFriendIds}
            onToggleFriend={handleToggleFriend}
          />
        ) : (
          <>
            <div className="text-xs text-brand-text-muted mb-2">Your Journey</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-pin-past" />
                <span className="text-sm text-brand-text">{DEMO_PAST_PINS.length} places visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />
                <span className="text-sm text-brand-text">{DEMO_FUTURE_PINS.length} upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-pin-wishlist" />
                <span className="text-sm text-brand-text">{DEMO_WISHLIST_PINS.length} bucket list</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-brand-border text-xs text-brand-text-muted">
              {DEMO_VISITED_COUNTRIES.length} countries
            </div>
          </>
        )}
      </div>
    </div>
  );
}
