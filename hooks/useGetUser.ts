"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpotifyUserType } from "@/types/spotifyUser";
import { getAccessToken } from "@/lib/authToken";

export function useGetUser() {
    const [data, setData] = useState<SpotifyUserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            if (!token) {
                setError("Login for getting data");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.spotify.com/v1/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                localStorage.setItem("user_id", response.data.id);
                setData(response.data);
            } catch (error) {
                const errorMessage = axios.isAxiosError(error)
                    ? error.response?.data?.error?.message ||
                      "Error getting data"
                    : "Unexpected error getting profile data";

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        // Función para detectar cambios en localStorage
        const handleTokenChange = () => {
            const token = getAccessToken();
            if (token) {
                setLoading(true);
                fetchUserData(token);
            }
        };

        // Verifica el token inicial al cargar
        handleTokenChange();

        // Escucha cambios en el storage
        window.addEventListener("storage", handleTokenChange);

        return () => {
            window.removeEventListener("storage", handleTokenChange);
        };
    }, []);

    return { data, loading, error };
}
