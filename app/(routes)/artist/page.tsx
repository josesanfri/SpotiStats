import { Suspense } from "react";
import ArtistTable from "./components/artist-table";
import Fallback from "@/components/ui/fallback";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Top Artists - SpotiStats",
    description: "Discover your most listened tracks on Spotify.",
};

export default async function Page() {
    const session = await auth();
    if (!session) return redirect("/");
    return (
        <main>
            <Suspense fallback={<Fallback />}>
                <ArtistTable />
            </Suspense>
        </main>
    );
}
