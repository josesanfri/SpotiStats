import { Progress } from "@/components/ui/progress";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";

interface GenreRowProps {
    genre: { genre: string; count: number };
    maxCount: number;
    index: number;
}

const GenreRow = ({ genre, index, maxCount }: GenreRowProps) => (
    <TableRow key={index}>
        <TableCell className="w-2/5">
            <span className="font-bold">{index + 1}.</span> {genre.genre}
        </TableCell>
        <TableCell className="w-3/5">
            <Progress
                value={(genre.count / maxCount) * 100}
                className="h-4 w-full bg-gray-200 dark:bg-gray-700"
            />
        </TableCell>
    </TableRow>
);

export default GenreRow;
