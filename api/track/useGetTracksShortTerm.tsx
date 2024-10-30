import { useEffect, useState } from "react";
import axios from 'axios';
import { TrackType } from "@/types/track";
import { getAccessToken } from "@/api/authToken";

export function useGetTracksShortTerm() {
    const [dataTracksShortTerm, setDataTracksShortTerm] = useState<TrackType | null>(null);
    const [loadingShort, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = getAccessToken(); // Obtén el token de acceso

        if (!token) {
            setError("Token no disponible");
            setLoading(false);
            return; // Si no hay token, no se continúa
        }

        const fetchTrackData = async () => {
            try {
                const headers = {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                };

                const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20&offset=0", headers);
                const res = response.data;

                setDataTracksShortTerm(res);
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

        fetchTrackData(); // Llama a la función para obtener los datos del usuario
    }, []); // No se necesita 'accessToken' en la dependencia

    return { dataTracksShortTerm, loadingShort, error };
}
