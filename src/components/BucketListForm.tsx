"use client";

import { useState } from "react";

interface BucketListFormProps {
  onSubmit: (data: {
    city: string;
    country: string;
    lat: number;
    lng: number;
    notes: string;
  }) => void;
  isLoading?: boolean;
}

export function BucketListForm({ onSubmit, isLoading }: BucketListFormProps) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ city, country, lat, lng, notes });
    setCity("");
    setCountry("");
    setLat(0);
    setLng(0);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent-wishlist transition-colors"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent-wishlist transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          step="any"
          value={lat || ""}
          onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
          placeholder="Latitude"
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent-wishlist transition-colors"
        />
        <input
          type="number"
          step="any"
          value={lng || ""}
          onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
          placeholder="Longitude"
          className="px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent-wishlist transition-colors"
        />
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Why do you want to go? (optional)"
        rows={2}
        className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent-wishlist transition-colors resize-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 bg-accent-wishlist text-white font-medium rounded-lg hover:bg-accent-wishlist/80 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Adding..." : "Add to Bucket List"}
      </button>
    </form>
  );
}
