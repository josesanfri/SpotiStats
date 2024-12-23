import { useEffect, useState } from "react";
import axios from "axios";
import { ArtistType } from "@/types/artist";
import { getAccessToken } from "@/lib/authToken";

export function useGetArtists(
    timeRange: "short_term" | "medium_term" | "long_term"
) {
    const [data, setData] = useState<ArtistType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            setError("Login for getting data");
            setLoading(false);
            return;
        }

        const fetchArtists = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=20&offset=0`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
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

        fetchArtists();
    }, [timeRange]);

    return { data, loading, error };
}
