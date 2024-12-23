import { Suspense } from "react";
import Fallback from "@/components/ui/fallback";
import TracksTable from "./components/tracks-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top Tracks - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default function Page() {
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <TracksTable />
            </Suspense>
        </main>
    );
}
