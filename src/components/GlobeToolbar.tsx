"use client";

import type { GlobeMode } from "@/types";
import { cn } from "@/lib/utils";

interface GlobeToolbarProps {
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
}

const MODES: { value: GlobeMode; label: string; icon: string }[] = [
  { value: "pins", label: "Pins", icon: "pin" },
  { value: "heatmap", label: "Heat Map", icon: "flame" },
  { value: "blankspots", label: "Blank Spots", icon: "map" },
];

export function GlobeToolbar({ mode, onModeChange }: GlobeToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center bg-surface/90 backdrop-blur-md rounded-full border border-border px-1 py-1 shadow-lg">
      {MODES.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            mode === m.value
              ? "bg-accent text-black shadow-sm"
              : "text-foreground/60 hover:text-foreground/90"
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
