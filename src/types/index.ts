export type Visibility = "PUBLIC" | "FRIENDS" | "PRIVATE";
export type TripStatus = "PLANNED" | "ACTIVE" | "COMPLETED";
export type ParentType = "TRIP" | "REVIEW" | "JOURNAL_ENTRY";

export interface GlobePin {
  id: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  type: "past" | "future" | "wishlist";
  label?: string;
  tripId?: string;
  friendId?: string;
  friendName?: string;
}

export type GlobeMode = "pins" | "friends" | "blankspots";

export interface FriendData {
  id: string;
  name: string;
  username: string;
  color: string;
  pins: GlobePin[];
  visitedCountries: string[];
}

export interface TravelStats {
  countriesVisited: number;
  citiesVisited: number;
  continentsVisited: number;
  totalTrips: number;
  daysAbroad: number;
  longestTrip: number;
  returnRate: number;
  compassMiles: number;
  tier: number;
}

export interface CompassTier {
  tier: number;
  name: string;
  icon: string;
  minMiles: number;
}
