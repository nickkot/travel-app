"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TripForm } from "@/components/TripForm";

export default function NewTripPage() {
  const [isLoading, setIsLoading] = useState(false);
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
        router.push(`/trips/${trip.id}`);
      }
    } catch (err) {
      console.error("Failed to create trip:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      <h1 className="text-3xl font-bold font-serif text-brand-text mb-6">Create a New Trip</h1>
      <div className="bg-brand-card rounded-[10px] border border-brand-border p-6">
        <TripForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
