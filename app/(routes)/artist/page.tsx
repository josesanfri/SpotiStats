import ArtistTable from "./components/artist-table";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Top Artists - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};


export default function Page() {
    return(
        <main>
            <ArtistTable />
        </main>
    )
}