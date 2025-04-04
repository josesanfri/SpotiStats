import { Suspense } from "react";
import ArtistTable from "./components/artist-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";
import { getAccessToken } from "@/lib/auth";
import { Artist } from "@/types/spotify";
import { getUserTopArtists } from "@/hooks/server/spotifyService";

export const metadata: Metadata = {
    title: "Top Artists - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default async function Page() {
    const token = await getAccessToken();
    if (!token) throw new Error("Unauthorized");

    // Obtener los top artists
    const data: Artist | null = await getUserTopArtists(token, "short_term");

    if (!data) {
        return <p>Error al cargar los datos.</p>;
    }
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <ArtistTable initialData={data} />
            </Suspense>
        </main>
    );
}
