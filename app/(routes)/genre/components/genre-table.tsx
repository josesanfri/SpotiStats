"use client";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { useGetArtists } from "@/hooks/useGetArtists";
import { Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ArtistType } from "@/types/artist";
import { SkeletonTable } from "@/components/skeleton-table";
import TimeRangeSelector from "@/components/time-range-selector";

const GenreTable = () => {
    const [timeRange, setTimeRange] = useState<
        "short_term" | "medium_term" | "long_term"
    >("short_term");
    const [genreData, setGenreData] = useState<
        { genre: string; count: number }[]
    >([]);
    const [maxCount, setMaxCount] = useState<number>(0);

    const { data, loading, error } = useGetArtists(timeRange);

    // Calculate genre when data is loaded
    useEffect(() => {
        if (!loading && data) {
            const genreCounts = getGenreCounts(data.items);
            setGenreData(genreCounts);

            const max = Math.max(...genreCounts.map((item) => item.count));
            setMaxCount(max);
        }
    }, [loading, data]);

    // Count Genres
    const getGenreCounts = (artists: ArtistType["items"]) => {
        const genreCountMap: { [key: string]: number } = {};

        artists.forEach((artist) => {
            artist.genres.forEach((genre) => {
                genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
            });
        });

        return Object.entries(genreCountMap)
            .map(([genre, count]) => ({ genre, count }))
            .sort((a, b) => b.count - a.count);
    };

    const generateTableRows = () => {
        return genreData.map((genre, index) => (
            <TableRow key={index}>
                <TableCell className="w-2/5">
                    <span className="font-bold">{index + 1}.</span>{" "}
                    {genre.genre}
                </TableCell>
                <TableCell className="w-3/5">
                    <Progress
                        value={(genre.count / maxCount) * 100}
                        aria-label={`${genre.count} tracks`}
                        className="h-4 w-full bg-gray-200 dark:bg-gray-700"
                    />
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <section>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Top Genres -{" "}
                            {
                                {
                                    short_term: "Last Month",
                                    medium_term: "Last 6 Months",
                                    long_term: "Last Year",
                                }[timeRange]
                            }
                        </h1>
                        <TimeRangeSelector
                            timeRange={timeRange}
                            onTimeRangeChange={setTimeRange}
                        />
                    </section>
                    <Table className="mt-3">
                        <TableCaption>
                            <p className="flex items-center place-content-center text-xs gap-2 px-4">
                                <Info className="h-4 w-4" />
                                Checkout your most listened genres.
                            </p>
                        </TableCaption>
                        <TableBody>{generateTableRows()}</TableBody>
                    </Table>
                </>
            )}
            {loading && (
                <SkeletonTable />
            )}
            {error && (
                <p className="text-red-500 text-center mt-4">Error: {error}</p>
            )}
        </section>
    );
};

export default GenreTable;
