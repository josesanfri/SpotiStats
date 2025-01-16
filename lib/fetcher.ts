import axios from "axios";
import { getAccessToken } from "@/lib/auth";

export const fetcher = async (url: string) => {
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