import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import TracksTable from "./components/tracks-table";
import { Metadata } from "next";
import { getAccessToken } from "@/lib/auth";
import { Track } from "@/types/spotify";
import { getUserTopTracks } from "@/hooks/server/spotifyService";

export const metadata: Metadata = {
    title: "Top Tracks - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default async function Page() {
    const token = await getAccessToken();
    if (!token) throw new Error("Unauthorized");

    const data: Track | null = await getUserTopTracks(token, "short_term");

    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <TracksTable initialData={data} />
            </Suspense>
        </main>
    );
}
