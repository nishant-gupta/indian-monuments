import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface ReviewWithMonument {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
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

    // Only allow users to fetch their own reviews
    if (session.user.id !== params.userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: params.userId,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
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
      reviews: reviews as ReviewWithMonument[],
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 