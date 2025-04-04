import {
    Table,
    TableCaption,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Info } from "lucide-react";
import { TrackHistory } from "@/types/spotify";

interface RecentlyPlayedProps {
    recentlyPlayed: TrackHistory | null;
}

const RecentlyPlayedTable = ({ recentlyPlayed }: RecentlyPlayedProps) => {
    const tracks = recentlyPlayed?.items || [];

    return (
        <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <article>
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Recently Played
                </h1>
            </article>
            {tracks.length > 0 ? (
                <Table className="mt-3">
                    <TableCaption>
                        <p className="flex items-center place-content-center text-xs gap-2 px-4">
                            <Info className="h-4 w-4" />
                            All images are copyrighted by their respective
                            copyright owners.
                        </p>
                    </TableCaption>
                    <TableBody>
                        {tracks.map((track, index) => (
                            <TableRow key={track.track.id + index}>
                                <TableCell className="flex items-center gap-2">
                                    <p className="font-bold">{index + 1}</p>
                                    <Image
                                        className="w-16 h-16 object-contain"
                                        src={track.track.album.images[0].url}
                                        alt={track.track.name}
                                        width={500}
                                        height={500}
                                    />
                                </TableCell>
                                <TableCell className="text-xs sm:text-base">
                                    {track.track.name}
                                </TableCell>
                                <TableCell className="text-xs sm:text-base">
                                    {track.track.artists[0].name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No recently played tracks available.</p>
            )}
        </section>
    );
};

export default RecentlyPlayedTable;
