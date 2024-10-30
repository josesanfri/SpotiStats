import GenreTable from "./components/genre-table";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Top Genres - SpotiStats",
    description: "Discover your most listened genres on Spotify.",
};

export default function Page() {
    return(
        <main>
            <GenreTable />
        </main>
    )
}
