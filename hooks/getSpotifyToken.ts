import axios from "axios";

export interface SpotifyToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export const getSpotifyToken = async (): Promise<SpotifyToken> => {
    const searchParams = new URLSearchParams({
        grant_type: "authorization_code",
    });

    const base64String = btoa(
        `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
    );

    const response = await axios.post("https://accounts.spotify.com/api/token", searchParams, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${base64String}`,
        },
    })

    return response.data;
}