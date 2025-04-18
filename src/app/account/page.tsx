import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import AccountProfile from "@/components/account/AccountProfile";
import AccountFavorites from "@/components/account/AccountFavorites";
import AccountReviews from "@/components/account/AccountReviews";

export const metadata: Metadata = {
  title: "Account | MonumentHub",
  description: "Manage your account settings and view your activity.",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <AccountProfile user={session.user} />
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <AccountFavorites userId={session.user.id} />
          <AccountReviews userId={session.user.id} />
        </div>
      </div>
    </div>
  );
} 