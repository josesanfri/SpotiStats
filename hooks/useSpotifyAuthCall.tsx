'use client';

import { useEffect, useCallback } from "react";
import axios from "axios";
import { setAccessToken, setRefreshToken, clearAccessToken } from "@/api/authToken";

// URL para el login de Spotify
const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID || ''}&response_type=code&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI || '')}&scope=${encodeURIComponent(process.env.NEXT_PUBLIC_SCOPES || '')}`;

export const useSpotifyAuthCall = () => {

    // Función para autenticar al usuario con el código recibido
    const autenticateUser = useCallback(async (spotyCode: string) => {
        try {
            const searchParams = new URLSearchParams({
                code: spotyCode,
                grant_type: "authorization_code",
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
            });

            const res = await axios.post("https://accounts.spotify.com/api/token", searchParams);
            
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            
            window.location.reload();
        } catch (error) {
            console.error("Error during user authentication", error);
        }
    }, []);

    // Manejo de la autenticación después de recibir el code de Spotify
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const spotyCode = urlParams.get("code");

        if (spotyCode) {
            autenticateUser(spotyCode);
        }
    }, [autenticateUser]);

    // Función para realizar el login (redirigir al usuario a Spotify)
    const login = () => {
        window.location.replace(SPOTIFY_LOGIN_URL);
    };

    // Función para realizar el logout
    const logout = () => {
        clearAccessToken();
        window.location.reload();
    };

    return { login, logout };
};
