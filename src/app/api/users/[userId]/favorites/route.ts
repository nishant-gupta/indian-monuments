import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface FavoriteWithMonument {
  monument: {
    id: string;
    name: string;
    slug: string;
    images: { url: string }[];
  };
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only allow users to fetch their own favorites
    if (session.user.id !== params.userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: params.userId,
      },
      select: {
        monument: {
          select: {
            id: true,
            name: true,
            slug: true,
            images: {
              select: {
                url: true,
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      favorites: (favorites as FavoriteWithMonument[]).map((f) => f.monument),
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 