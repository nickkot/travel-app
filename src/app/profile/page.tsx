"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfileStats } from "@/components/ProfileStats";
import { CompassClub } from "@/components/CompassClub";
import { BadgeShowcase } from "@/components/BadgeShowcase";
import { TripCard } from "@/components/TripCard";
import { ShareButton } from "@/components/ShareButton";
import { NotificationBell } from "@/components/NotificationBell";
import { EditProfileModal } from "@/components/EditProfileModal";
import { LocalGuideForm } from "@/components/LocalGuideForm";
import { cn } from "@/lib/utils";
import type { TravelStats } from "@/types";

interface LocalRec {
  id: string;
  placeName: string;
  placeType: string;
  rating: number;
  content: string;
  upvoteCount: number;
  city: string;
}

const DEMO_STATS: TravelStats = {
  countriesVisited: 10,
  citiesVisited: 28,
  continentsVisited: 5,
  totalTrips: 14,
  daysAbroad: 187,
  longestTrip: 30,
  returnRate: 21,
  compassMiles: 3200,
  tier: 2,
};

const DEMO_BADGES = [
  "return_flight", "culinary_explorer", "time_traveler",
  // Americana levels (6 states = level 1)
  "region_us_1",
  // Regional achievements earned
  "region_canada",
  "region_mexico",
  "region_east_asia",
  "region_southeast_asia",
  "region_south_europe",
  "region_west_europe",
  "region_east_europe",
  "region_oceania",
  "region_africa",
];

const DEMO_PAST_TRIPS = [
  {
    id: "1",
    title: "Two Weeks in Oaxaca",
    coverPhotoUrl: "https://picsum.photos/seed/oaxaca-cover/600/800",
    destinations: [
      { city: "Oaxaca City", country: "Mexico" },
      { city: "Puerto Escondido", country: "Mexico" },
    ],
    startDate: "2025-11-15",
    endDate: "2025-11-29",
    status: "COMPLETED",
    isFuture: false,
    upvoteCount: 24,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 47,
    reviewCount: 8,
  },
  {
    id: "2",
    title: "Japan Golden Route & Beyond",
    coverPhotoUrl: "https://picsum.photos/seed/japan-golden/600/800",
    destinations: [
      { city: "Tokyo", country: "Japan" },
      { city: "Kyoto", country: "Japan" },
    ],
    startDate: "2025-03-20",
    endDate: "2025-04-10",
    status: "COMPLETED",
    isFuture: false,
    upvoteCount: 56,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 128,
    reviewCount: 15,
  },
];

const DEMO_FUTURE_TRIPS = [
  {
    id: "f1",
    title: "Iceland Ring Road",
    coverPhotoUrl: null,
    destinations: [
      { city: "Reykjavik", country: "Iceland" },
      { city: "Akureyri", country: "Iceland" },
    ],
    startDate: "2026-06-10",
    endDate: "2026-06-24",
    status: "PLANNED",
    isFuture: true,
    upvoteCount: 0,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 0,
    reviewCount: 0,
  },
  {
    id: "f2",
    title: "Patagonia Trek",
    coverPhotoUrl: null,
    destinations: [
      { city: "El Chalten", country: "Argentina" },
      { city: "Torres del Paine", country: "Chile" },
    ],
    startDate: "2026-11-01",
    endDate: "2026-11-18",
    status: "PLANNED",
    isFuture: true,
    upvoteCount: 0,
    authorName: "Atlas Explorer",
    authorUsername: "atlas_explorer",
    photoCount: 0,
    reviewCount: 0,
  },
];

