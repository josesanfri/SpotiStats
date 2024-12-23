import { Suspense } from "react";
import GenreTable from "./components/genre-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top Genres - SpotiStats",
    description: "Discover your most listened genres on Spotify.",
};

export default function Page() {
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <GenreTable />
            </Suspense>
        </main>
    );
}
