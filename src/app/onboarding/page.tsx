"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { DESTINATIONS } from "@/data/destinationMeta";
import { COUNTRIES } from "@/data/countries";
import { MILES_ACTIONS } from "@/lib/points";

// Per-destination reward: matches LOG_TRIP to stay consistent with
// the rest of the points system.
const MILES_PER_PICK = MILES_ACTIONS.LOG_TRIP;

// Build a fast city -> coordinates lookup from the countries dataset.
// Falls back to the first city in the destination's country if an exact
// match is missing (e.g. "Bali" is a region, not a city in COUNTRIES).
type Coords = { lat: number; lng: number };
function buildCoordLookup(): {
  byCity: Map<string, Coords>;
  byCountry: Map<string, Coords>;
} {
  const byCity = new Map<string, Coords>();
  const byCountry = new Map<string, Coords>();
  for (const country of COUNTRIES) {
    for (const city of country.cities) {
      byCity.set(`${city.name.toLowerCase()}|${country.name.toLowerCase()}`, {
        lat: city.lat,
        lng: city.lng,
      });
    }
    if (country.cities.length > 0 && !byCountry.has(country.name.toLowerCase())) {
      byCountry.set(country.name.toLowerCase(), {
        lat: country.cities[0].lat,
        lng: country.cities[0].lng,
      });
    }
  }
  return { byCity, byCountry };
}

