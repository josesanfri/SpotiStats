"use client";

import { useState, useEffect } from "react";
import GenreHeader from "./genre-header";
import GenreList from "./genre-list";
import { useGetArtists } from "@/hooks/client/useSpotifyClient";
import { SkeletonTable } from "@/components/skeleton-table";
import { getGenreCounts } from "@/lib/getGenreCounts";
import { Genre } from "@/types/spotify";
import { useRouter } from "next/navigation";

interface GenresTableProps {
    initialData?: Genre[];
}

const GenreTable = ({ initialData }: GenresTableProps) => {
    const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("short_term");
    const [genreData, setGenreData] = useState<Genre[]>(initialData || []);
    const [maxCount, setMaxCount] = useState<number>(initialData ? Math.max(...initialData.map((item) => item.count)) : 0);
    const { data, loading, error } = useGetArtists(timeRange, initialData);
    const router = useRouter();

    useEffect(() => {
        if (!loading && data && !Array.isArray(data)) {
            const genreCounts = getGenreCounts(data.items);
            setGenreData(genreCounts);
            setMaxCount(Math.max(...genreCounts.map((item) => item.count)));
        }
    }, [loading, data]);
    
    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <GenreHeader
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                    />
                    <GenreList genreData={genreData} maxCount={maxCount} />
                </>
            )}
            {loading && <SkeletonTable />}
            {error && (
                router.push("/error")
            )}
        </section>
    );
};

export default GenreTable;
