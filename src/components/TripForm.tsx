"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { searchCountries, searchCities, type CountryData } from "@/data/countries";

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

function CountryInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (country: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CountryData[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchCountries(query));
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value) onChange("");
        }}
        onFocus={() => setOpen(true)}
        placeholder="Country"
        className="w-full px-3 py-2 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-sm text-brand-text"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-brand-bg ring-1 ring-brand-border rounded-xl shadow-lg overflow-hidden z-20 max-h-48 overflow-y-auto">
          {results.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setQuery(c.name);
                onChange(c.name);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-brand-text hover:bg-brand-surface transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CityInput({
  country,
  value,
  onChange,
}: {
  country: string;
  value: string;
  onChange: (city: string, lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CountryData["cities"]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (country) {
      setResults(searchCities(country, query));
    } else {
      setResults([]);
    }
  }, [country, query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          if (country && !query) setResults(searchCities(country, ""));
        }}
        placeholder={country ? "City" : "Select country first"}
        disabled={!country}
        className="w-full px-3 py-2 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-sm text-brand-text disabled:opacity-50"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-brand-bg ring-1 ring-brand-border rounded-xl shadow-lg overflow-hidden z-20 max-h-48 overflow-y-auto">
          {results.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setQuery(c.name);
                onChange(c.name, c.lat, c.lng);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-brand-text hover:bg-brand-surface transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
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
        <label className="block text-sm font-medium text-brand-text mb-1.5">Trip Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Two weeks in Oaxaca"
          required
          className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-brand-text"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this trip about?"
          rows={3}
          className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors resize-none text-brand-text"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1.5">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-brand-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1.5">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-brand-text"
          />
        </div>
      </div>

      {/* Trip type toggle */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-brand-text">Trip type:</label>
        <div className="flex rounded-lg ring-1 ring-brand-border overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFuture(false)}
            className={cn(
              "px-4 py-1.5 text-sm transition-colors",
              !isFuture ? "bg-brand-pin-past text-white" : "bg-brand-surface text-brand-text-secondary"
            )}
          >
            Past
          </button>
          <button
            type="button"
            onClick={() => setIsFuture(true)}
            className={cn(
              "px-4 py-1.5 text-sm transition-colors",
              isFuture ? "bg-brand-navy text-parchment" : "bg-brand-surface text-brand-text-secondary"
            )}
          >
            Future
          </button>
        </div>
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5">Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-brand-navy transition-colors text-brand-text"
        >
          <option value="PUBLIC">Public</option>
          <option value="FRIENDS">Friends Only</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      {/* Destinations */}
      <div>
        <label className="block text-sm font-medium text-brand-text mb-3">Destinations</label>
        <div className="space-y-3">
          {destinations.map((dest, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <CountryInput
                  value={dest.country}
                  onChange={(country) => {
                    const updated = [...destinations];
                    updated[i] = { ...updated[i], country, city: "", lat: 0, lng: 0 };
                    setDestinations(updated);
                  }}
                />
                <CityInput
                  country={dest.country}
                  value={dest.city}
                  onChange={(city, lat, lng) => {
                    const updated = [...destinations];
                    updated[i] = { ...updated[i], city, lat, lng };
                    setDestinations(updated);
                  }}
                />
              </div>
              {destinations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDestination(i)}
                  className="p-2 text-brand-text-muted hover:text-brand-danger transition-colors"
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
          className="mt-2 text-sm text-brand-navy hover:text-brand-navy-muted transition-colors"
        >
          + Add another destination
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-brand-navy text-parchment font-semibold rounded-lg hover:bg-brand-navy-hover transition-colors disabled:opacity-50 btn-press"
      >
        {isLoading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
}
