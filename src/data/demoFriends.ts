import type { FriendData, GlobePin } from "@/types";

export const DEMO_FRIENDS: FriendData[] = [
  {
    id: "fr1",
    name: "Nomad Nina",
    username: "nomad_nina",
    color: "#8B5CF6",
    pins: [
      { id: "fr1-1", lat: 48.8566, lng: 2.3522, city: "Paris", country: "France", type: "past" },
      { id: "fr1-2", lat: 52.5200, lng: 13.4050, city: "Berlin", country: "Germany", type: "past" },
      { id: "fr1-3", lat: 41.0082, lng: 28.9784, city: "Istanbul", country: "Turkey", type: "past" },
      { id: "fr1-4", lat: 35.6762, lng: 139.6503, city: "Tokyo", country: "Japan", type: "past" },
      { id: "fr1-5", lat: 25.2048, lng: 55.2708, city: "Dubai", country: "UAE", type: "past" },
    ],
    visitedCountries: ["France", "Germany", "Turkey", "Japan", "UAE"],
  },
  {
    id: "fr2",
    name: "Drift Walker",
    username: "drift_walker",
    color: "#EC4899",
    pins: [
      { id: "fr2-1", lat: 13.7563, lng: 100.5018, city: "Bangkok", country: "Thailand", type: "past" },
      { id: "fr2-2", lat: -8.3405, lng: 115.092, city: "Bali", country: "Indonesia", type: "past" },
      { id: "fr2-3", lat: 21.0285, lng: 105.8542, city: "Hanoi", country: "Vietnam", type: "past" },
      { id: "fr2-4", lat: 1.3521, lng: 103.8198, city: "Singapore", country: "Singapore", type: "past" },
    ],
    visitedCountries: ["Thailand", "Indonesia", "Vietnam", "Singapore"],
  },
  {
    id: "fr3",
    name: "Waypoint Sam",
    username: "waypoint_sam",
    color: "#F59E0B",
    pins: [
      { id: "fr3-1", lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy", type: "past" },
      { id: "fr3-2", lat: 40.4168, lng: -3.7038, city: "Madrid", country: "Spain", type: "past" },
      { id: "fr3-3", lat: 38.7223, lng: -9.1393, city: "Lisbon", country: "Portugal", type: "past" },
      { id: "fr3-4", lat: 59.9139, lng: 10.7522, city: "Oslo", country: "Norway", type: "past" },
      { id: "fr3-5", lat: -33.8688, lng: 151.2093, city: "Sydney", country: "Australia", type: "past" },
    ],
    visitedCountries: ["Italy", "Spain", "Portugal", "Norway", "Australia"],
  },
  {
    id: "fr4",
    name: "Atlas Explorer",
    username: "atlas_explorer",
    color: "#06B6D4",
    pins: [
      { id: "fr4-1", lat: -22.9068, lng: -43.1729, city: "Rio de Janeiro", country: "Brazil", type: "past" },
      { id: "fr4-2", lat: -1.2921, lng: 36.8219, city: "Nairobi", country: "Kenya", type: "past" },
      { id: "fr4-3", lat: 30.0444, lng: 31.2357, city: "Cairo", country: "Egypt", type: "past" },
      { id: "fr4-4", lat: -15.3875, lng: 28.3228, city: "Lusaka", country: "Zambia", type: "past" },
    ],
    visitedCountries: ["Brazil", "Kenya", "Egypt", "Zambia"],
  },
];

/** Flatten all friend pins with friendId/friendName set */
export function getAllFriendPins(friends: FriendData[]): GlobePin[] {
  return friends.flatMap((f) =>
    f.pins.map((pin) => ({
      ...pin,
      friendId: f.id,
      friendName: f.name,
    }))
  );
}
