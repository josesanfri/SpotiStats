import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import UserProfile from "./components/user-profile";
import ResumeCard from "./components/resume-card";
import RecentlyPlayedTable from "./components/recently-played-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile - SpotiStats",
    description: "My SpotiStats profile.",
};

export default function ProfilePage() {
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
