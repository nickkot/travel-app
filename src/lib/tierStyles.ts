// Shared Compass Club tier styles — used by CompassClub, FriendLegend, etc.

export const TIER_BADGE_STYLES: Record<number, { bg: string; text: string }> = {
  1: { bg: "bg-[#e8dcc0]", text: "text-[#6b5740]" },
  2: { bg: "bg-[#d4e8d8]", text: "text-[#3a6b48]" },
  3: { bg: "bg-[#e8dcc0]", text: "text-[#c4623a]" },
  4: { bg: "bg-[#d8d0e8]", text: "text-[#5a3a8a]" },
  5: { bg: "bg-[#1c2b4a]", text: "text-[#f0e8d5]" },
};

export const TIER_PROGRESS_COLORS: Record<number, string> = {
  1: "bg-[#6b5740]",
  2: "bg-[#3a6b48]",
  3: "bg-[#c4623a]",
  4: "bg-[#5a3a8a]",
  5: "bg-[#1c2b4a]",
};

export const TIER_ICONS: Record<string, string> = {
  compass: "\u{1F9ED}",
  binoculars: "\u{1F50D}",
  map: "\u{1F5FA}",
  "ship-wheel": "\u{2699}",
  "north-star": "\u{2B50}",
};
