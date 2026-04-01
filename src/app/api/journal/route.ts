import { prisma } from "@/lib/prisma";
import { MILES_ACTIONS } from "@/lib/points";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tripId = searchParams.get("tripId");

  if (!tripId) {
    return Response.json({ error: "tripId is required" }, { status: 400 });
  }

  const entries = await prisma.journalEntry.findMany({
    where: { tripId },
    include: {
      user: { select: { name: true, username: true, avatarUrl: true } },
    },
    orderBy: { date: "asc" },
  });

  return Response.json(entries);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tripId, userId, content, date, locationCity, locationLat, locationLng, visibility } = body;

  const entry = await prisma.journalEntry.create({
    data: {
      tripId,
      userId,
      content,
      date: new Date(date),
      locationCity: locationCity || null,
      locationLat: locationLat || null,
      locationLng: locationLng || null,
      visibility: visibility || "PUBLIC",
    },
  });

  // Award Compass Miles
  await prisma.user.update({
    where: { id: userId },
    data: { compassMiles: { increment: MILES_ACTIONS.WRITE_JOURNAL } },
  });

  return Response.json(entry, { status: 201 });
}
