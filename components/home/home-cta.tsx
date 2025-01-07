"use client";
import { Button } from "@/components/ui/button";
import { useSpotifyAuthCall } from "@/hooks/useSpotifyAuthCall";
import { getAccessToken } from "@/lib/authCookies";
import { useRouter } from "next/navigation";

const HomeCta = () => {
    const { login } = useSpotifyAuthCall();
    const token = getAccessToken();
    const router = useRouter();

    return (
        <section className="px-4 lg:px-8 py-20 bg-muted/50">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    ¿Ready to discover your stats?
                </h2>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                    Join now and get unique insights on your favourite music.
                </p>
                {!token ? (
                    <Button size="lg" className="mt-4" onClick={login}>
                        Get started
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        className="mt-4"
                        onClick={() => {
                            router.push("/profile");
                        }}
                    >
                        Get started
                    </Button>
                )}
            </div>
        </section>
    );
};

export default HomeCta;
