import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  const items = await prisma.wishlistDestination.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });

  return Response.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, city, country, lat, lng, notes } = body;

  const item = await prisma.wishlistDestination.create({
    data: {
      userId,
      city,
      country,
      lat,
      lng,
      notes: notes || null,
    },
  });

  return Response.json(item, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.wishlistDestination.delete({ where: { id } });

  return Response.json({ success: true });
}
