import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import UserProfile from "./components/user-profile";
import RecentlyPlayedTable from "./components/recently-played-table";
import { Metadata } from "next";
import { getUser, getUserRecentlyPlayed } from "@/hooks/server/spotifyService";
import { getAccessToken } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Profile - SpotiStats",
    description: "My SpotiStats profile.",
};

export default async function ProfilePage() {
    const token = await getAccessToken();
    if (!token) throw new Error("Unauthorized");

    const user = await getUser(token);
    const recentlyPlayed = await getUserRecentlyPlayed(token);

    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <UserProfile user={user} />
                <RecentlyPlayedTable recentlyPlayed={recentlyPlayed} />
            </Suspense>
        </main>
    );
}
