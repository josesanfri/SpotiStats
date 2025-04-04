import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { Info } from "lucide-react";
import ArtistRow from "./artist-row";
import { Artist } from "@/types/spotify";

interface ArtistsListProps {
    data: Artist;
}

export default function ArtistsList({ data }: ArtistsListProps) {
    return (
        <Table className="mt-3">
            <TableCaption>
                <p className="flex items-center place-content-center text-xs gap-2 px-4">
                    <Info className="h-4 w-4" />
                    All images are copyrighted by their respective copyright owners.
                </p>
            </TableCaption>
            <TableBody>
                {data.items.map((artist, index) => (
                    <ArtistRow key={artist.id} artist={artist} index={index} />
                ))}
            </TableBody>
        </Table>
    );
}
