import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { Info } from "lucide-react";
import GenreRow from "./genre-row";

interface GenreListProps {
    genreData: { genre: string; count: number }[];
    maxCount: number;
}

const GenreList = ({ genreData, maxCount }: GenreListProps) => (
    <Table className="mt-3">
        <TableCaption>
            <p className="flex items-center place-content-center text-xs gap-2 px-4">
                <Info className="h-4 w-4" />
                Checkout your most listened genres.
            </p>
        </TableCaption>
        <TableBody>
            {genreData.map((genre, index) => (
                <GenreRow key={index} genre={genre} index={index} maxCount={maxCount} />
            ))}
        </TableBody>
    </Table>
);

export default GenreList;
