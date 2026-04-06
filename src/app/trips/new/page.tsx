"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TripForm } from "@/components/TripForm";
import { TripRewardScreen } from "@/components/TripRewardScreen";

interface TripData {
  tripId: string;
  destinations: { city: string; country: string }[];
  startDate: string;
  endDate: string;
}

export default function NewTripPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reward, setReward] = useState<TripData | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const trip = await res.json();
        // Show reward screen instead of immediate redirect
        setReward({
          tripId: trip.id || "new",
          destinations: data.destinations,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      } else {
        // API failed — show reward screen with demo ID anyway
        setReward({
          tripId: "new",
          destinations: data.destinations,
          startDate: data.startDate,
          endDate: data.endDate,
        });
      }
    } catch {
      // Network error — show reward screen with demo data
      setReward({
        tripId: "new",
        destinations: data.destinations,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reward screen overlay
  if (reward) {
    return (
      <TripRewardScreen
        destinations={reward.destinations}
        startDate={reward.startDate}
        endDate={reward.endDate}
        currentMiles={3200}
        currentTier={2}
        onContinue={() => router.push(`/trips/${reward.tripId}`)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-serif text-brand-text">Create a New Trip</h1>
        <Link
          href="/profile"
          className="p-2 rounded-lg text-brand-text-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>
      <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-6 noise-texture">
        <TripForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
