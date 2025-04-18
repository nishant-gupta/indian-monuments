"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AuthNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/account"
          className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
        >
          My Account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/login"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Login
      </Link>
      <Link
        href="/auth/register"
        className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Register
      </Link>
    </div>
  );
} 