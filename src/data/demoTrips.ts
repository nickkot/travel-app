export interface DemoTrip {
  id: string;
  title: string;
  description: string;
  destinations: { city: string; country: string }[];
  startDate: string;
  endDate: string;
  status: string;
  visibility: string;
  upvoteCount: number;
  authorName: string;
  authorUsername: string;
  photos: { id: string; url: string; caption: string | null }[];
  journal: { id: string; content: string; date: string; locationCity: string; visibility: string; upvoteCount: number; authorName: string }[];
  reviews: { id: string; placeName: string; placeType: string; rating: number; content: string; city: string; upvoteCount: number }[];
  rating: { overall: number; eat: number; explore: number; connect: number; live: number };
}

export const DEMO_TRIPS: Record<string, DemoTrip> = {
  // US trips
  "us1": {
    id: "us1", title: "A Week in New York", description: "Brooklyn brownstones, Chinatown dumplings, rooftop sunsets over Manhattan.",
    destinations: [{ city: "New York", country: "United States" }],
    startDate: "2025-10-05", endDate: "2025-10-12", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 34, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/nyc1/600/400", caption: "Brooklyn Bridge at sunrise" },
      { id: "p2", url: "https://picsum.photos/seed/nyc2/600/400", caption: "Chinatown dumpling crawl" },
      { id: "p3", url: "https://picsum.photos/seed/nyc3/600/400", caption: "Central Park in October" },
    ],
    journal: [
      { id: "j1", content: "Landed at JFK. Took the A train to Brooklyn. The energy of this city hits you the second you step off the plane. Had dollar pizza at 2am and it was perfect.", date: "2025-10-05", locationCity: "New York", visibility: "PUBLIC", upvoteCount: 12, authorName: "Atlas Explorer" },
      { id: "j2", content: "Spent the whole day in Chinatown and the Lower East Side. Joe's Shanghai for soup dumplings. Then walked across the Brooklyn Bridge at golden hour.", date: "2025-10-07", locationCity: "New York", visibility: "PUBLIC", upvoteCount: 8, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Joe's Shanghai", placeType: "Restaurant", rating: 5, content: "The soup dumplings are worth the wait. Don't bother with anything else on the menu.", city: "New York", upvoteCount: 15 },
    ],
    rating: { overall: 4.5, eat: 5, explore: 4.5, connect: 4, live: 3.5 },
  },
  "us2": {
    id: "us2", title: "Los Angeles Road Trip", description: "PCH, tacos, hikes, and studio lots.",
    destinations: [{ city: "Los Angeles", country: "United States" }, { city: "Malibu", country: "United States" }],
    startDate: "2025-08-10", endDate: "2025-08-17", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 22, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/la1/600/400", caption: "Venice Beach at dusk" },
      { id: "p2", url: "https://picsum.photos/seed/la2/600/400", caption: "Griffith Observatory" },
      { id: "p3", url: "https://picsum.photos/seed/la3/600/400", caption: "Runyon Canyon hike" },
    ],
    journal: [
      { id: "j1", content: "Drove up PCH from Santa Monica to Malibu. Stopped at every taco stand. The fish tacos at Reel Inn are unreal.", date: "2025-08-12", locationCity: "Malibu", visibility: "PUBLIC", upvoteCount: 6, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Guerrilla Tacos", placeType: "Restaurant", rating: 5, content: "Fine dining tacos. The sweet potato taco changed my life.", city: "Los Angeles", upvoteCount: 9 },
    ],
    rating: { overall: 4, eat: 4.5, explore: 3.5, connect: 4, live: 3 },
  },
  "us3": {
    id: "us3", title: "Chicago in Three Days", description: "Deep dish, architecture, and jazz clubs.",
    destinations: [{ city: "Chicago", country: "United States" }],
    startDate: "2025-06-20", endDate: "2025-06-23", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 18, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/chi1/600/400", caption: "The Bean at sunrise" },
      { id: "p2", url: "https://picsum.photos/seed/chi2/600/400", caption: "Architecture boat tour" },
    ],
    journal: [
      { id: "j1", content: "The architecture boat tour is the single best tourist activity in any American city. Not even close. Deep dish at Lou Malnati's after.", date: "2025-06-21", locationCity: "Chicago", visibility: "PUBLIC", upvoteCount: 10, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Lou Malnati's", placeType: "Restaurant", rating: 4, content: "The buttercrust is the move. Skip Giordano's.", city: "Chicago", upvoteCount: 7 },
    ],
    rating: { overall: 4, eat: 4.5, explore: 4.5, connect: 4, live: 4 },
  },
  "us4": {
    id: "us4", title: "New Orleans Jazz Fest", description: "Beignets, brass bands, and bayou magic.",
    destinations: [{ city: "New Orleans", country: "United States" }],
    startDate: "2025-04-25", endDate: "2025-05-01", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 41, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/nola1/600/400", caption: "Frenchmen Street at midnight" },
      { id: "p2", url: "https://picsum.photos/seed/nola2/600/400", caption: "Beignets at Cafe Du Monde" },
    ],
    journal: [
      { id: "j1", content: "Frenchmen Street > Bourbon Street. Not even a debate. Caught a brass band playing in the street at 1am. This city runs on music and magic.", date: "2025-04-26", locationCity: "New Orleans", visibility: "PUBLIC", upvoteCount: 19, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Cafe Du Monde", placeType: "Cafe", rating: 4, content: "Overrated? Maybe. Still mandatory? Absolutely.", city: "New Orleans", upvoteCount: 11 },
    ],
    rating: { overall: 4.5, eat: 5, explore: 4, connect: 5, live: 4 },
  },
  // Canada trips
  "ca1": {
    id: "ca1", title: "Vancouver & Whistler", description: "Mountains, sushi, and Stanley Park.",
    destinations: [{ city: "Vancouver", country: "Canada" }, { city: "Whistler", country: "Canada" }],
    startDate: "2025-07-15", endDate: "2025-07-22", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 28, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/van1/600/400", caption: "Stanley Park seawall" },
      { id: "p2", url: "https://picsum.photos/seed/van2/600/400", caption: "Whistler Peak to Peak gondola" },
    ],
    journal: [
      { id: "j1", content: "Vancouver has the best sushi outside of Japan. Not debatable. Biked the entire Stanley Park seawall — 10km of ocean views.", date: "2025-07-16", locationCity: "Vancouver", visibility: "PUBLIC", upvoteCount: 14, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Miku Restaurant", placeType: "Restaurant", rating: 5, content: "Aburi sushi that rivals Tsukiji. The salmon oshi is art.", city: "Vancouver", upvoteCount: 12 },
    ],
    rating: { overall: 4.5, eat: 4.5, explore: 5, connect: 3.5, live: 3.5 },
  },
  "ca2": {
    id: "ca2", title: "Toronto Long Weekend", description: "Kensington Market, CN Tower, and the islands.",
    destinations: [{ city: "Toronto", country: "Canada" }],
    startDate: "2025-09-12", endDate: "2025-09-15", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 15, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/tor1/600/400", caption: "Kensington Market murals" },
      { id: "p2", url: "https://picsum.photos/seed/tor2/600/400", caption: "Toronto Islands sunset" },
    ],
    journal: [
      { id: "j1", content: "Kensington Market is Toronto's soul. Vintage shops, patios, and the best Jamaican patties in North America.", date: "2025-09-13", locationCity: "Toronto", visibility: "PUBLIC", upvoteCount: 7, authorName: "Atlas Explorer" },
    ],
    reviews: [],
    rating: { overall: 3.5, eat: 4, explore: 3.5, connect: 4, live: 3.5 },
  },
  "ca3": {
    id: "ca3", title: "Old Quebec in Autumn", description: "Cobblestones, poutine, and fall colors.",
    destinations: [{ city: "Quebec City", country: "Canada" }],
    startDate: "2025-10-18", endDate: "2025-10-22", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 20, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/qc1/600/400", caption: "Chateau Frontenac at dusk" },
      { id: "p2", url: "https://picsum.photos/seed/qc2/600/400", caption: "Petit Champlain in fall" },
    ],
    journal: [
      { id: "j1", content: "Quebec City in October is a fairy tale. The cobblestone streets, the fall leaves, the French everywhere. Closest you'll get to Europe without a passport.", date: "2025-10-19", locationCity: "Quebec City", visibility: "PUBLIC", upvoteCount: 11, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Chez Ashton", placeType: "Restaurant", rating: 4, content: "The poutine that started it all. Simple, perfect, mandatory.", city: "Quebec City", upvoteCount: 8 },
    ],
    rating: { overall: 4, eat: 4, explore: 4.5, connect: 3.5, live: 3.5 },
  },
  // Mexico trips
  "1": {
    id: "1", title: "Two Weeks in Oaxaca", description: "Exploring the culinary capital of Mexico. Mezcal tours, market visits, traditional cooking classes, and remote beaches.",
    destinations: [{ city: "Oaxaca City", country: "Mexico" }, { city: "Puerto Escondido", country: "Mexico" }],
    startDate: "2025-11-15", endDate: "2025-11-29", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 24, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/oaxaca1/600/400", caption: "Monte Alban at sunrise" },
      { id: "p2", url: "https://picsum.photos/seed/oaxaca2/600/400", caption: "Mercado Benito Juarez" },
      { id: "p3", url: "https://picsum.photos/seed/oaxaca3/600/400", caption: "Mezcal tasting in Matatan" },
      { id: "p4", url: "https://picsum.photos/seed/oaxaca4/600/400", caption: "Street art in Jalatlaco" },
    ],
    journal: [
      { id: "j1", content: "Arrived in Oaxaca City. The light here is incredible — golden hour lasts forever. Had tlayudas from a street vendor for dinner.", date: "2025-11-15", locationCity: "Oaxaca City", visibility: "PUBLIC", upvoteCount: 8, authorName: "Atlas Explorer" },
      { id: "j2", content: "Spent the morning at Mercado Benito Juarez. The chapulines are better than expected. Joined a mezcal tour in the afternoon.", date: "2025-11-17", locationCity: "Oaxaca City", visibility: "PUBLIC", upvoteCount: 15, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Mercado Benito Juarez", placeType: "Market", rating: 5, content: "The real heart of Oaxacan food culture. Skip the tourist restaurants.", city: "Oaxaca City", upvoteCount: 12 },
      { id: "r1b", placeName: "Mezcaloteca", placeType: "Bar", rating: 5, content: "Not a bar — an education. Changed how I think about spirits.", city: "Oaxaca City", upvoteCount: 9 },
    ],
    rating: { overall: 4.5, eat: 5, explore: 4.5, connect: 4, live: 4.5 },
  },
  "mx1": {
    id: "mx1", title: "Tulum Beach Days", description: "Cenotes, ruins, and Caribbean turquoise.",
    destinations: [{ city: "Tulum", country: "Mexico" }],
    startDate: "2026-01-05", endDate: "2026-01-12", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 19, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/tulum1/600/400", caption: "Gran Cenote at dawn" },
      { id: "p2", url: "https://picsum.photos/seed/tulum2/600/400", caption: "Tulum ruins over the sea" },
    ],
    journal: [
      { id: "j1", content: "Rented a bike and explored cenotes on my own. Gran Cenote at 8am before the crowds is otherworldly. The ruins perched above the Caribbean are unreal.", date: "2026-01-07", locationCity: "Tulum", visibility: "PUBLIC", upvoteCount: 8, authorName: "Atlas Explorer" },
    ],
    reviews: [],
    rating: { overall: 3.5, eat: 3.5, explore: 4, connect: 3.5, live: 3 },
  },
  "mx2": {
    id: "mx2", title: "Guadalajara & Tequila Trail", description: "Mariachi, tortas ahogadas, and agave fields.",
    destinations: [{ city: "Guadalajara", country: "Mexico" }, { city: "Tequila", country: "Mexico" }],
    startDate: "2025-12-10", endDate: "2025-12-16", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 16, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/gdl1/600/400", caption: "Tlaquepaque art walk" },
      { id: "p2", url: "https://picsum.photos/seed/gdl2/600/400", caption: "Agave fields in Tequila" },
    ],
    journal: [
      { id: "j1", content: "Guadalajara is the most underrated city in Mexico. The food scene is incredible, the mariachi in Plaza de los Mariachis is real, and the day trip to Tequila through the agave fields is pure magic.", date: "2025-12-12", locationCity: "Guadalajara", visibility: "PUBLIC", upvoteCount: 9, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "La Tequila", placeType: "Restaurant", rating: 4, content: "Upscale Mexican with a tequila menu that'll ruin you for anything else.", city: "Guadalajara", upvoteCount: 6 },
    ],
    rating: { overall: 4, eat: 4.5, explore: 4, connect: 4.5, live: 4.5 },
  },
  // International trips (brief versions)
  "2": {
    id: "2", title: "Japan Golden Route", description: "Tokyo, Kyoto, Osaka — the classic route done right.",
    destinations: [{ city: "Tokyo", country: "Japan" }, { city: "Kyoto", country: "Japan" }, { city: "Osaka", country: "Japan" }],
    startDate: "2025-03-20", endDate: "2025-04-10", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 56, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/tokyo1/600/400", caption: "Shibuya crossing" },
      { id: "p2", url: "https://picsum.photos/seed/kyoto1/600/400", caption: "Fushimi Inari at dawn" },
      { id: "p3", url: "https://picsum.photos/seed/osaka1/600/400", caption: "Dotonbori at night" },
    ],
    journal: [
      { id: "j1", content: "Everything about Japan is better than you imagine. The trains, the food, the people, the attention to detail. Fushimi Inari at 5am with nobody there.", date: "2025-03-25", locationCity: "Kyoto", visibility: "PUBLIC", upvoteCount: 22, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Ichiran Ramen", placeType: "Restaurant", rating: 5, content: "Solo ramen booth with a curtain. Customize everything. Perfect.", city: "Tokyo", upvoteCount: 18 },
    ],
    rating: { overall: 5, eat: 5, explore: 5, connect: 3.5, live: 4 },
  },
  "3": {
    id: "3", title: "Rome in 5 Days", description: "Colosseum, carbonara, and cobblestones.",
    destinations: [{ city: "Rome", country: "Italy" }],
    startDate: "2025-05-10", endDate: "2025-05-15", status: "COMPLETED", visibility: "PUBLIC",
    upvoteCount: 31, authorName: "Atlas Explorer", authorUsername: "atlas_explorer",
    photos: [
      { id: "p1", url: "https://picsum.photos/seed/rome1/600/400", caption: "Colosseum at golden hour" },
      { id: "p2", url: "https://picsum.photos/seed/rome2/600/400", caption: "Trastevere at night" },
    ],
    journal: [
      { id: "j1", content: "Rome is overwhelming in the best way. Every corner is a postcard. The carbonara at Roscioli changed my life.", date: "2025-05-11", locationCity: "Rome", visibility: "PUBLIC", upvoteCount: 14, authorName: "Atlas Explorer" },
    ],
    reviews: [
      { id: "r1", placeName: "Roscioli", placeType: "Restaurant", rating: 5, content: "The carbonara that ruins all other carbonara forever.", city: "Rome", upvoteCount: 20 },
    ],
    rating: { overall: 4.5, eat: 5, explore: 5, connect: 4, live: 3.5 },
  },
};

export function getTripById(id: string): DemoTrip | null {
  return DEMO_TRIPS[id] || null;
}
