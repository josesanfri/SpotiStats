"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useGetUser";
import { PlayCircle, User2 } from "lucide-react";

const UserProfile = () => {
    const { data: user, loading } = useGetUser();

    return (
        <>
            {!loading && user ? (
                <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={user?.images[0].url}
                            alt={user.display_name}
                        />
                        <AvatarFallback>
                            <User2 className="h-16 w-16" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {user.display_name}
                            </h1>
                            <p className="text-muted-foreground">
                                {user.followers.total} followers
                            </p>
                        </div>
                        <Button
                            onClick={() =>
                                window.open(
                                    user.external_urls.spotify,
                                    "_blank"
                                )
                            }
                        >
                            <PlayCircle className="mr-1 h-4 w-4" />
                            See on Spotify
                        </Button>
                    </div>
                </section>
            ) : null}
        </>
    );
};

export default UserProfile;
