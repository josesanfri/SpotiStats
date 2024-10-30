/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from "react";
import { useGetArtistsShortTerm } from "@/api/artist/useGetArtistsShortTerm";
import { useGetArtistsMediumTerm } from "@/api/artist/useGetArtistsMediumTerm";
import { useGetArtistsLongTerm } from "@/api/artist/useGetArtistsLongTerm";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SkeletonTable } from "@/components/skeleton-table";

const GenreTable = () =>  {
    const [timeRange, setTimeRange] = useState<'short' | 'medium' | 'long'>('short');

    const { dataArtistsShortTerm, loadingShort } = useGetArtistsShortTerm();
    const { dataArtistsMediumTerm, loadingMedium } = useGetArtistsMediumTerm();
    const { dataArtistsLongTerm, loadingLong } = useGetArtistsLongTerm();
    const [maxCount, setMaxCount] = useState<number>(0); // Máximo para normalizar

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

    useEffect(() => {
        if (!loading && data) {
            const genreCount: { [key: string]: number } = {};

            // Contar cuántas veces aparece cada género
            data.items.forEach((artist) => {
                artist.genres.forEach((genre: string) => {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                });
            });

            // Calcular el máximo para normalizar las barras de progreso
            setMaxCount(Math.max(...Object.values(genreCount)));
        }
    }, [loading, data]);

    const renderTableRows = () => {
        const genreCount: { [key: string]: number } = {};

        if (data) {
            // Contar los géneros
            data.items.forEach((artist) => {
                artist.genres.forEach((genre: string) => {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                });
            });

            // Ordenar géneros por popularidad
            const sortedGenres = Object.keys(genreCount)
                .map((genre) => ({ genre, count: genreCount[genre] }))
                .sort((a, b) => b.count - a.count);

            return sortedGenres.map((genre, index) => (
                <TableRow key={index}>
                    <TableCell className="w-2/5"><span className="font-bold">{index + 1}.</span> {genre.genre}</TableCell>
                    <TableCell className="w-3/5">
                        <Progress
                            value={(genre.count / maxCount) * 100}
                            className="h-4 w-full bg-gray-200 dark:bg-gray-700"
                        />
                    </TableCell>
                </TableRow>
            ));
        }

        return null;
    };

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <section>
                <h1 className="text-2xl sm:text-3xl font-bold">Top Genres</h1>
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
                            Checkout your most listened genres.
                        </p>
                    </TableCaption>
                    <TableBody>
                        {renderTableRows()}
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

export default GenreTable;
