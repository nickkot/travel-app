"use client";

import { useState } from "react";

interface JournalFormProps {
  tripId: string;
  onSubmit: (data: {
    content: string;
    date: string;
    locationCity: string;
    visibility: string;
  }) => void;
  isLoading?: boolean;
}

export function JournalForm({ onSubmit, isLoading }: JournalFormProps) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [locationCity, setLocationCity] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, date, locationCity, visibility });
    setContent("");
    setLocationCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your day..."
          rows={5}
          required
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none text-sm"
        />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs text-foreground/50 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-foreground/50 mb-1">
            Location (optional)
          </label>
          <input
            type="text"
            value={locationCity}
            onChange={(e) => setLocationCity(e.target.value)}
            placeholder="City"
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-foreground/50 mb-1">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
          >
            <option value="PUBLIC">Public</option>
            <option value="FRIENDS">Friends</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="px-5 py-1.5 bg-accent text-black font-medium rounded-lg text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Add Entry"}
        </button>
      </div>
    </form>
  );
}
