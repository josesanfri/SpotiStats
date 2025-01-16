import useSWR from "swr";
import { TrackType } from "@/types/track";
import { fetcher } from "@/lib/fetcher";

export function useGetTracks(
    timeRange: "short_term" | "medium_term" | "long_term"
) {
    const { data, error, isLoading } = useSWR<TrackType>(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20&offset=0`,
        fetcher
    );

    return {
        data,
        error: error ? error.message : null,
        loading: isLoading,
    };
}

export function useGetTopTrack() {
    const { data, error, isLoading } = useSWR<TrackType>(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1&offset=0`,
        fetcher
    );

    return {
        data: data?.items[0],
        error: error ? error.message : null,
        loading: isLoading,
    };
}
