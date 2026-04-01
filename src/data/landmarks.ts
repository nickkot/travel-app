export interface Landmark {
  id: string;
  lat: number;
  lng: number;
  icon: string;
  name: string;
  city: string;
}

export const LANDMARKS: Landmark[] = [
  // Americas
  { id: "lm-gg", lat: 37.8199, lng: -122.4783, icon: "\u{1F309}", name: "Golden Gate Bridge", city: "San Francisco" },
  { id: "lm-sol", lat: 40.6892, lng: -74.0445, icon: "\u{1F5FD}", name: "Statue of Liberty", city: "New York" },
  { id: "lm-cdr", lat: -22.9519, lng: -43.2105, icon: "\u{1F5FF}", name: "Christ the Redeemer", city: "Rio de Janeiro" },
  { id: "lm-mp", lat: -13.1631, lng: -72.545, icon: "\u{1F3D4}\u{FE0F}", name: "Machu Picchu", city: "Cusco" },
  { id: "lm-chi", lat: 20.6843, lng: -88.5678, icon: "\u{1F3DB}\u{FE0F}", name: "Chichen Itza", city: "Yucatan" },

  // Europe
  { id: "lm-eif", lat: 48.8584, lng: 2.2945, icon: "\u{1F5FC}", name: "Eiffel Tower", city: "Paris" },
  { id: "lm-bb", lat: 51.5007, lng: -0.1246, icon: "\u{1F3F0}", name: "Big Ben", city: "London" },
  { id: "lm-col", lat: 41.8902, lng: 12.4922, icon: "\u{1F3DF}\u{FE0F}", name: "Colosseum", city: "Rome" },
  { id: "lm-par", lat: 37.9715, lng: 23.7267, icon: "\u{1F3DB}\u{FE0F}", name: "Parthenon", city: "Athens" },
  { id: "lm-ven", lat: 45.4408, lng: 12.3155, icon: "\u{1F6F6}", name: "Venice Canals", city: "Venice" },
  { id: "lm-ams", lat: 52.3676, lng: 4.9041, icon: "\u{1F337}", name: "Tulip Fields", city: "Amsterdam" },
  { id: "lm-rs", lat: 55.7539, lng: 37.6208, icon: "\u{1F3F0}", name: "Red Square", city: "Moscow" },

  // Asia
  { id: "lm-taj", lat: 27.1751, lng: 78.0421, icon: "\u{1F54C}", name: "Taj Mahal", city: "Agra" },
  { id: "lm-kab", lat: 21.4225, lng: 39.8262, icon: "\u{1F54B}", name: "Kaaba", city: "Mecca" },
  { id: "lm-gw", lat: 40.4319, lng: 116.5704, icon: "\u{1F3EF}", name: "Great Wall", city: "Beijing" },
  { id: "lm-ev", lat: 27.9881, lng: 86.925, icon: "\u{1F3D4}\u{FE0F}", name: "Mt Everest", city: "Himalayas" },
  { id: "lm-tor", lat: 34.9671, lng: 135.7727, icon: "\u{26E9}\u{FE0F}", name: "Fushimi Inari", city: "Kyoto" },
  { id: "lm-sak", lat: 35.3606, lng: 138.7274, icon: "\u{1F338}", name: "Mt Fuji", city: "Japan" },
  { id: "lm-aw", lat: 13.4125, lng: 103.867, icon: "\u{1F6D5}", name: "Angkor Wat", city: "Siem Reap" },
  { id: "lm-bk", lat: 25.1972, lng: 55.2744, icon: "\u{1F3D9}\u{FE0F}", name: "Burj Khalifa", city: "Dubai" },

  // Africa
  { id: "lm-pyr", lat: 29.9792, lng: 31.1342, icon: "\u{1F4D0}", name: "Pyramids of Giza", city: "Cairo" },
  { id: "lm-saf", lat: -1.2921, lng: 36.8219, icon: "\u{1F981}", name: "Safari", city: "Nairobi" },
  { id: "lm-tm", lat: -33.9628, lng: 18.4098, icon: "\u{26F0}\u{FE0F}", name: "Table Mountain", city: "Cape Town" },
  { id: "lm-sah", lat: 31.7917, lng: -7.0926, icon: "\u{1F42A}", name: "Sahara Desert", city: "Morocco" },

  // Oceania
  { id: "lm-soh", lat: -33.8568, lng: 151.2153, icon: "\u{1F3AD}", name: "Sydney Opera House", city: "Sydney" },

  // Special
  { id: "lm-moai", lat: -27.1127, lng: -109.3497, icon: "\u{1F5FF}", name: "Moai Statues", city: "Easter Island" },
  { id: "lm-nl", lat: 64.1466, lng: -21.9426, icon: "\u{1F30C}", name: "Northern Lights", city: "Iceland" },
];
