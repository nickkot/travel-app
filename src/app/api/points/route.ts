import { prisma } from "@/lib/prisma";
import { getTierForMiles, MILES_ACTIONS, BADGE_DEFINITIONS } from "@/lib/points";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { compassMiles: true, tier: true },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const badges = await prisma.badge.findMany({
    where: { userId },
  });

  return Response.json({
    compassMiles: user.compassMiles,
    tier: user.tier,
    badges: badges.map((b) => b.badgeType),
  });
}

// Recalculate miles and check badge eligibility
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, action, amount } = body;

  if (!userId || !action) {
    return Response.json(
      { error: "userId and action are required" },
      { status: 400 }
    );
  }

  const milesAmount =
    amount || MILES_ACTIONS[action as keyof typeof MILES_ACTIONS] || 0;

  // Update miles
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      compassMiles: { increment: milesAmount },
    },
  });

  // Recalculate tier
  const newTier = getTierForMiles(user.compassMiles);
  if (newTier.tier !== user.tier) {
    await prisma.user.update({
      where: { id: userId },
      data: { tier: newTier.tier },
    });
  }

  // Check badge eligibility
  const earnedBadges = await checkBadgeEligibility(userId);

  return Response.json({
    compassMiles: user.compassMiles,
    tier: newTier.tier,
    newBadges: earnedBadges,
  });
}

async function checkBadgeEligibility(userId: string): Promise<string[]> {
  const newBadges: string[] = [];

  // Get user's existing badges
  const existingBadges = await prisma.badge.findMany({
    where: { userId },
    select: { badgeType: true },
  });
  const earnedSet = new Set(existingBadges.map((b) => b.badgeType));

  // Get user's trip destinations for analysis
  const destinations = await prisma.tripDestination.findMany({
    where: { trip: { userId } },
    include: { trip: { select: { startDate: true, endDate: true } } },
  });

  // Deep Roots: revisited 3+ different countries
  if (!earnedSet.has("deep_roots")) {
    const countryCounts = new Map<string, number>();
    for (const d of destinations) {
      countryCounts.set(d.country, (countryCounts.get(d.country) || 0) + 1);
    }
    const revisitedCountries = [...countryCounts.values()].filter(
      (c) => c >= 2
    ).length;
    if (revisitedCountries >= 3) {
      await prisma.badge.create({
        data: { userId, badgeType: "deep_roots" },
      });
      newBadges.push("deep_roots");
    }
  }

  // Return Flight: revisited same destination 3+ times
  if (!earnedSet.has("return_flight")) {
    const destCounts = new Map<string, number>();
    for (const d of destinations) {
      const key = `${d.city}-${d.country}`;
      destCounts.set(key, (destCounts.get(key) || 0) + 1);
    }
    const hasReturn = [...destCounts.values()].some((c) => c >= 3);
    if (hasReturn) {
      await prisma.badge.create({
        data: { userId, badgeType: "return_flight" },
      });
      newBadges.push("return_flight");
    }
  }

  // Hemisphere Hopper: visited all 4 hemispheres
  if (!earnedSet.has("hemisphere_hopper")) {
    const hemispheres = new Set<string>();
    for (const d of destinations) {
      hemispheres.add(d.lat >= 0 ? "north" : "south");
      hemispheres.add(d.lng >= 0 ? "east" : "west");
    }
    if (hemispheres.size >= 4) {
      await prisma.badge.create({
        data: { userId, badgeType: "hemisphere_hopper" },
      });
      newBadges.push("hemisphere_hopper");
    }
  }

  // Midnight Sun: traveled above Arctic Circle (66.5N)
  if (!earnedSet.has("midnight_sun")) {
    const aboveArctic = destinations.some((d) => d.lat > 66.5);
    if (aboveArctic) {
      await prisma.badge.create({
        data: { userId, badgeType: "midnight_sun" },
      });
      newBadges.push("midnight_sun");
    }
  }

  // Southern Cross: traveled below Tropic of Capricorn (-23.4S)
  if (!earnedSet.has("southern_cross")) {
    const belowCapricorn = destinations.some((d) => d.lat < -23.4);
    if (belowCapricorn) {
      await prisma.badge.create({
        data: { userId, badgeType: "southern_cross" },
      });
      newBadges.push("southern_cross");
    }
  }

  // Culinary Explorer: 50+ restaurant reviews across 5+ countries
  if (!earnedSet.has("culinary_explorer")) {
    const reviews = await prisma.review.findMany({
      where: { userId, placeType: "Restaurant" },
      select: { country: true },
    });
    const countries = new Set(reviews.map((r) => r.country));
    if (reviews.length >= 50 && countries.size >= 5) {
      await prisma.badge.create({
        data: { userId, badgeType: "culinary_explorer" },
      });
      newBadges.push("culinary_explorer");
    }
  }

  return newBadges;
}
