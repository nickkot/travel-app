import { prisma } from "@/lib/prisma";
import { MILES_ACTIONS } from "@/lib/points";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tripId = searchParams.get("tripId");
  const userId = searchParams.get("userId");

  const where: any = {};
  if (tripId) where.tripId = tripId;
  if (userId) where.userId = userId;

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
    },
  });

  // Award Compass Miles
  await prisma.user.update({
    where: { id: userId },
    data: { compassMiles: { increment: MILES_ACTIONS.WRITE_REVIEW } },
  });

  return Response.json(review, { status: 201 });
}