function resolveCoords(
  city: string,
  country: string,
  lookup: ReturnType<typeof buildCoordLookup>
): Coords {
  const direct = lookup.byCity.get(`${city.toLowerCase()}|${country.toLowerCase()}`);
  if (direct) return direct;
  const fallback = lookup.byCountry.get(country.toLowerCase());
  if (fallback) return fallback;
  return { lat: 0, lng: 0 };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const coordLookup = useMemo(() => buildCoordLookup(), []);

  // Group destinations by region for a scannable layout. The DESTINATIONS
  // array already has region comments — we replicate them here.
  const groups = useMemo(() => {
    const regionOf = (d: (typeof DESTINATIONS)[number]): string => {
      const seaCountries = ["Thailand", "Indonesia", "Vietnam", "Cambodia"];
      const eastAsia = ["Japan", "South Korea", "Taiwan"];
      const europe = [
        "Portugal",
        "Spain",
        "Croatia",
        "Turkey",
        "Greece",
        "Netherlands",
        "Czech Republic",
        "Italy",
        "Iceland",
        "Norway",
      ];
      const americas = ["Mexico", "Colombia", "Argentina", "Costa Rica"];
      const africa = ["Morocco", "South Africa", "Tanzania", "Jordan"];
      const southAsia = ["India", "Nepal"];
      const oceania = ["New Zealand"];
      if (seaCountries.includes(d.country)) return "Southeast Asia";
      if (eastAsia.includes(d.country)) return "East Asia";
      if (europe.includes(d.country)) return "Europe";
      if (americas.includes(d.country)) return "Americas";
      if (africa.includes(d.country)) return "Africa & Middle East";
      if (southAsia.includes(d.country)) return "South Asia";
      if (oceania.includes(d.country)) return "Oceania";
      return "Elsewhere";
    };
    const order = [
      "Europe",
      "Southeast Asia",
      "East Asia",
      "Americas",
      "Africa & Middle East",
      "South Asia",
      "Oceania",
      "Elsewhere",
    ];
    const map = new Map<string, typeof DESTINATIONS>();
    for (const d of DESTINATIONS) {
      const region = regionOf(d);
      if (!map.has(region)) map.set(region, []);
      map.get(region)!.push(d);
    }
    return order
      .filter((r) => map.has(r))
      .map((r) => ({ region: r, items: map.get(r)! }));
  }, []);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalMiles = selected.size * MILES_PER_PICK;

  const handleSubmit = async () => {
    if (!user || selected.size === 0) {
      router.push("/");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      // Create a trip for each selected destination (so pins show on the
      // globe) and award LOG_TRIP miles after each one.
      const picks = DESTINATIONS.filter((d) => selected.has(`${d.city}|${d.country}`));
      for (const d of picks) {
        const coords = resolveCoords(d.city, d.country, coordLookup);
        const tripRes = await fetch("/api/trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            title: `${d.city}, ${d.country}`,
            description: null,
            isFuture: false,
            visibility: "PUBLIC",
            destinations: [
              {
                city: d.city,
                country: d.country,
                lat: coords.lat,
                lng: coords.lng,
              },
            ],
          }),
        });
        if (!tripRes.ok) throw new Error("Failed to log trip");

        const pointsRes = await fetch("/api/points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, action: "LOG_TRIP" }),
        });
        if (!pointsRes.ok) throw new Error("Failed to award miles");
      }

      // Refresh the full user record so compassMiles + tier are accurate.
      const refreshed = await fetch(`/api/users?id=${user.id}`);
      if (refreshed.ok) {
        const data = await refreshed.json();
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          username: data.username,
          avatarUrl: data.avatarUrl,
          bio: data.bio,
          compassMiles: data.compassMiles,
          tier: data.tier,
        });
      }
      router.push("/?welcome=1");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pt-16 md:pt-24 pb-12">
      <div className="max-w-3xl mx-auto animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/10 ring-1 ring-brand-navy/20 mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-brand-navy"
              fill="currentColor"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
              Welcome to Stampy
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-text mb-3">
            Where have you been lately?
          </h1>
          <p className="text-brand-text-muted max-w-lg mx-auto">
            Tap any of these popular spots you&apos;ve visited in the last year.
            Each one earns you{" "}
            <span className="font-semibold text-brand-navy">
              {MILES_PER_PICK} compass miles
            </span>{" "}
            and pins a stamp on your globe.
          </p>
        </div>

        {/* Selection counter */}
        <div className="sticky top-16 z-10 mb-6 flex items-center justify-between gap-3 p-3 bg-brand-card/95 backdrop-blur rounded-xl ring-1 ring-brand-border shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-brand-text">
              {selected.size} selected
            </span>
            {selected.size > 0 && (
              <>
                <span className="text-brand-text-muted">·</span>
                <span className="text-brand-navy font-semibold">
                  +{totalMiles.toLocaleString()} miles
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm text-brand-text-muted hover:text-brand-text transition-colors"
            >
              Skip
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-1.5 bg-brand-navy text-parchment text-sm font-semibold rounded-lg hover:bg-brand-navy-hover transition-colors disabled:opacity-50 btn-press"
            >
              {isSubmitting
                ? "Stamping..."
                : selected.size > 0
                  ? `Claim ${totalMiles.toLocaleString()} miles`
                  : "Continue"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-brand-danger/10 ring-1 ring-brand-danger/30 rounded-lg text-brand-danger text-sm">
            {error}
          </div>
        )}

        {/* Destination groups */}
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.region}>
              <h2 className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-3">
                {group.region}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.items.map((d) => {
                  const key = `${d.city}|${d.country}`;
                  const isSelected = selected.has(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggle(key)}
                      className={`relative text-left p-3 rounded-xl transition-all btn-press ${
                        isSelected
                          ? "bg-brand-navy text-parchment ring-2 ring-brand-navy shadow-md"
                          : "bg-brand-card ring-1 ring-brand-border hover:bg-brand-surface hover:ring-brand-navy/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base leading-none">
                              {d.countryFlag}
                            </span>
                            <span
                              className={`font-serif font-semibold text-base leading-tight truncate ${
                                isSelected ? "text-parchment" : "text-brand-text"
                              }`}
                            >
                              {d.city}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-0.5 truncate ${
                              isSelected
                                ? "text-parchment/70"
                                : "text-brand-text-muted"
                            }`}
                          >
                            {d.country}
                          </p>
                        </div>
                        <div
                          className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-parchment text-brand-navy"
                              : "bg-brand-surface ring-1 ring-brand-border"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-brand-text-muted mt-10">
          Don&apos;t see a place you&apos;ve visited? You can log any trip
          later from your profile.
        </p>
      </div>
    </div>
  );
}
