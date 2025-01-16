import useSWR from "swr";
import { SpotifyUserType } from "@/types/spotifyUser";
import { fetcher } from "@/lib/fetcher";

export function useGetUser() {
    const { data, error, isLoading } = useSWR<SpotifyUserType>(
        `https://api.spotify.com/v1/me`,
        fetcher
    );
    
    return {
        data,
        error: error ? error.message : null,
        loading: isLoading,
    };
    

    
}
