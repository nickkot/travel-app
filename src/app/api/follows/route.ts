import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const followerId = searchParams.get("followerId");
  const followingId = searchParams.get("followingId");
  const userId = searchParams.get("userId");
  const type = searchParams.get("type");

  // Check follow state between two users
  if (followerId && followingId) {
    const follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return Response.json({ isFollowing: !!follow });
  }

  // List followers or following
  if (userId && type) {
    if (type === "followers") {
      const follows = await prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: { id: true, name: true, username: true, avatarUrl: true, tier: true, compassMiles: true },
          },
        },
        take: 50,
      });
      return Response.json({ users: follows.map((f) => f.follower) });
    }

    if (type === "following") {
      const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: { id: true, name: true, username: true, avatarUrl: true, tier: true, compassMiles: true },
          },
        },
        take: 50,
      });
      return Response.json({ users: follows.map((f) => f.following) });
    }
  }

  return Response.json({ error: "Missing parameters" }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, followerId, followingId } = body;

  if (!followerId || !followingId) {
    return Response.json({ error: "Missing followerId or followingId" }, { status: 400 });
  }

  if (followerId === followingId) {
    return Response.json({ error: "Cannot follow yourself" }, { status: 400 });
  }

  if (action === "follow") {
    try {
      await prisma.follow.create({
        data: { followerId, followingId },
      });
      return Response.json({ success: true });
    } catch {
      return Response.json({ error: "Already following" }, { status: 409 });
    }
  }

  if (action === "unfollow") {
    try {
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
      return Response.json({ success: true });
    } catch {
      return Response.json({ error: "Not following" }, { status: 404 });
    }
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}
