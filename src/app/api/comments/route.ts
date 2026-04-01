import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parentType = searchParams.get("parentType");
  const parentId = searchParams.get("parentId");

  if (!parentType || !parentId) {
    return Response.json(
      { error: "parentType and parentId are required" },
      { status: 400 }
    );
  }

  const comments = await prisma.comment.findMany({
    where: {
      parentType: parentType as any,
      parentId,
    },
    include: {
      user: { select: { name: true, username: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(comments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, content, parentType, parentId } = body;

  const comment = await prisma.comment.create({
    data: {
      userId,
      content,
      parentType,
      parentId,
    },
    include: {
      user: { select: { name: true, username: true, avatarUrl: true } },
    },
  });

  return Response.json(comment, { status: 201 });
}
