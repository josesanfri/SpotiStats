"use client";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Session } from "next-auth";

interface HomeHeroProps {
    session: Session | null;
}

const HomeHero: React.FC<HomeHeroProps> = ({ session }) => {
    const handleClick = async () => {
        await login("spotify");
    };
    const router = useRouter();

    return (
        <section className="px-4 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover your Spotify stats
            </h1>
            <p className="text-xl text-muted-foreground">
                Analyse your music history, discover your favourite artists and
                visualise your listening visualise your listening habits with
                detailed analytics.
            </p>

            {session ? (
                <Button
                    size="lg"
                    className="mt-4"
                    onClick={() => {
                        router.push("/profile");
                    }}
                >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    See your stats
                </Button>
            ) : (
                <Button size="lg" className="mt-4" onClick={handleClick}>
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Get started
                </Button>
            )}
        </section>
    );
};

export default HomeHero;
