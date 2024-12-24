import axios from "axios";
import Cookies from "js-cookie";

// Claves de las cookies
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Obtener el token de acceso desde las cookies
export const getAccessToken = (): string | null => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    return accessToken || null;
};

// Guardar el token de acceso en las cookies
export const setAccessToken = (accessToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
        secure: true,
        sameSite: "strict",
    });
};

// Guardar el token de actualización en las cookies
export const setRefreshToken = (refreshToken: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        secure: true,
        sameSite: "strict",
    });
};

// Borrar los tokens de las cookies
export const clearAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
};

// Obtener un nuevo token de acceso utilizando el token de actualización
export const getRefreshedAccessToken = async (): Promise<string | null> => {
    const refresh_token = Cookies.get(REFRESH_TOKEN_KEY);

    if (!refresh_token) {
        console.error("Refresh token is missing");
        return null;
    }

    try {
        const base64String = Buffer.from(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString("base64");
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token,
            }),
            {
                headers: {
                    Authorization: "Basic " + base64String,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken); // Guardar el nuevo token

        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token", error);
        return null;
    }
};
