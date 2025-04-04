import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SpotifyUser } from "@/types/spotify";
import { User2 } from "lucide-react";

interface UserProfileProps {
    user: SpotifyUser | null;
}

const UserProfile = ({user}: UserProfileProps) => {
    const userData = user || null;

    return (
        <>
            {userData ? (
                <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={userData?.images[0].url}
                            alt={userData.display_name}
                        />
                        <AvatarFallback>
                            <User2 className="h-16 w-16" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {userData.display_name}
                            </h1>
                            <p className="text-muted-foreground">
                                {userData.followers.total} followers
                            </p>
                        </div>
                    </div>
                </section>
            ) : (
                <p>No recently played tracks available.</p>
            )}
        </>
    );
};

export default UserProfile;
