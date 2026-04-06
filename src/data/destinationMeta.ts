export type Vibe = "beach" | "city" | "nature" | "food";
export type Budget = "backpacker" | "mid-range" | "luxury";
export type ThemeKey = "eat" | "explore" | "connect" | "live";

export interface DestinationMeta {
  city: string;
  country: string;
  countryFlag: string;
  vibe: Vibe[];
  budget: Budget;
  bestMonths: number[];
  scores: Record<ThemeKey, number>;
  tagline: string;
  expertTip: string;
}

export const DESTINATIONS: DestinationMeta[] = [
  // Southeast Asia
  { city: "Bangkok", country: "Thailand", countryFlag: "\u{1F1F9}\u{1F1ED}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [11, 12, 1, 2, 3], scores: { eat: 5, explore: 4, connect: 4, live: 5 }, tagline: "Street food capital of the world.", expertTip: "Skip Khao San Road. The real food is in Chinatown's Yaowarat Road after dark." },
  { city: "Chiang Mai", country: "Thailand", countryFlag: "\u{1F1F9}\u{1F1ED}", vibe: ["food", "nature"], budget: "backpacker", bestMonths: [11, 12, 1, 2], scores: { eat: 4.5, explore: 4, connect: 4.5, live: 5 }, tagline: "Temples, mountains, and the best khao soi on earth.", expertTip: "Rent a scooter and drive to Doi Inthanon. The cloud forest at the top is magical." },
  { city: "Bali", country: "Indonesia", countryFlag: "\u{1F1EE}\u{1F1E9}", vibe: ["beach", "nature"], budget: "mid-range", bestMonths: [4, 5, 6, 7, 8, 9], scores: { eat: 4, explore: 4.5, connect: 3.5, live: 4 }, tagline: "Rice terraces, temples, and sunset cocktails.", expertTip: "Skip Kuta. Base yourself in Canggu or Ubud for a completely different (better) Bali." },
  { city: "Hanoi", country: "Vietnam", countryFlag: "\u{1F1FB}\u{1F1F3}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [10, 11, 3, 4], scores: { eat: 5, explore: 4, connect: 3.5, live: 5 }, tagline: "Pho at dawn, egg coffee at dusk.", expertTip: "Bun cha Huong Lien (the Obama restaurant) is actually great, not just hype." },
  { city: "Siem Reap", country: "Cambodia", countryFlag: "\u{1F1F0}\u{1F1ED}", vibe: ["nature", "city"], budget: "backpacker", bestMonths: [11, 12, 1, 2, 3], scores: { eat: 3.5, explore: 5, connect: 3.5, live: 5 }, tagline: "Angkor Wat and beyond.", expertTip: "Buy the 3-day pass. Day 1 crowds thin by day 3 and the remote temples are worth it." },
  // Japan
  { city: "Kyoto", country: "Japan", countryFlag: "\u{1F1EF}\u{1F1F5}", vibe: ["city", "nature"], budget: "mid-range", bestMonths: [3, 4, 10, 11], scores: { eat: 4.5, explore: 5, connect: 3, live: 3.5 }, tagline: "Where ancient meets immaculate.", expertTip: "Rent a bike. Kyoto is flat and you'll cover 3x more ground than on foot." },
  { city: "Osaka", country: "Japan", countryFlag: "\u{1F1EF}\u{1F1F5}", vibe: ["food", "city"], budget: "mid-range", bestMonths: [3, 4, 5, 10, 11], scores: { eat: 5, explore: 4, connect: 4.5, live: 3.5 }, tagline: "Japan's kitchen. Eat everything.", expertTip: "Dotonbori is tourist-heavy but the backstreet izakayas in Shinsekai are the real Osaka." },
  // Europe
  { city: "Lisbon", country: "Portugal", countryFlag: "\u{1F1F5}\u{1F1F9}", vibe: ["food", "city"], budget: "mid-range", bestMonths: [4, 5, 6, 9, 10], scores: { eat: 4.5, explore: 4.5, connect: 4, live: 3.5 }, tagline: "The hills will break your calves and your heart.", expertTip: "Take tram 28 at 8am before the tourist rush. Walk down, tram up." },
  { city: "Barcelona", country: "Spain", countryFlag: "\u{1F1EA}\u{1F1F8}", vibe: ["beach", "city", "food"], budget: "mid-range", bestMonths: [5, 6, 9, 10], scores: { eat: 4.5, explore: 4.5, connect: 5, live: 3.5 }, tagline: "Architecture, tapas, and beaches that actually deliver.", expertTip: "La Boqueria is overpriced. Mercat de Sant Antoni has the same quality for half the price." },
  { city: "Dubrovnik", country: "Croatia", countryFlag: "\u{1F1ED}\u{1F1F7}", vibe: ["beach", "city"], budget: "mid-range", bestMonths: [5, 6, 9], scores: { eat: 3.5, explore: 4.5, connect: 3.5, live: 3 }, tagline: "King's Landing in real life.", expertTip: "Kayak to Lokrum Island in the morning. The old town walls walk is best at golden hour." },
  { city: "Istanbul", country: "Turkey", countryFlag: "\u{1F1F9}\u{1F1F7}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [4, 5, 9, 10], scores: { eat: 5, explore: 5, connect: 4, live: 4.5 }, tagline: "Two continents, infinite layers.", expertTip: "Stay in Karakoy, not Sultanahmet. Better food, better bars, more local." },
  { city: "Santorini", country: "Greece", countryFlag: "\u{1F1EC}\u{1F1F7}", vibe: ["beach", "city"], budget: "luxury", bestMonths: [5, 6, 9, 10], scores: { eat: 4, explore: 4, connect: 3, live: 2.5 }, tagline: "The sunset that broke Instagram.", expertTip: "Oia is packed at sunset. Watch from Imerovigli instead \u2014 same view, no crowds." },
  { city: "Amsterdam", country: "Netherlands", countryFlag: "\u{1F1F3}\u{1F1F1}", vibe: ["city", "food"], budget: "mid-range", bestMonths: [4, 5, 6, 7, 8, 9], scores: { eat: 4, explore: 4, connect: 5, live: 3.5 }, tagline: "Canals, bikes, and Indonesian food you didn't expect.", expertTip: "The Rijksmuseum night tour is empty and magical. Book the 7pm slot." },
  { city: "Prague", country: "Czech Republic", countryFlag: "\u{1F1E8}\u{1F1FF}", vibe: ["city", "food"], budget: "backpacker", bestMonths: [4, 5, 6, 9, 10], scores: { eat: 3.5, explore: 4.5, connect: 4, live: 5 }, tagline: "Gothic beauty at backpacker prices.", expertTip: "Cross the Charles Bridge at 6am. You'll have it to yourself and the light is unreal." },
  { city: "Amalfi", country: "Italy", countryFlag: "\u{1F1EE}\u{1F1F9}", vibe: ["beach", "food"], budget: "luxury", bestMonths: [5, 6, 9, 10], scores: { eat: 5, explore: 4, connect: 3, live: 2.5 }, tagline: "Limoncello, cliffs, and pasta worth crying over.", expertTip: "Take the Path of the Gods hike from Agerola to Nocelle. The views are absurd." },
  // Americas
  { city: "Oaxaca", country: "Mexico", countryFlag: "\u{1F1F2}\u{1F1FD}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [10, 11, 12, 1, 2, 3], scores: { eat: 5, explore: 4.5, connect: 4, live: 4.5 }, tagline: "Mole, mezcal, and mountains.", expertTip: "Take a cooking class at Casa de los Sabores. You'll never make mole the same way again." },
  { city: "Medellin", country: "Colombia", countryFlag: "\u{1F1E8}\u{1F1F4}", vibe: ["city", "nature"], budget: "backpacker", bestMonths: [12, 1, 2, 3, 7, 8], scores: { eat: 4, explore: 4, connect: 5, live: 5 }, tagline: "Eternal spring and the friendliest city in South America.", expertTip: "Guatape day trip is essential. Climb the 740 steps of the Rock for a view you'll never forget." },
  { city: "Buenos Aires", country: "Argentina", countryFlag: "\u{1F1E6}\u{1F1F7}", vibe: ["food", "city"], budget: "mid-range", bestMonths: [3, 4, 5, 9, 10, 11], scores: { eat: 4.5, explore: 4, connect: 4.5, live: 4 }, tagline: "Steak, tango, and neighborhoods that each feel like a different city.", expertTip: "Take a tango lesson in San Telmo on Sunday, then hit the flea market." },
  { city: "Tulum", country: "Mexico", countryFlag: "\u{1F1F2}\u{1F1FD}", vibe: ["beach", "nature"], budget: "mid-range", bestMonths: [11, 12, 1, 2, 3, 4], scores: { eat: 3.5, explore: 4, connect: 3.5, live: 3 }, tagline: "Cenotes, ruins, and Caribbean turquoise.", expertTip: "Skip the beach clubs. Rent a bike and explore cenotes on your own \u2014 Gran Cenote at 8am." },
  { city: "Costa Rica", country: "Costa Rica", countryFlag: "\u{1F1E8}\u{1F1F7}", vibe: ["nature", "beach"], budget: "mid-range", bestMonths: [12, 1, 2, 3, 4], scores: { eat: 3, explore: 5, connect: 3.5, live: 3.5 }, tagline: "Pura vida isn't a slogan, it's real.", expertTip: "Monteverde cloud forest at dawn. The quetzal sightings are worth the early alarm." },
  // Africa & Middle East
  { city: "Marrakech", country: "Morocco", countryFlag: "\u{1F1F2}\u{1F1E6}", vibe: ["food", "city"], budget: "mid-range", bestMonths: [3, 4, 5, 10, 11], scores: { eat: 4.5, explore: 4.5, connect: 4, live: 3.5 }, tagline: "Sensory overload in the best way.", expertTip: "Get lost in the medina on purpose. The best riads and food stalls are the ones you stumble on." },
  { city: "Cape Town", country: "South Africa", countryFlag: "\u{1F1FF}\u{1F1E6}", vibe: ["nature", "city", "food"], budget: "mid-range", bestMonths: [10, 11, 12, 1, 2, 3], scores: { eat: 4, explore: 5, connect: 4, live: 4 }, tagline: "Table Mountain, wine country, and penguins.", expertTip: "Hike Lion's Head at full moon. The night hike with city lights below is otherworldly." },
  { city: "Zanzibar", country: "Tanzania", countryFlag: "\u{1F1F9}\u{1F1FF}", vibe: ["beach", "food"], budget: "backpacker", bestMonths: [6, 7, 8, 9, 1, 2], scores: { eat: 4, explore: 3.5, connect: 4, live: 4.5 }, tagline: "Spice island with powder-white beaches.", expertTip: "Stone Town night market at Forodhani Gardens. $2 for the best seafood platter of your life." },
  { city: "Petra", country: "Jordan", countryFlag: "\u{1F1EF}\u{1F1F4}", vibe: ["nature", "city"], budget: "mid-range", bestMonths: [3, 4, 5, 10, 11], scores: { eat: 3, explore: 5, connect: 3.5, live: 3.5 }, tagline: "A city carved from rose-red cliffs.", expertTip: "Book Petra by Night (Mon/Wed/Thu). Seeing the Treasury lit by 1,500 candles is surreal." },
  // South Asia
  { city: "Kerala", country: "India", countryFlag: "\u{1F1EE}\u{1F1F3}", vibe: ["nature", "food"], budget: "backpacker", bestMonths: [10, 11, 12, 1, 2, 3], scores: { eat: 4.5, explore: 4.5, connect: 4, live: 4.5 }, tagline: "Backwaters, spices, and Ayurveda.", expertTip: "Skip the tourist houseboats. Stay in a homestay in Munnar tea country instead." },
  { city: "Kathmandu", country: "Nepal", countryFlag: "\u{1F1F3}\u{1F1F5}", vibe: ["nature", "city"], budget: "backpacker", bestMonths: [10, 11, 3, 4, 5], scores: { eat: 3.5, explore: 5, connect: 4, live: 5 }, tagline: "Gateway to the Himalayas.", expertTip: "Poon Hill trek is 4 days, no permits needed, and the sunrise over Annapurna is peak." },
  // Oceania
  { city: "Queenstown", country: "New Zealand", countryFlag: "\u{1F1F3}\u{1F1FF}", vibe: ["nature"], budget: "mid-range", bestMonths: [12, 1, 2, 3, 4], scores: { eat: 3.5, explore: 5, connect: 3.5, live: 3 }, tagline: "Adventure capital. Not an exaggeration.", expertTip: "The Routeburn Track is better than the Milford Track and half the crowds." },
  // Nordic
  { city: "Reykjavik", country: "Iceland", countryFlag: "\u{1F1EE}\u{1F1F8}", vibe: ["nature"], budget: "luxury", bestMonths: [6, 7, 8, 9], scores: { eat: 3, explore: 5, connect: 3, live: 2 }, tagline: "Fire, ice, and the midnight sun.", expertTip: "Skip the Golden Circle tour. Rent a car and drive the Snaefellsnes peninsula instead." },
  { city: "Tromso", country: "Norway", countryFlag: "\u{1F1F3}\u{1F1F4}", vibe: ["nature"], budget: "luxury", bestMonths: [1, 2, 3, 9, 10, 11], scores: { eat: 3, explore: 5, connect: 3, live: 2 }, tagline: "Northern lights and Arctic wilderness.", expertTip: "Chase the aurora with a local guide, not a bus tour. Clear nights in Kvaloya are best." },
  // East Asia
  { city: "Seoul", country: "South Korea", countryFlag: "\u{1F1F0}\u{1F1F7}", vibe: ["food", "city"], budget: "mid-range", bestMonths: [4, 5, 9, 10], scores: { eat: 5, explore: 4, connect: 4.5, live: 4 }, tagline: "K-BBQ, K-beauty, and a city that never sleeps.", expertTip: "Gwangjang Market for bindaetteok at midnight. Hongdae for the vibe." },
  // Taiwan
  { city: "Taipei", country: "Taiwan", countryFlag: "\u{1F1F9}\u{1F1FC}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [3, 4, 5, 10, 11], scores: { eat: 5, explore: 4, connect: 4.5, live: 5 }, tagline: "Night markets, hot springs, and the best street food in Asia.", expertTip: "Shilin Night Market is classic but Raohe is better. Pepper bun line is worth the wait." },
  { city: "Tainan", country: "Taiwan", countryFlag: "\u{1F1F9}\u{1F1FC}", vibe: ["food", "city"], budget: "backpacker", bestMonths: [10, 11, 12, 1, 2, 3], scores: { eat: 5, explore: 4.5, connect: 4, live: 5 }, tagline: "Taiwan's oldest city and undisputed food capital.", expertTip: "Eat your way through the West Central District. Every alley has a 50-year-old stall worth finding." },
  { city: "Hualien", country: "Taiwan", countryFlag: "\u{1F1F9}\u{1F1FC}", vibe: ["nature"], budget: "backpacker", bestMonths: [4, 5, 6, 9, 10], scores: { eat: 3.5, explore: 5, connect: 3.5, live: 4.5 }, tagline: "Taroko Gorge and the Pacific coast.", expertTip: "Rent a scooter and ride the Suhua Highway. Bring a GoPro \u2014 the cliff-side views are insane." },
];

// Friend reviews keyed by country name
export const FRIEND_REVIEWS: Record<string, { friendName: string; friendColor: string; quote: string }> = {
  "France": { friendName: "Nomad Nina", friendColor: "#8B5CF6", quote: "Paris gets all the hype but the real magic is in the small towns. Spend time outside the city." },
  "Germany": { friendName: "Nomad Nina", friendColor: "#8B5CF6", quote: "Berlin is the most creative city I've ever been to. Stay in Kreuzberg." },
  "Turkey": { friendName: "Nomad Nina", friendColor: "#8B5CF6", quote: "Istanbul is the one city I'd move to tomorrow. The food alone is worth it." },
  "Japan": { friendName: "Nomad Nina", friendColor: "#8B5CF6", quote: "Everything about Japan is better than you imagine. Every. Single. Thing." },
  "Thailand": { friendName: "Drift Walker", friendColor: "#EC4899", quote: "Slow travel in Thailand changed my perspective. Don't rush through it." },
  "Indonesia": { friendName: "Drift Walker", friendColor: "#EC4899", quote: "Bali gets a bad rap from influencers but the real Bali is still there if you look." },
  "Vietnam": { friendName: "Drift Walker", friendColor: "#EC4899", quote: "The motorbike ride from Hanoi to Ha Long Bay is the best day I've had traveling." },
  "Italy": { friendName: "Waypoint Sam", friendColor: "#F59E0B", quote: "Skip Rome, head straight to the Amalfi coast. Trust me on this one." },
  "Spain": { friendName: "Waypoint Sam", friendColor: "#F59E0B", quote: "San Sebastian has the best food per square meter of any city on earth." },
  "Portugal": { friendName: "Waypoint Sam", friendColor: "#F59E0B", quote: "Lisbon is the new Berlin. Affordable, creative, and the light is incredible." },
  "Norway": { friendName: "Waypoint Sam", friendColor: "#F59E0B", quote: "The fjords made me cry. Actual tears. Budget accordingly — it's expensive." },
  "Australia": { friendName: "Waypoint Sam", friendColor: "#F59E0B", quote: "Sydney is beautiful but Melbourne has the soul. And the coffee." },
  "Brazil": { friendName: "Atlas Explorer", friendColor: "#06B6D4", quote: "Rio during carnival is sensory overload in the best possible way." },
  "Kenya": { friendName: "Atlas Explorer", friendColor: "#06B6D4", quote: "The Masai Mara at sunrise changed how I see the world. Not exaggerating." },
  "Egypt": { friendName: "Atlas Explorer", friendColor: "#06B6D4", quote: "The pyramids hit different in person. Photos don't capture the scale." },
  "South Africa": { friendName: "Atlas Explorer", friendColor: "#06B6D4", quote: "Cape Town is the most beautiful city I've ever seen. Full stop." },
  "Taiwan": { friendName: "Drift Walker", friendColor: "#EC4899", quote: "Taipei night markets ruined street food everywhere else for me. Go hungry, stay late." },
  "South Korea": { friendName: "Nomad Nina", friendColor: "#8B5CF6", quote: "Seoul is Tokyo's cooler younger sibling. The food scene is unmatched." },
};
