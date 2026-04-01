"use client";

import { useState } from "react";
import { BucketListForm } from "@/components/BucketListForm";

interface WishlistItem {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  notes: string;
  addedAt: string;
}

const DEMO_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    city: "Ubud",
    country: "Indonesia",
    lat: -8.3405,
    lng: 115.092,
    notes: "Rice terraces, yoga retreats, and Balinese culture",
    addedAt: "2026-01-15",
  },
  {
    id: "w2",
    city: "Agra",
    country: "India",
    lat: 27.1751,
    lng: 78.0421,
    notes: "Taj Mahal at sunrise. Combine with Rajasthan trip.",
    addedAt: "2026-02-03",
  },
  {
    id: "w3",
    city: "Athens",
    country: "Greece",
    lat: 37.9838,
    lng: 23.7275,
    notes: "Acropolis, island-hopping base, incredible food scene",
    addedAt: "2026-02-20",
  },
  {
    id: "w4",
    city: "Cape Town",
    country: "South Africa",
    lat: -33.9249,
    lng: 18.4241,
    notes: "Table Mountain, wine country, and the Garden Route",
    addedAt: "2026-03-10",
  },
];

export default function BucketListPage() {
  const [items, setItems] = useState(DEMO_WISHLIST);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (data: {
    city: string;
    country: string;
    lat: number;
    lng: number;
    notes: string;
  }) => {
    const newItem: WishlistItem = {
      id: `w${Date.now()}`,
      ...data,
      addedAt: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-20 md:pt-24 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Still Want to Go</h1>
          <p className="text-sm text-foreground/50 mt-1">
            {items.length} destinations on your list
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-accent-wishlist text-white font-medium rounded-lg text-sm hover:bg-accent-wishlist/80 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Destination"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-surface rounded-xl border border-border p-5 mb-6">
          <BucketListForm onSubmit={handleAdd} />
        </div>
      )}

      {/* Wishlist items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surface rounded-xl border border-border p-4 flex items-start gap-4 card-hover"
          >
            <div className="w-10 h-10 rounded-full bg-accent-wishlist/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent-wishlist" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{item.city}</h3>
                <span className="text-sm text-foreground/50">
                  {item.country}
                </span>
              </div>
              {item.notes && (
                <p className="text-sm text-foreground/60">{item.notes}</p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-foreground/40">
                <span>
                  {item.lat.toFixed(2)}, {item.lng.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-accent text-black rounded-lg text-xs font-medium hover:bg-accent/90 transition-colors">
                Plan Trip
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="p-1.5 text-foreground/30 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 text-foreground/40">
          <p className="text-lg mb-2">Your bucket list is empty</p>
          <p className="text-sm">Add destinations you dream about visiting</p>
        </div>
      )}
    </div>
  );
}
