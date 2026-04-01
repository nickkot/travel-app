"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  tripId?: string;
  onSubmit: (data: {
    placeName: string;
    placeType: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    rating: number;
    content: string;
  }) => void;
  isLoading?: boolean;
}

const PLACE_TYPES = [
  "Restaurant",
  "Hotel",
  "Neighborhood",
  "Museum",
  "Market",
  "Bar",
  "Cafe",
  "Experience",
  "Park",
  "Beach",
  "Other",
];

export function ReviewForm({ onSubmit, isLoading }: ReviewFormProps) {
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("Restaurant");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ placeName, placeType, city, country, lat, lng, rating, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1.5">Place Name</label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Mercado Benito Juarez"
          required
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Type</label>
        <div className="flex flex-wrap gap-2">
          {PLACE_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPlaceType(type)}
              className={cn(
                "px-3 py-1 rounded-full text-sm border transition-colors",
                placeType === type
                  ? "bg-accent text-black border-accent"
                  : "border-border text-foreground/60 hover:border-foreground/30"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Oaxaca"
            required
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Mexico"
            required
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Latitude</label>
          <input
            type="number"
            step="any"
            value={lat || ""}
            onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
            placeholder="17.0654"
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Longitude</label>
          <input
            type="number"
            step="any"
            value={lng || ""}
            onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
            placeholder="-96.7236"
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={cn(
                  "w-8 h-8",
                  star <= rating ? "text-accent fill-accent" : "text-foreground/20"
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
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience as a traveler..."
          rows={4}
          required
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || rating === 0}
        className="w-full py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
