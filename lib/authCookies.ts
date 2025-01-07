import axios from "axios";
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = (): string | null => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    return accessToken || null;
};

export const setAccessToken = (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
        secure: true,
        sameSite: "strict",
        expires: 1 / 24,
    });
};

export const setRefreshToken = (refreshToken: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        secure: true,
        sameSite: "strict",
        expires: 1 / 24,
    });
};

export const clearAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
};

export const getRefreshedAccessToken = async (): Promise<string | null> => {
    const refresh_token = Cookies.get(REFRESH_TOKEN_KEY);

    if (!refresh_token) {
        console.error("Refresh token is missing");
        return null;
    }

    try {
        const base64String = btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        );
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token,
            }),
            {
                headers: {
                    Authorization: `Basic ${base64String}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token", error);
        return null;
    }
};
