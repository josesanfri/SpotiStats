"use client";

import useSWR from "swr";
import axios from "axios";
import { SpotifyUserType } from "@/types/spotifyUser";
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
