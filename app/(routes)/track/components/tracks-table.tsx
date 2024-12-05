"use client";
import { useState } from "react";
import { useGetTracksShortTerm } from "@/api/track/useGetTracksShortTerm";
import { useGetTracksMediumTerm } from "@/api/track/useGetTracksMediumTerm";
import { useGetTracksLongTerm } from "@/api/track/useGetTracksLongTerm";
import { SkeletonTable } from "@/components/skeleton-table";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const TracksTable = () => {
    const [timeRange, setTimeRange] = useState<"short" | "medium" | "long">(
        "short"
    );

    const { dataTracksShortTerm, loadingShort } = useGetTracksShortTerm();
    const { dataTracksMediumTerm, loadingMedium } = useGetTracksMediumTerm();
    const { dataTracksLongTerm, loadingLong } = useGetTracksLongTerm();

    const getDataByTimeRange = () => {
        switch (timeRange) {
            case "short":
                return { data: dataTracksShortTerm, loading: loadingShort };
            case "medium":
                return { data: dataTracksMediumTerm, loading: loadingMedium };
            case "long":
                return { data: dataTracksLongTerm, loading: loadingLong };
            default:
                return { data: null, loading: true };
        }
    };

    const { data, loading } = getDataByTimeRange();

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <section>
                <h1 className="text-2xl sm:text-3xl font-bold">Top Tracks</h1>
                <div className="flex gap-4 sm:space-x-4 mt-4 flex-col sm:flex-row">
                    <Button
                        className="w-full"
                        onClick={() => setTimeRange("short")}
                    >
                        Last Month
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => setTimeRange("medium")}
                    >
                        Last 6 Months
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => setTimeRange("long")}
                    >
                        Last Year
                    </Button>
                </div>
            </section>

            {!loading && data && (
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
                                        className="w-16 h-16"
                                        src={tracks.album.images[0].url}
                                        alt={tracks.name}
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
            )}
            {loading && (
                <section className="mt-3">
                    <SkeletonTable />
                </section>
            )}
        </section>
    );
};

export default TracksTable;
