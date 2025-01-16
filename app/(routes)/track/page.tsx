import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import TracksTable from "./components/tracks-table";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Top Tracks - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default async function Page() {
    const session = await auth();
    if (!session) return redirect("/");
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <TracksTable />
            </Suspense>
        </main>
    );
}
