"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

interface TripFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isFuture: boolean;
    visibility: string;
    destinations: Destination[];
  }) => void;
  isLoading?: boolean;
}

export function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFuture, setIsFuture] = useState(false);
  const [visibility, setVisibility] = useState("PUBLIC");
  const [destinations, setDestinations] = useState<Destination[]>([
    { city: "", country: "", lat: 0, lng: 0 },
  ]);

  const addDestination = () => {
    setDestinations([...destinations, { city: "", country: "", lat: 0, lng: 0 }]);
  };

  const updateDestination = (
    index: number,
    field: keyof Destination,
    value: string | number
  ) => {
    const updated = [...destinations];
    (updated[index] as any)[field] = value;
    setDestinations(updated);
  };

  const removeDestination = (index: number) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      startDate,
      endDate,
      isFuture,
      visibility,
      destinations: destinations.filter((d) => d.city && d.country),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Trip Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Two weeks in Oaxaca"
          required
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this trip about?"
          rows={3}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Trip type toggle */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Trip type:</label>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFuture(false)}
            className={cn(
              "px-4 py-1.5 text-sm transition-colors",
              !isFuture ? "bg-accent text-black" : "bg-surface text-foreground/60"
            )}
          >
            Past
          </button>
          <button
            type="button"
            onClick={() => setIsFuture(true)}
            className={cn(
              "px-4 py-1.5 text-sm transition-colors",
              isFuture ? "bg-accent-cool text-white" : "bg-surface text-foreground/60"
            )}
          >
            Future
          </button>
        </div>
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium mb-1.5">Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
        >
          <option value="PUBLIC">Public</option>
          <option value="FRIENDS">Friends Only</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      {/* Destinations */}
      <div>
        <label className="block text-sm font-medium mb-3">Destinations</label>
        <div className="space-y-3">
          {destinations.map((dest, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={dest.city}
                  onChange={(e) => updateDestination(i, "city", e.target.value)}
                  placeholder="City"
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
                />
                <input
                  type="text"
                  value={dest.country}
                  onChange={(e) => updateDestination(i, "country", e.target.value)}
                  placeholder="Country"
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 w-48">
                <input
                  type="number"
                  step="any"
                  value={dest.lat || ""}
                  onChange={(e) => updateDestination(i, "lat", parseFloat(e.target.value) || 0)}
                  placeholder="Lat"
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
                />
                <input
                  type="number"
                  step="any"
                  value={dest.lng || ""}
                  onChange={(e) => updateDestination(i, "lng", parseFloat(e.target.value) || 0)}
                  placeholder="Lng"
                  className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
              {destinations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDestination(i)}
                  className="p-2 text-foreground/40 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addDestination}
          className="mt-2 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          + Add another destination
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
}
