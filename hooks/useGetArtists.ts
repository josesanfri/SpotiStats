import useSWR from "swr";
import { ArtistType } from "@/types/artist";
import { fetcher } from "@/lib/fetcher";

export function useGetArtists(
    timeRange: "short_term" | "medium_term" | "long_term"
) {
    const { data, error, isLoading } = useSWR<ArtistType>(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=20&offset=0`,
        fetcher
    );

    return {
        data,
        error: error ? error.message : null,
        loading: isLoading,
    };
}

export function useGetTopArtist() {
    const { data, error, isLoading } = useSWR<ArtistType>(
        `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20&offset=0`,
        fetcher
    );

    return {
        data: data?.items[0],
        error: error ? error.message : null,
        loading: isLoading,
    };
}
