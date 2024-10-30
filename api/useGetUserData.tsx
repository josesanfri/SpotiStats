'use client';
import { useEffect, useState } from "react";
import axios from 'axios';
import { SpotifyUserType } from "@/types/spotifyUser";
import { getAccessToken } from "./authToken";

export function useGetUserData() {
    const [dataUserProfile, setDataUserProfile] = useState<SpotifyUserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            if (!token) {
                setError("Token no disponible");
                setLoading(false);
                return;
            }

            try {
                const headers = {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                };

                const response = await axios.get("https://api.spotify.com/v1/me", headers);
                const res = response.data;

                localStorage.setItem('user_id', res.id); // Guarda el ID del usuario en localStorage
                setDataUserProfile(res);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error inesperado al obtener los datos del perfil");
                }
                setLoading(false);
            }
        };

        // Función para detectar cambios en localStorage
        const handleTokenChange = () => {
            const token = getAccessToken(); // Revisa si hay un nuevo token
            if (token) {
                setLoading(true);
                fetchUserData(token); // Llama a la API para obtener los datos del usuario
            }
        };

        // Verifica el token inicial al cargar
        handleTokenChange();

        // Escucha cambios en el storage (cuando el token cambia)
        window.addEventListener('storage', handleTokenChange);

        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return { dataUserProfile, loading, error };
}
