import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Prisma 7 generated client on Vercel
  serverExternalPackages: ["@prisma/adapter-pg", "pg"],
  // Disable image optimization if not using Vercel's image service
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
