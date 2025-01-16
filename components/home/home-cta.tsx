"use client";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth";
import { Session } from "next-auth";

interface HomeCtaProps {
    session: Session | null;
}

const HomeCta: React.FC<HomeCtaProps> = ({ session }) => {
    const handleClick = async () => {
        await login("spotify");
    };

    return (
        <section className="px-4 lg:px-8 py-20 bg-muted/50">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    ¿Ready to discover your stats?
                </h2>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                    Join now and get unique insights on your favourite music.
                </p>
                {!session && (
                    <Button size="lg" className="mt-4" onClick={handleClick}>
                        Get started
                    </Button>
                )}
            </div>
        </section>
    );
};

export default HomeCta;
