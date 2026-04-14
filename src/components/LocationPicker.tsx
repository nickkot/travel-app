"use client";

import { useState, useRef, useEffect } from "react";
import { searchCountries, searchCities, type CountryData } from "@/data/countries";

/**
 * Searchable country dropdown. Used by TripForm (inline copy), this module
 * extracts the same pattern for reuse in EditProfileModal and LocalGuideForm.
 */
export function CountryPicker({
  value,
  onChange,
  placeholder = "Country",
}: {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CountryData[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Keep internal query in sync if parent resets value externally
  useEffect(() => setQuery(value), [value]);

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
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
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

/**
 * Searchable city dropdown scoped to a selected country. Emits lat/lng
 * alongside the city name so callers can persist coordinates.
 */
export function CityPicker({
  country,
  value,
  onChange,
  placeholder,
}: {
  country: string;
  value: string;
  onChange: (city: string, lat: number, lng: number) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CountryData["cities"]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

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
        placeholder={placeholder ?? (country ? "City" : "Select country first")}
        disabled={!country}
        className="w-full px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-navy/30 disabled:opacity-50"
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
