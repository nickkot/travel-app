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
    const { name, username, email, password } = body;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return Response.json(
        { error: "Email or username already taken" },
        { status: 400 }
      );
    }

    // Note: In production, hash password with bcrypt and use Supabase Auth
    const user = await prisma.user.create({
      data: { name, username, email },
    });

    return Response.json({ user }, { status: 201 });
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
