import useSWR, { SWRConfiguration } from "swr";
import { Artist, Genre, Track } from "@/types/spotify";
import fetcher from "@/lib/fetcher";

const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";
const swrConfig: SWRConfiguration = {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
};

/**
 * Custom hook to fetch the user's top artists from Spotify.
 *
 * @param timeRange - The time range for the top artists (short_term, medium_term, or long_term).
 * @param initialData - Optional initial data to use as a fallback while fetching.
 * @returns An object containing the fetched data, error message (if any), and loading state.
 */
export function useGetArtists(
    timeRange: "short_term" | "medium_term" | "long_term",
    initialData?: Artist | Genre[]
) {
    const url = `${SPOTIFY_ENDPOINT}/me/top/artists?time_range=${timeRange}&limit=20&offset=0`;
    const config: SWRConfiguration = {
        ...swrConfig,
        fallbackData: initialData,
    };

    const { data, error, isValidating } = useSWR<Artist>(url, fetcher, config);

    return {
        data: data ?? initialData,
        error: error?.message ?? null,
        loading: isValidating && !data,
    };
}

/**
 * Custom hook to fetch the user's top tracks from Spotify.
 *
 * @param timeRange - The time range for the top tracks (short_term, medium_term, or long_term).
 * @param initialData - Optional initial data to use as a fallback while fetching.
 * @returns An object containing the fetched data, error message (if any), and loading state.
 */
export function useGetTracks(
    timeRange: "short_term" | "medium_term" | "long_term",
    initialData?: Track
) {
    const url = `${SPOTIFY_ENDPOINT}/me/top/tracks?time_range=${timeRange}&limit=20&offset=0`;

    const config: SWRConfiguration = {
        ...swrConfig,
        fallbackData: initialData,
    };

    const { data, error, isValidating } = useSWR<Track>(url, fetcher, config);

    return {
        data: data ?? initialData,
        error: error?.message ?? null,
        loading: isValidating && !data,
    };
}