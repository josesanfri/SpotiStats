import Image from "next/image";
import { TableRow, TableCell } from "@/components/ui/table";
import { Track } from "@/types/spotify";

interface TrackRowProps {
    track: Track["items"][0];
    index: number;
}

export default function TrackRow({ track, index }: TrackRowProps) {
    return (
        <TableRow>
            <TableCell className="flex items-center gap-2">
                <p className="font-bold">{index + 1}</p>
                <Image
                    className="w-16 h-16 object-contain"
                    src={track.album.images[0]?.url ?? "/fallback.jpg"}
                    alt={track.name}
                    width={64}
                    height={64}
                />
            </TableCell>
            <TableCell className="text-xs sm:text-base">{track.name}</TableCell>
            <TableCell className="text-xs sm:text-base">{track.album.artists[0]?.name ?? "Unknown"}</TableCell>
        </TableRow>
    );
}
