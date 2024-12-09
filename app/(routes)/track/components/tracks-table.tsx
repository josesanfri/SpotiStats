"use client";
import { useState } from "react";
import { useGetTracks } from "@/hooks/useGetTracks";
import { SkeletonTable } from "@/components/skeleton-table";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Info } from "lucide-react";
import TimeRangeSelector from "@/components/time-range-selector";

const TracksTable = () => {
    const [timeRange, setTimeRange] = useState<
        "short_term" | "medium_term" | "long_term"
    >("short_term");

    const { data, loading, error } = useGetTracks(timeRange);

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <section>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Top Tracks -{" "}
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
                                All images are copyrighted by their respective
                                copyright owners.
                            </p>
                        </TableCaption>
                        <TableBody>
                            {data?.items.map((tracks, index) => (
                                <TableRow key={tracks.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <p className="font-bold">{index + 1}</p>
                                        <Image
                                            className="w-16 h-16 object-contain"
                                            src={tracks.album.images[0].url}
                                            alt={tracks.name}
                                            width={500}
                                            height={500}
                                        />
                                    </TableCell>
                                    <TableCell className="text-xs sm:text-base">
                                        {tracks.name}
                                    </TableCell>
                                    <TableCell className="text-xs sm:text-base">
                                        {tracks.album.artists[0].name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
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

export default TracksTable;
