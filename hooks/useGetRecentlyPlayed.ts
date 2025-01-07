
import useSWR from "swr";
import axios from "axios";
import { RecentlyPlayedType } from "@/types/track";
import { getAccessToken } from "@/lib/authCookies";

const fetcher = async (url: string) => {
    const token = getAccessToken();

    if (!token) {
        throw new Error("Login required to fetch data");
    }

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

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