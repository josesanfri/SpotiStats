"use client";
import { useState } from "react";
import { Track } from "@/types/spotify";
import TracksHeader from "./track-header";
import TracksList from "./track-list";
import { SkeletonTable } from "@/components/skeleton-table";
import { useGetTracks } from "@/hooks/client/useSpotifyClient";

interface TracksTableProps {
    initialData?: Track;
}

export default function TracksTable({ initialData }: TracksTableProps) {
    const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("short_term");
    const { data, loading, error } = useGetTracks(timeRange, initialData);

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <TracksHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />
                    <TracksList data={data} />
                </>
            )}
            {loading && <SkeletonTable />}
            {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}
        </section>
    );
}
