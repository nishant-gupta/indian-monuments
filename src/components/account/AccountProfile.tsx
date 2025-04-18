"use client";

import { useState } from "react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountProfileProps {
  user: User;
}

export default function AccountProfile({ user }: AccountProfileProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile picture"}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </span>
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {isLoading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
} 