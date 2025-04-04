import axios from "axios";
import { getAccessToken } from "@/lib/auth";

/**
 * Fetcher function to make authenticated GET requests to the Spotify API.
 *
 * This function retrieves the access token using `getAccessToken` and includes it
 * in the Authorization header of the request. It is designed to be used with SWR
 * for data fetching.
 *
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the response data from the API.
 * @throws An error if no token is found or if the request fails.
 */
const fetcher = async (url: string) => {
    const token = await getAccessToken();

    if (!token) {
        throw new Error("No token found");
    }

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export default fetcher;