import axios from 'axios';

export const getAccessToken = (): string | null => {

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        return null;
    }

    return accessToken;
};

export const setAccessToken = (accessToken: string) => {
    localStorage.setItem("access_token", accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem("refresh_token", refreshToken);
};

export const clearAccessToken = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export const getRefreshedAccessToken = async (): Promise<string | null> => {
    const refresh_token = localStorage.getItem("refresh_token");

    if (!refresh_token) {
        console.error("Refresh token is missing");
        return null;
    }

    try {
        const base64String = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString('base64');
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token
        }), {
            headers: {
                'Authorization': 'Basic ' + base64String,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken); // Guardar el nuevo token

        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token", error);
        return null;
    }
};