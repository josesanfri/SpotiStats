import { Suspense } from "react";
import GenreTable from "./components/genre-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Top Genres - SpotiStats",
    description: "Discover your most listened genres on Spotify.",
};

export default async function Page() {
    const session = await auth();
    if (!session) return redirect("/");
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <GenreTable />
            </Suspense>
        </main>
    );
}