const DEMO_LOCAL_RECS: LocalRec[] = [
  {
    id: "lr1",
    placeName: "Manteigaria",
    placeType: "Cafe",
    rating: 5,
    content:
      "Order the pastel de nata straight from the oven — they ring a bell when a fresh batch comes out. Skip Pasteis de Belem unless you want to queue for an hour.",
    upvoteCount: 38,
    city: "Lisbon",
  },
  {
    id: "lr2",
    placeName: "Miradouro da Senhora do Monte",
    placeType: "Viewpoint",
    rating: 5,
    content:
      "Best sunset view in Lisbon, minus the crowd at Miradouro de Santa Catarina. Grab a ginjinha from the kiosk and sit on the wall.",
    upvoteCount: 24,
    city: "Lisbon",
  },
  {
    id: "lr3",
    placeName: "Bairro Alto after midnight",
    placeType: "Vibe",
    rating: 5,
    content:
      "The streets empty from locals by 2am and fill with tourists. Get there between 11 and 1 — live fado spilling from open doors, old men playing guitar on corners.",
    upvoteCount: 52,
    city: "Lisbon",
  },
  {
    id: "lr4",
    placeName: "Don't take Tram 28 — walk it",
    placeType: "Tip",
    rating: 5,
    content:
      "The tram is a pickpocket's paradise and you see nothing through the windows. The same route on foot takes 40 minutes and you'll actually experience Alfama.",
    upvoteCount: 89,
    city: "Lisbon",
  },
  {
    id: "lr5",
    placeName: "Livraria Lello",
    placeType: "Attraction",
    rating: 4,
    content:
      "Book the first 9:30am slot — the queue is gone, the light through the stained glass hits the red staircase, and the bookseller has time to point out the hidden Escher reference.",
    upvoteCount: 41,
    city: "Porto",
  },
  {
    id: "lr6",
    placeName: "Rua de Miguel Bombarda",
    placeType: "Street",
    rating: 4,
    content:
      "Every six weeks the galleries on this one block open together for a Saturday night — free wine, local artists, zero tourists. Check the Circuito das Artes schedule.",
    upvoteCount: 17,
    city: "Porto",
  },
];

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [showLocalGuideForm, setShowLocalGuideForm] = useState(false);
  const [profile, setProfile] = useState({
    name: "Atlas Explorer",
    username: "atlas_explorer",
    bio: "Slow traveler. 30+ countries. Always returning.",
    avatarUrl: null as string | null,
    baseCity: "Lisbon" as string | null,
    baseCountry: "Portugal" as string | null,
    baseLat: 38.7223 as number | null,
    baseLng: -9.1393 as number | null,
    baseCity2: "Porto" as string | null,
    baseCountry2: "Portugal" as string | null,
    baseLat2: 41.1579 as number | null,
    baseLng2: -8.6291 as number | null,
  });
  const [localRecs, setLocalRecs] = useState<LocalRec[]>(DEMO_LOCAL_RECS);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const bases = [
    profile.baseCity && profile.baseCountry
      ? {
          city: profile.baseCity,
          country: profile.baseCountry,
          lat: profile.baseLat ?? 0,
          lng: profile.baseLng ?? 0,
        }
      : null,
    profile.baseCity2 && profile.baseCountry2
      ? {
          city: profile.baseCity2,
          country: profile.baseCountry2,
          lat: profile.baseLat2 ?? 0,
          lng: profile.baseLng2 ?? 0,
        }
      : null,
  ].filter((b): b is { city: string; country: string; lat: number; lng: number } => b !== null);

  const isLocal = bases.length > 0;
  const visibleRecs = activeCity
    ? localRecs.filter((r) => r.city === activeCity)
    : localRecs;

  const handlePublishRec = (data: {
    placeName: string;
    placeType: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    rating: number;
    content: string;
  }) => {
    // Optimistic local insert — in a real auth flow this would also POST
    // to /api/reviews, which already detects the local match server-side
    // and awards 300 compass miles.
    setLocalRecs((prev) => [
      {
        id: `lr-${Date.now()}`,
        placeName: data.placeName,
        placeType: data.placeType,
        rating: data.rating,
        content: data.content,
        upvoteCount: 0,
        city: data.city,
      },
      ...prev,
    ]);
    setShowLocalGuideForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      {/* Action bar — search + notifications */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <Link
          href="/search"
          className="p-2 rounded-lg text-brand-text-secondary hover:text-brand-text hover:bg-brand-surface transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Link>
        <NotificationBell />
      </div>

      {/* Profile header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-2xl font-bold flex-shrink-0">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            profile.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold font-serif text-brand-text">{profile.name}</h1>
            {isLocal && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-navy/10 ring-1 ring-brand-navy/20 text-[11px] font-semibold text-brand-navy">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
                Local Guide in {bases.map((b) => b.city).join(" + ")}
              </span>
            )}
          </div>
          <p className="text-brand-text-muted mb-1">@{profile.username}</p>
          <p className="text-sm text-brand-text-secondary mb-3">
            {profile.bio}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="text-brand-text">142</strong>{" "}
              <span className="text-brand-text-muted">followers</span>
            </span>
            <span>
              <strong className="text-brand-text">89</strong>{" "}
              <span className="text-brand-text-muted">following</span>
            </span>
            <CompassClub
              compassMiles={DEMO_STATS.compassMiles}
              tier={DEMO_STATS.tier}
              compact
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="px-4 py-2 border border-brand-border rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors btn-press"
          >
            Edit Profile
          </button>
          <ShareButton username={profile.username} />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <ProfileStats stats={DEMO_STATS} />
      </div>

      {/* Trips — past + future with add button */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-serif text-brand-text">Trips</h2>
          <Link
            href="/trips/new"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-parchment rounded-lg text-sm font-medium hover:bg-brand-navy-hover transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Trip
          </Link>
        </div>

        {/* Future trips */}
        {DEMO_FUTURE_TRIPS.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-brand-text-secondary mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-navy" />
              Upcoming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_FUTURE_TRIPS.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          </div>
        )}

        {/* Past trips */}
        <div>
          <h3 className="text-sm font-semibold text-brand-text-secondary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-pin-past" />
            Past
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_PAST_TRIPS.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        </div>
      </div>

      {/* Places I recommend — local guide section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-brand-text">
              Places I recommend
            </h2>
            {isLocal && (
              <p className="text-xs text-brand-text-muted mt-0.5">
                Insider tips for visitors to {bases.map((b) => b.city).join(" & ")}
              </p>
            )}
          </div>
          {isLocal ? (
            <button
              onClick={() => setShowLocalGuideForm((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-parchment rounded-lg text-sm font-medium hover:bg-brand-navy-hover transition-colors btn-press"
            >
              {showLocalGuideForm ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add recommendation
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setEditOpen(true)}
              className="text-xs text-brand-navy hover:underline"
            >
              Set home base →
            </button>
          )}
        </div>

        {/* City filter — only appears when the user has two home cities */}
        {bases.length > 1 && !showLocalGuideForm && (
          <div className="flex items-center gap-1 mb-3">
            <button
              onClick={() => setActiveCity(null)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                activeCity === null
                  ? "bg-brand-navy text-parchment"
                  : "bg-brand-surface text-brand-text hover:bg-brand-navy/10"
              )}
            >
              All
            </button>
            {bases.map((b) => (
              <button
                key={b.city}
                onClick={() => setActiveCity(b.city)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                  activeCity === b.city
                    ? "bg-brand-navy text-parchment"
                    : "bg-brand-surface text-brand-text hover:bg-brand-navy/10"
                )}
              >
                {b.city}
              </button>
            ))}
          </div>
        )}

        {/* Inline add form */}
        {showLocalGuideForm && isLocal && (
          <div className="mb-4">
            <LocalGuideForm
              bases={bases}
              onSubmit={handlePublishRec}
              onCancel={() => setShowLocalGuideForm(false)}
              onEditHomeBase={() => {
                setShowLocalGuideForm(false);
                setEditOpen(true);
              }}
            />
          </div>
        )}

        {!isLocal ? (
          <div className="rounded-2xl ring-1 ring-brand-border border-dashed bg-brand-surface/40 p-6 text-center">
            <p className="text-sm text-brand-text-secondary mb-1">
              Share insider tips for visitors to your home city.
            </p>
            <p className="text-xs text-brand-text-muted">
              Set your home base to unlock Local Guide and earn{" "}
              <span className="font-semibold text-brand-navy">
                300 compass miles
              </span>{" "}
              per recommendation.
            </p>
          </div>
        ) : visibleRecs.length === 0 ? (
          <div className="rounded-2xl ring-1 ring-brand-border bg-brand-surface/40 p-6 text-center">
            <p className="text-sm text-brand-text-muted">
              {activeCity
                ? `No recommendations in ${activeCity} yet — drop the first one.`
                : "No recommendations yet — drop your first insider tip."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleRecs.map((rec) => (
              <div
                key={rec.id}
                className="bg-brand-card rounded-xl ring-1 ring-brand-border p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold font-serif text-brand-text leading-tight truncate">
                      {rec.placeName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-brand-text-muted uppercase tracking-wider">
                        {rec.placeType}
                      </span>
                      {bases.length > 1 && (
                        <>
                          <span className="text-brand-text-muted/50">·</span>
                          <span className="text-[11px] text-brand-navy">
                            {rec.city}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={cn(
                          "w-3 h-3",
                          star <= rec.rating
                            ? "text-brand-pin-past fill-brand-pin-past"
                            : "text-brand-text-muted/30"
                        )}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-brand-text-secondary leading-relaxed line-clamp-3">
                  {rec.content}
                </p>
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-brand-text-muted">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                  <span>{rec.upvoteCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compass Club */}
      <div className="mb-6">
        <CompassClub
          compassMiles={DEMO_STATS.compassMiles}
          tier={DEMO_STATS.tier}
        />
      </div>

      {/* Badges */}
      <div className="mb-6">
        <BadgeShowcase earnedBadges={DEMO_BADGES} />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialData={{
          name: profile.name,
          username: profile.username,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
          baseCity: profile.baseCity,
          baseCountry: profile.baseCountry,
          baseLat: profile.baseLat,
          baseLng: profile.baseLng,
          baseCity2: profile.baseCity2,
          baseCountry2: profile.baseCountry2,
          baseLat2: profile.baseLat2,
          baseLng2: profile.baseLng2,
        }}
        onSave={(data) => {
          setProfile({
            name: data.name,
            username: data.username,
            bio: data.bio,
            avatarUrl: data.avatarUrl,
            baseCity: data.baseCity,
            baseCountry: data.baseCountry,
            baseLat: data.baseLat,
            baseLng: data.baseLng,
            baseCity2: data.baseCity2,
            baseCountry2: data.baseCountry2,
            baseLat2: data.baseLat2,
            baseLng2: data.baseLng2,
          });
          setEditOpen(false);
        }}
      />
    </div>
  );
}
