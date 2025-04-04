import { Suspense } from "react";
import GenreTable from "./components/genre-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";
import { getUserTopArtists } from "@/hooks/server/spotifyService";
import { getAccessToken } from "@/lib/auth";
import { Artist, Genre } from "@/types/spotify";
import { getGenreCounts } from "@/lib/getGenreCounts";

export const metadata: Metadata = {
    title: "Top Genres - SpotiStats",
    description: "Discover your most listened genres on Spotify.",
};

export default async function Page() {
    const token = await getAccessToken();
    if (!token) throw new Error("Unauthorized");

    const data: Artist | null = await getUserTopArtists(token, "short_term");
    const genreCounts: Genre[] | null = data ? getGenreCounts(data.items) : [];

    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <GenreTable initialData={genreCounts} />
            </Suspense>
        </main>
    );
}
