import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stampy — Travel Deeper",
    short_name: "Stampy",
    description:
      "A social platform for travelers, not tourists. Share your journeys, discover hidden gems, and earn your place in the Compass Club.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#1c2b4a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
