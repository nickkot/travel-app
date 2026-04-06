// Country + city data with coordinates for destination search
// Covers major travel destinations worldwide

export interface CountryData {
  name: string;
  code: string;
  cities: { name: string; lat: number; lng: number }[];
}

export const COUNTRIES: CountryData[] = [
  { name: "Argentina", code: "AR", cities: [
    { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
    { name: "Mendoza", lat: -32.8895, lng: -68.8458 },
    { name: "El Chalten", lat: -49.3315, lng: -72.8862 },
    { name: "Ushuaia", lat: -54.8019, lng: -68.3030 },
    { name: "Bariloche", lat: -41.1335, lng: -71.3103 },
  ]},
  { name: "Australia", code: "AU", cities: [
    { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
    { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
    { name: "Perth", lat: -31.9505, lng: 115.8605 },
    { name: "Cairns", lat: -16.9186, lng: 145.7781 },
  ]},
  { name: "Brazil", code: "BR", cities: [
    { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
    { name: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
    { name: "Salvador", lat: -12.9714, lng: -38.5124 },
    { name: "Florianopolis", lat: -27.5954, lng: -48.5480 },
  ]},
  { name: "Cambodia", code: "KH", cities: [
    { name: "Siem Reap", lat: 13.3671, lng: 103.8448 },
    { name: "Phnom Penh", lat: 11.5564, lng: 104.9282 },
  ]},
  { name: "Chile", code: "CL", cities: [
    { name: "Santiago", lat: -33.4489, lng: -70.6693 },
    { name: "Valparaiso", lat: -33.0472, lng: -71.6127 },
    { name: "Torres del Paine", lat: -51.2538, lng: -72.3467 },
  ]},
  { name: "China", code: "CN", cities: [
    { name: "Beijing", lat: 39.9042, lng: 116.4074 },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    { name: "Chengdu", lat: 30.5728, lng: 104.0668 },
    { name: "Guilin", lat: 25.2742, lng: 110.2903 },
    { name: "Xi'an", lat: 34.3416, lng: 108.9398 },
  ]},
  { name: "Colombia", code: "CO", cities: [
    { name: "Bogota", lat: 4.7110, lng: -74.0721 },
    { name: "Medellin", lat: 6.2476, lng: -75.5658 },
    { name: "Cartagena", lat: 10.3910, lng: -75.5364 },
  ]},
  { name: "Costa Rica", code: "CR", cities: [
    { name: "San Jose", lat: 9.9281, lng: -84.0907 },
    { name: "Tamarindo", lat: 10.2994, lng: -85.8374 },
    { name: "Monteverde", lat: 10.3152, lng: -84.8253 },
  ]},
  { name: "Croatia", code: "HR", cities: [
    { name: "Dubrovnik", lat: 42.6507, lng: 18.0944 },
    { name: "Split", lat: 43.5081, lng: 16.4402 },
    { name: "Zagreb", lat: 45.8150, lng: 15.9819 },
  ]},
  { name: "Czech Republic", code: "CZ", cities: [
    { name: "Prague", lat: 50.0755, lng: 14.4378 },
  ]},
  { name: "Egypt", code: "EG", cities: [
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Luxor", lat: 25.6872, lng: 32.6396 },
    { name: "Aswan", lat: 24.0889, lng: 32.8998 },
  ]},
  { name: "Ethiopia", code: "ET", cities: [
    { name: "Addis Ababa", lat: 9.0250, lng: 38.7469 },
    { name: "Lalibela", lat: 12.0319, lng: 39.0472 },
  ]},
  { name: "France", code: "FR", cities: [
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Nice", lat: 43.7102, lng: 7.2620 },
    { name: "Lyon", lat: 45.7640, lng: 4.8357 },
    { name: "Marseille", lat: 43.2965, lng: 5.3698 },
    { name: "Bordeaux", lat: 44.8378, lng: -0.5792 },
  ]},
  { name: "Georgia", code: "GE", cities: [
    { name: "Tbilisi", lat: 41.7151, lng: 44.8271 },
    { name: "Batumi", lat: 41.6434, lng: 41.6339 },
  ]},
  { name: "Germany", code: "DE", cities: [
    { name: "Berlin", lat: 52.5200, lng: 13.4050 },
    { name: "Munich", lat: 48.1351, lng: 11.5820 },
    { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  ]},
  { name: "Greece", code: "GR", cities: [
    { name: "Athens", lat: 37.9838, lng: 23.7275 },
    { name: "Santorini", lat: 36.3932, lng: 25.4615 },
    { name: "Mykonos", lat: 37.4467, lng: 25.3289 },
    { name: "Crete", lat: 35.2401, lng: 24.8093 },
  ]},
  { name: "Iceland", code: "IS", cities: [
    { name: "Reykjavik", lat: 64.1466, lng: -21.9426 },
    { name: "Akureyri", lat: 65.6835, lng: -18.0878 },
    { name: "Vik", lat: 63.4186, lng: -19.0060 },
  ]},
  { name: "India", code: "IN", cities: [
    { name: "Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Goa", lat: 15.2993, lng: 74.1240 },
    { name: "Agra", lat: 27.1767, lng: 78.0081 },
    { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
    { name: "Kerala", lat: 10.8505, lng: 76.2711 },
  ]},
  { name: "Indonesia", code: "ID", cities: [
    { name: "Bali", lat: -8.3405, lng: 115.0920 },
    { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
    { name: "Yogyakarta", lat: -7.7956, lng: 110.3695 },
    { name: "Lombok", lat: -8.6500, lng: 116.3249 },
  ]},
  { name: "Ireland", code: "IE", cities: [
    { name: "Dublin", lat: 53.3498, lng: -6.2603 },
    { name: "Galway", lat: 53.2707, lng: -9.0568 },
  ]},
  { name: "Israel", code: "IL", cities: [
    { name: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
    { name: "Jerusalem", lat: 31.7683, lng: 35.2137 },
  ]},
  { name: "Italy", code: "IT", cities: [
    { name: "Rome", lat: 41.9028, lng: 12.4964 },
    { name: "Florence", lat: 43.7696, lng: 11.2558 },
    { name: "Venice", lat: 45.4408, lng: 12.3155 },
    { name: "Milan", lat: 45.4642, lng: 9.1900 },
    { name: "Naples", lat: 40.8518, lng: 14.2681 },
    { name: "Amalfi", lat: 40.6340, lng: 14.6027 },
  ]},
  { name: "Japan", code: "JP", cities: [
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { name: "Kyoto", lat: 35.0116, lng: 135.7681 },
    { name: "Osaka", lat: 34.6937, lng: 135.5023 },
    { name: "Hiroshima", lat: 34.3853, lng: 132.4553 },
    { name: "Okinawa", lat: 26.3344, lng: 127.8056 },
  ]},
  { name: "Jordan", code: "JO", cities: [
    { name: "Amman", lat: 31.9454, lng: 35.9284 },
    { name: "Petra", lat: 30.3285, lng: 35.4444 },
  ]},
  { name: "Kenya", code: "KE", cities: [
    { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
    { name: "Mombasa", lat: -4.0435, lng: 39.6682 },
    { name: "Masai Mara", lat: -1.4061, lng: 35.0168 },
  ]},
  { name: "Mexico", code: "MX", cities: [
    { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
    { name: "Oaxaca", lat: 17.0654, lng: -96.7236 },
    { name: "Tulum", lat: 20.2116, lng: -87.4654 },
    { name: "San Miguel de Allende", lat: 20.9144, lng: -100.7452 },
    { name: "Puerto Vallarta", lat: 20.6534, lng: -105.2253 },
    { name: "Merida", lat: 20.9674, lng: -89.5926 },
  ]},
  { name: "Morocco", code: "MA", cities: [
    { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
    { name: "Fes", lat: 34.0181, lng: -5.0078 },
    { name: "Chefchaouen", lat: 35.1688, lng: -5.2636 },
    { name: "Merzouga", lat: 31.0981, lng: -4.0132 },
  ]},
  { name: "Nepal", code: "NP", cities: [
    { name: "Kathmandu", lat: 27.7172, lng: 85.3240 },
    { name: "Pokhara", lat: 28.2096, lng: 83.9856 },
  ]},
  { name: "Netherlands", code: "NL", cities: [
    { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
    { name: "Rotterdam", lat: 51.9244, lng: 4.4777 },
  ]},
  { name: "New Zealand", code: "NZ", cities: [
    { name: "Auckland", lat: -36.8485, lng: 174.7633 },
    { name: "Queenstown", lat: -45.0312, lng: 168.6626 },
    { name: "Wellington", lat: -41.2865, lng: 174.7762 },
  ]},
  { name: "Norway", code: "NO", cities: [
    { name: "Oslo", lat: 59.9139, lng: 10.7522 },
    { name: "Bergen", lat: 60.3913, lng: 5.3221 },
    { name: "Tromso", lat: 69.6492, lng: 18.9553 },
  ]},
  { name: "Peru", code: "PE", cities: [
    { name: "Lima", lat: -12.0464, lng: -77.0428 },
    { name: "Cusco", lat: -13.1631, lng: -72.5450 },
    { name: "Arequipa", lat: -16.4090, lng: -71.5375 },
  ]},
  { name: "Philippines", code: "PH", cities: [
    { name: "Manila", lat: 14.5995, lng: 120.9842 },
    { name: "El Nido", lat: 11.1784, lng: 119.3930 },
    { name: "Cebu", lat: 10.3157, lng: 123.8854 },
  ]},
  { name: "Portugal", code: "PT", cities: [
    { name: "Lisbon", lat: 38.7223, lng: -9.1393 },
    { name: "Porto", lat: 41.1579, lng: -8.6291 },
    { name: "Lagos", lat: 37.1028, lng: -8.6731 },
    { name: "Sintra", lat: 38.7981, lng: -9.3880 },
  ]},
  { name: "Russia", code: "RU", cities: [
    { name: "Moscow", lat: 55.7558, lng: 37.6173 },
    { name: "St. Petersburg", lat: 59.9311, lng: 30.3609 },
  ]},
  { name: "Singapore", code: "SG", cities: [
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  ]},
  { name: "South Africa", code: "ZA", cities: [
    { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
    { name: "Johannesburg", lat: -26.2041, lng: 28.0473 },
    { name: "Kruger National Park", lat: -23.9884, lng: 31.5547 },
  ]},
  { name: "South Korea", code: "KR", cities: [
    { name: "Seoul", lat: 37.5665, lng: 126.9780 },
    { name: "Busan", lat: 35.1796, lng: 129.0756 },
    { name: "Jeju", lat: 33.4996, lng: 126.5312 },
  ]},
  { name: "Spain", code: "ES", cities: [
    { name: "Barcelona", lat: 41.3874, lng: 2.1686 },
    { name: "Madrid", lat: 40.4168, lng: -3.7038 },
    { name: "Seville", lat: 37.3891, lng: -5.9845 },
    { name: "San Sebastian", lat: 43.3183, lng: -1.9812 },
    { name: "Granada", lat: 37.1773, lng: -3.5986 },
  ]},
  { name: "Sri Lanka", code: "LK", cities: [
    { name: "Colombo", lat: 6.9271, lng: 79.8612 },
    { name: "Ella", lat: 6.8667, lng: 81.0466 },
    { name: "Kandy", lat: 7.2906, lng: 80.6337 },
  ]},
  { name: "Sweden", code: "SE", cities: [
    { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
    { name: "Gothenburg", lat: 57.7089, lng: 11.9746 },
  ]},
  { name: "Switzerland", code: "CH", cities: [
    { name: "Zurich", lat: 47.3769, lng: 8.5417 },
    { name: "Interlaken", lat: 46.6863, lng: 7.8632 },
    { name: "Zermatt", lat: 46.0207, lng: 7.7491 },
  ]},
  { name: "Tanzania", code: "TZ", cities: [
    { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },
    { name: "Zanzibar", lat: -6.1659, lng: 39.1989 },
    { name: "Moshi", lat: -3.3353, lng: 37.3407 },
  ]},
  { name: "Taiwan", code: "TW", cities: [
    { name: "Taipei", lat: 25.0330, lng: 121.5654 },
    { name: "Kaohsiung", lat: 22.6273, lng: 120.3014 },
    { name: "Tainan", lat: 22.9998, lng: 120.2269 },
    { name: "Hualien", lat: 23.9871, lng: 121.6016 },
    { name: "Jiufen", lat: 25.1092, lng: 121.8443 },
  ]},
  { name: "Thailand", code: "TH", cities: [
    { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
    { name: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    { name: "Phuket", lat: 7.8804, lng: 98.3923 },
    { name: "Koh Samui", lat: 9.5120, lng: 100.0136 },
    { name: "Krabi", lat: 8.0863, lng: 98.9063 },
  ]},
  { name: "Turkey", code: "TR", cities: [
    { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
    { name: "Cappadocia", lat: 38.6431, lng: 34.8289 },
    { name: "Antalya", lat: 36.8969, lng: 30.7133 },
    { name: "Bodrum", lat: 37.0344, lng: 27.4305 },
  ]},
  { name: "UAE", code: "AE", cities: [
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 },
  ]},
  { name: "United Kingdom", code: "GB", cities: [
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Edinburgh", lat: 55.9533, lng: -3.1883 },
    { name: "Manchester", lat: 53.4808, lng: -2.2426 },
    { name: "Bath", lat: 51.3811, lng: -2.3590 },
  ]},
  { name: "United States", code: "US", cities: [
    { name: "New York", lat: 40.7128, lng: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
    { name: "Miami", lat: 25.7617, lng: -80.1918 },
    { name: "Chicago", lat: 41.8781, lng: -87.6298 },
    { name: "Honolulu", lat: 21.3069, lng: -157.8583 },
    { name: "Austin", lat: 30.2672, lng: -97.7431 },
    { name: "New Orleans", lat: 29.9511, lng: -90.0715 },
    { name: "Nashville", lat: 36.1627, lng: -86.7816 },
    { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  ]},
  { name: "Vietnam", code: "VN", cities: [
    { name: "Hanoi", lat: 21.0285, lng: 105.8542 },
    { name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
    { name: "Hoi An", lat: 15.8801, lng: 108.3380 },
    { name: "Da Nang", lat: 16.0544, lng: 108.2022 },
    { name: "Ha Long Bay", lat: 20.9101, lng: 107.1839 },
  ]},
  { name: "Zambia", code: "ZM", cities: [
    { name: "Lusaka", lat: -15.3875, lng: 28.3228 },
    { name: "Livingstone", lat: -17.8419, lng: 25.8544 },
  ]},
];

export function searchCountries(query: string): CountryData[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
}

export function getCitiesForCountry(countryName: string): CountryData["cities"] {
  const country = COUNTRIES.find((c) => c.name.toLowerCase() === countryName.toLowerCase());
  return country?.cities || [];
}

export function searchCities(countryName: string, query: string): CountryData["cities"] {
  const cities = getCitiesForCountry(countryName);
  if (!query.trim()) return cities;
  const q = query.toLowerCase();
  return cities.filter((c) => c.name.toLowerCase().includes(q));
}
