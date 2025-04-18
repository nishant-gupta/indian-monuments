"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Monument {
  id: string;
  name: string;
  slug: string;
  images: { url: string }[];
}

interface AccountFavoritesProps {
  userId: string;
}

export default function AccountFavorites({ userId }: AccountFavoritesProps) {
  const [favorites, setFavorites] = useState<Monument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/favorites`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data = await response.json();
        setFavorites(data.favorites);
      } catch (err) {
        setError("Failed to load favorites");
        console.error("Error fetching favorites:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
      
      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          You haven&apos;t added any monuments to your favorites yet.
        </p>
      ) : (
        <div className="space-y-4">
          {favorites.map((monument) => (
            <Link
              key={monument.id}
              href={`/monuments/${monument.slug}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition duration-150"
            >
              <div className="flex items-center space-x-4 p-4">
                {monument.images[0] ? (
                  <Image
                    src={monument.images[0].url}
                    alt={monument.name}
                    width={96}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                )}
                
                <div>
                  <h3 className="text-lg font-medium">{monument.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 