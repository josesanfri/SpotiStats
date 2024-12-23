import { useEffect, useState } from "react";
import axios from "axios";
import { TrackType } from "@/types/track";
import { getAccessToken } from "@/lib/authToken";

export function useGetTracks(
    timeRange: "short_term" | "medium_term" | "long_term"
) {
    const [data, setData] = useState<TrackType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getAccessToken();

        if (!token) {
            setError("Login for getting data");
            setLoading(false);
            return;
        }

        const fetchTracks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20&offset=0`,
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

        fetchTracks();
    }, [timeRange]);

    return { data, loading, error };
}
