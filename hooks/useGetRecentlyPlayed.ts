
import useSWR from "swr";
import { RecentlyPlayedType } from "@/types/track";
import { fetcher } from "@/lib/fetcher";

export function useGetRecentlyPlayed() {
    const { data, error, isLoading } = useSWR<RecentlyPlayedType>(
        `https://api.spotify.com/v1/me/player/recently-played?limit=20`,
        fetcher
    );

    return {
        data,
        error: error ? error.message : null,
        loading: isLoading,
    };
}