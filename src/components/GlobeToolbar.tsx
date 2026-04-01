"use client";

import type { GlobeMode } from "@/types";
import { cn } from "@/lib/utils";

interface GlobeToolbarProps {
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
}

const MODES: { value: GlobeMode; label: string; icon: string }[] = [
  { value: "pins", label: "Pins", icon: "pin" },
  { value: "friends", label: "Friends' Map", icon: "users" },
];

export function GlobeToolbar({ mode, onModeChange }: GlobeToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center bg-brand-bg/90 backdrop-blur-md rounded-full border border-brand-border px-1 py-1 shadow-lg">
      {MODES.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            mode === m.value
              ? "bg-brand-navy text-parchment shadow-sm"
              : "text-brand-text-secondary hover:text-brand-text"
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
