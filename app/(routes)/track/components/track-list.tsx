import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { Info } from "lucide-react";
import TrackRow from "./track-row";
import { Track } from "@/types/spotify";

interface TracksListProps {
    data: Track;
}

export default function TracksList({ data }: TracksListProps) {
    return (
        <Table className="mt-3">
            <TableCaption>
                <p className="flex items-center place-content-center text-xs gap-2 px-4">
                    <Info className="h-4 w-4" />
                    All images are copyrighted by their respective copyright owners.
                </p>
            </TableCaption>
            <TableBody>
                {data.items.map((track, index) => (
                    <TrackRow key={track.id} track={track} index={index} />
                ))}
            </TableBody>
        </Table>
    );
}
