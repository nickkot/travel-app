import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");

  const where: any = {};
  if (userId) where.userId = userId;
  if (status) where.status = status;

  const trips = await prisma.trip.findMany({
    where,
    include: {
      destinations: true,
      photos: { take: 1 },
      reviews: { select: { id: true } },
      user: { select: { name: true, username: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(trips);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    title,
    description,
    startDate,
    endDate,
    isFuture,
    visibility,
    destinations,
  } = body;

  const trip = await prisma.trip.create({
    data: {
      userId,
      title,
      description,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      isFuture: isFuture || false,
      visibility: visibility || "PUBLIC",
      status: isFuture ? "PLANNED" : "COMPLETED",
      destinations: {
        create: (destinations || []).map((d: any) => ({
          city: d.city,
          country: d.country,
          lat: d.lat,
          lng: d.lng,
          arrivalDate: d.arrivalDate ? new Date(d.arrivalDate) : null,
          departureDate: d.departureDate ? new Date(d.departureDate) : null,
        })),
      },
    },
    include: { destinations: true },
  });

  return Response.json(trip, { status: 201 });
}
