import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const headersList = await headers();
    const monumentId = headersList.get("x-monument-id");

    if (!monumentId) {
      return NextResponse.json(
        { error: "Monument ID is required" },
        { status: 400 }
      );
    }

    const monument = await prisma.monument.findUnique({
      where: { id: monumentId },
      include: {
        favorites: {
          where: {
            userId: session.user.id
          }
        }
      }
    });

    if (!monument) {
      return NextResponse.json(
        { error: "Monument not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      isFavorite: monument.favorites.length > 0
    });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const headersList = await headers();
    const monumentId = headersList.get("x-monument-id");

    if (!monumentId) {
      return NextResponse.json(
        { error: "Monument ID is required" },
        { status: 400 }
      );
    }

    const monument = await prisma.monument.findUnique({
      where: { id: monumentId },
      include: {
        favorites: {
          where: {
            userId: session.user.id
          }
        }
      }
    });

    if (!monument) {
      return NextResponse.json(
        { error: "Monument not found" },
        { status: 404 }
      );
    }

    const isFavorite = monument.favorites.length > 0;

    if (isFavorite) {
      // Remove from favorites
      await prisma.favorite.delete({
        where: {
          userId_monumentId: {
            userId: session.user.id,
            monumentId: monument.id
          }
        }
      });
    } else {
      // Add to favorites
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          monumentId: monument.id
        }
      });
    }

    return NextResponse.json({
      isFavorite: !isFavorite
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 