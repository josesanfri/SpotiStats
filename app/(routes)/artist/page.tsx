import { Suspense } from "react";
import ArtistTable from "./components/artist-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top Artists - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default function Page() {
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <ArtistTable />
            </Suspense>
        </main>
    );
}
