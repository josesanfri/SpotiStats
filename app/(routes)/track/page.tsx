import TracksTable from "./components/tracks-table";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Top Tracks - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default function Page() {
    return(
        <main>
            <TracksTable />
        </main>
    )
}