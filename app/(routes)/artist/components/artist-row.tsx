import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { Artist } from "@/types/spotify";
import { Link } from "lucide-react";

interface ArtistRowProps {
    artist: Artist["items"][0];
    index: number;
}

export default function ArtistRow({ artist, index }: ArtistRowProps) {
    return (
        <TableRow>
            <TableCell className="flex items-center gap-2">
                <p className="font-bold">{index + 1}</p>
                <Image
                    className="w-16 h-16 object-contain"
                    src={artist.images[0].url ?? "/fallback.jpg"}
                    alt={artist.name}
                    width={64}
                    height={64}
                />
            </TableCell>
            <TableCell className="text-xs sm:text-base">{artist.name}</TableCell>
            <TableCell className="text-xs sm:text-base">
                <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer" aria-label="Spotify Link">
                    <Link size={16} />
                </a>
            </TableCell>
        </TableRow>
    );
}
