export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function daysBetween(start: Date | string, end: Date | string) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
}

export function computeReturnRate(
  trips: { country: string }[]
): { rate: number; uniqueCountries: number; totalVisits: number } {
  const countryCounts = new Map<string, number>();
  for (const t of trips) {
    countryCounts.set(t.country, (countryCounts.get(t.country) || 0) + 1);
  }
  const uniqueCountries = countryCounts.size;
  const totalVisits = trips.length;
  const returnVisits = totalVisits - uniqueCountries;
  const rate = totalVisits > 0 ? (returnVisits / totalVisits) * 100 : 0;
  return { rate, uniqueCountries, totalVisits };
}
