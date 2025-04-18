"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  monument: {
    id: string;
    name: string;
    slug: string;
    images: { url: string }[];
  };
}

interface AccountReviewsProps {
  userId: string;
}

export default function AccountReviews({ userId }: AccountReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/reviews`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        setError("Failed to load reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          You haven&apos;t written any reviews yet.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
              <Link
                href={`/monuments/${review.monument.slug}`}
                className="flex items-center space-x-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition duration-150"
              >
                {review.monument.images[0] ? (
                  <Image
                    src={review.monument.images[0].url}
                    alt={review.monument.name}
                    width={96}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                )}
                
                <div>
                  <h3 className="text-lg font-medium">{review.monument.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "fill-current" : "fill-gray-300 dark:fill-gray-600"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 