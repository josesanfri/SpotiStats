/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useGetArtistsShortTerm } from "@/api/artist/useGetArtistsShortTerm";
import { useGetArtistsMediumTerm } from "@/api/artist/useGetArtistsMediumTerm";
import { useGetArtistsLongTerm } from "@/api/artist/useGetArtistsLongTerm";
import { ArtistType } from "@/types/artist";
import { SkeletonTable } from "@/components/skeleton-table";

const ArtistTable = () => {
    const [timeRange, setTimeRange] = useState<'short' | 'medium' | 'long'>('short');

    const { dataArtistsShortTerm, loadingShort } = useGetArtistsShortTerm();
    const { dataArtistsMediumTerm, loadingMedium } = useGetArtistsMediumTerm();
    const { dataArtistsLongTerm, loadingLong } = useGetArtistsLongTerm();

    const getDataByTimeRange = () => {
        switch (timeRange) {
            case 'short':
                return { data: dataArtistsShortTerm, loading: loadingShort };
            case 'medium':
                return { data: dataArtistsMediumTerm, loading: loadingMedium };
            case 'long':
                return { data: dataArtistsLongTerm, loading: loadingLong };
            default:
                return { data: null, loading: true };
        }
    };

    const { data, loading } = getDataByTimeRange();

    // Función para dividir los artistas en grupos de 3
    const groupArtists = (artists: ArtistType['items']) => {
        const grouped = [];
        for (let i = 0; i < artists.length; i += 3) {
            grouped.push(artists.slice(i, i + 3));
        }
        return grouped;
    };

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <section>
                <h1 className="text-2xl sm:text-3xl font-bold">Top Artists</h1>
                <div className="flex gap-4 sm:space-x-4 mt-4 flex-col sm:flex-row">
                    <Button className="w-full" onClick={() => setTimeRange('short')}>Last Month</Button>
                    <Button className="w-full" onClick={() => setTimeRange('medium')}>Last 6 Months</Button>
                    <Button className="w-full" onClick={() => setTimeRange('long')}>Last Year</Button>
                </div>
            </section>

            {!loading && data && (
                <Table className="mt-3">
                    <TableCaption>
                        <p className="flex items-center place-content-center text-xs gap-2 px-4">
                            <Info className="h-4 w-4" />
                            All images are copyrighted by their respective copyright owners.
                        </p>
                    </TableCaption>
                    <TableBody>
                        {groupArtists(data.items).map((group, groupIndex) => (
                            <TableRow key={groupIndex}>
                                {group.map((artist, index) => (
                                    <TableCell key={artist.id} className="text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <img
                                                loading="lazy"
                                                src={artist.images[0].url.replace(/\.jpg|\.png/, ".webp")}  // Cambia la extensión
                                                alt={artist.name + index}
                                                width={artist.images[0].width}
                                                height={artist.images[0].height}
                                                className="w-16 h-16 rounded-full"
                                            />
                                            <p className="text-xs sm:text-base"><span className="font-bold">{index + 1 + groupIndex * 3}.</span> {artist.name}</p>
                                        </div>
                                    </TableCell>
                                ))}
                                {/* Si hay menos de 3 artistas en el grupo, agregamos celdas vacías */}
                                {group.length < 3 && Array(3 - group.length).fill(null).map((_, i) => (
                                    <TableCell key={`empty-${groupIndex}-${i}`} />
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            )}

            {loading && 
                <section className="mt-3">
                    <SkeletonTable />
                </section>
            }
        </section>
    );
};

export default ArtistTable;
