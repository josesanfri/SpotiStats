"use client";

import { useCallback, useEffect } from "react";
import axios from "axios";
import {
    setAccessToken,
    setRefreshToken,
    clearAccessToken,
} from "@/lib/authCookies";

const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${
    process.env.NEXT_PUBLIC_CLIENT_ID || ""
}&response_type=code&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_REDIRECT_URI || ""
)}&scope=${encodeURIComponent(process.env.NEXT_PUBLIC_SCOPES || "")}`;

export const useSpotifyAuthCall = () => {
    const authenticateUser = useCallback(async (spotyCode: string) => {
        try {
            const searchParams = new URLSearchParams({
                code: spotyCode,
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
                grant_type: "authorization_code",
            });

            const base64String = btoa(
                `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
            );

            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                searchParams.toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${base64String}`,
                    },
                }
            );

            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);

            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            window.location.replace(url.toString());
        } catch (error) {
            console.error("Error during user authentication", error);
        } finally {
            window.history.replaceState({}, document.title, "/");
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const spotyCode = urlParams.get("code");

        if (spotyCode) {
            authenticateUser(spotyCode);
        }
    }, [authenticateUser]);

    const login = () => {
        window.location.replace(SPOTIFY_LOGIN_URL);
    };

    const logout = () => {
        clearAccessToken();
        window.location.reload();
    };

    return { login, logout };
};
