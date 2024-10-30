import { useEffect, useState } from "react";
import axios from 'axios';
import { ArtistType } from "@/types/artist";
import { getAccessToken } from "@/api/authToken";

export function useGetArtistsMediumTerm() {
    const [dataArtistsMediumTerm, setDataArtistsMediumTerm] = useState<ArtistType | null>(null);
    const [loadingMedium, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = getAccessToken(); // Obtén el token de acceso

        if (!token) {
            setError("Token no disponible");
            setLoading(false);
            return; // Si no hay token, no se continúa
        }

        const fetchArtistData = async () => {
            try {
                const headers = {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                };

                const response = await axios.get("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0", headers);
                const res = response.data;

                setDataArtistsMediumTerm(res);
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

        fetchArtistData(); // Llama a la función para obtener los datos del usuario
    }, []); // No se necesita 'accessToken' en la dependencia

    return { dataArtistsMediumTerm, loadingMedium, error };
}
