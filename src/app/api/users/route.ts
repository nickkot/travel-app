import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const username = searchParams.get("username");
  const id = searchParams.get("id");

  const where: any = {};
  if (username) where.username = username;
  if (id) where.id = id;

  const user = await prisma.user.findFirst({
    where,
    include: {
      badges: true,
      _count: {
        select: {
          trips: true,
          reviews: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(user);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action } = body;

  if (action === "signup") {
    const { name, username, email, password, referredBy } = body;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return Response.json(
        { error: "Email or username already taken" },
        { status: 400 }
      );
    }

    // Look up referrer if provided
    let referrerId: string | undefined;
    if (referredBy) {
      const referrer = await prisma.user.findUnique({
        where: { username: referredBy },
        select: { id: true },
      });
      if (referrer) referrerId = referrer.id;
    }

    // Note: In production, hash password with bcrypt and use Supabase Auth
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        referredBy: referrerId,
      },
    });

    // Auto-follow referrer
    if (referrerId) {
      try {
        await prisma.follow.create({
          data: { followerId: user.id, followingId: referrerId },
        });
      } catch {
        // Ignore if follow already exists
      }
    }

    return Response.json({ user }, { status: 201 });
  }

  if (action === "check-username") {
    const { username } = body;
    if (!username || username.length < 2) {
      return Response.json({ available: false });
    }
    const existing = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    return Response.json({ available: !existing });
  }

  if (action === "login") {
    const { email } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Note: In production, verify password hash
    return Response.json({ user });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}
