"use client";
import { useState } from "react";
import { Artist } from "@/types/spotify";
import ArtistHeader from "./artist-header";
import ArtistList from "./artist-list";
import { SkeletonTable } from "@/components/skeleton-table";
import { useGetArtists } from "@/hooks/client/useSpotifyClient";

interface ArtistsTableProps {
    initialData?: Artist;
}

export default function ArtistsTable({ initialData }: ArtistsTableProps) {
    const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("short_term");
    const { data, loading, error } = useGetArtists(timeRange, initialData);

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <ArtistHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />
                    <ArtistList data={data} />
                </>
            )}
            {loading && <SkeletonTable />}
            {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}
        </section>
    );
}
