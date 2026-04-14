import { prisma } from "@/lib/prisma";
import { MILES_ACTIONS } from "@/lib/points";
import { checkBadgeEligibility } from "@/app/api/points/route";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tripId = searchParams.get("tripId");
  const userId = searchParams.get("userId");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const localOnly = searchParams.get("localOnly") === "true";

  const where: any = {};
  if (tripId) where.tripId = tripId;
  if (userId) where.userId = userId;
  if (city) where.city = { equals: city, mode: "insensitive" };
  if (country) where.country = { equals: country, mode: "insensitive" };
  if (localOnly) where.isLocalGuide = true;

  const reviews = await prisma.review.findMany({
    where,
    include: {
      user: { select: { name: true, username: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(reviews);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    tripId,
    placeName,
    placeType,
    city,
    country,
    lat,
    lng,
    rating,
    content,
  } = body;

  // Snapshot whether this review counts as a Local Guide recommendation by
  // comparing against the author's declared base city/country. Snapshotting
  // at creation time means historical recs stay tagged even if the author
  // later moves.
  const author = await prisma.user.findUnique({
    where: { id: userId },
    select: { baseCity: true, baseCountry: true },
  });
  const isLocalGuide = !!(
    author?.baseCity &&
    author.baseCountry &&
    author.baseCity.toLowerCase() === String(city || "").toLowerCase() &&
    author.baseCountry.toLowerCase() === String(country || "").toLowerCase()
  );

  const review = await prisma.review.create({
    data: {
      userId,
      tripId,
      placeName,
      placeType,
      city,
      country,
      lat,
      lng,
      rating,
      content,
      isLocalGuide,
    },
  });

  // Award miles: LOCAL_GUIDE (300) for recs from a local, otherwise the
  // standard WRITE_REVIEW (50). This is the first place LOCAL_GUIDE is
  // actually used.
  const milesAwarded = isLocalGuide
    ? MILES_ACTIONS.LOCAL_GUIDE
    : MILES_ACTIONS.WRITE_REVIEW;
  await prisma.user.update({
    where: { id: userId },
    data: { compassMiles: { increment: milesAwarded } },
  });

  // Re-check badge eligibility so local_guide, culinary_explorer, etc. can
  // be earned when the threshold is crossed by this review.
  const newBadges = await checkBadgeEligibility(userId);

  return Response.json(
    { ...review, milesAwarded, newBadges },
    { status: 201 }
  );
}
