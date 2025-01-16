import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import UserProfile from "./components/user-profile";
import ResumeCard from "./components/resume-card";
import RecentlyPlayedTable from "./components/recently-played-table";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Profile - SpotiStats",
    description: "My SpotiStats profile.",
};

export default async function ProfilePage() {
    const session = await auth();
    if (!session) return redirect("/");
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <UserProfile />
                <ResumeCard />
                <RecentlyPlayedTable />
            </Suspense>
        </main>
    );
}
