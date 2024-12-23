"use client";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Info } from "lucide-react";
import { useGetArtists } from "@/hooks/useGetArtists";
import { ArtistType } from "@/types/artist";
import { SkeletonTable } from "@/components/skeleton-table";
import TimeRangeSelector from "@/components/time-range-selector";

const ArtistTable = () => {
    const [timeRange, setTimeRange] = useState<
        "short_term" | "medium_term" | "long_term"
    >("short_term");

    const { data, loading, error } = useGetArtists(timeRange);

    const groupArtists = (artists: ArtistType["items"]) => {
        const grouped: ArtistType["items"][] = [];
        for (let i = 0; i < artists.length; i += 3) {
            grouped.push(artists.slice(i, i + 3));
        }
        return grouped;
    };

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            {!loading && data && (
                <>
                    <section>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Top Artists -{" "}
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
                            {groupArtists(data.items).map((group, groupIndex) => (
                                <TableRow key={groupIndex}>
                                    {group.map((artist, index) => (
                                        <TableCell
                                            key={artist.id}
                                            className="text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Image
                                                    className="w-16 h-16 rounded-full object-contain"
                                                    src={artist.images[0].url}
                                                    alt={artist.name + index}
                                                    width={500}
                                                    height={500}
                                                />
                                                <p className="text-xs sm:text-base">
                                                    <span className="font-bold">
                                                        {index + 1 + groupIndex * 3}
                                                        .
                                                    </span>{" "}
                                                    {artist.name}
                                                </p>
                                            </div>
                                        </TableCell>
                                    ))}
                                    {group.length < 3 &&
                                        Array(3 - group.length)
                                            .fill(null)
                                            .map((_, i) => (
                                                <TableCell
                                                    key={`empty-${groupIndex}-${i}`}
                                                />
                                            ))}
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

export default ArtistTable;
