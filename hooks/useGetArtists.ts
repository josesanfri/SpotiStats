"use client";

import useSWR from "swr";
import axios from "axios";
import { ArtistType } from "@/types/artist";
import { getAccessToken } from "@/lib/authCookies";

// Fetcher genérico para solicitudes autenticadas
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
