"use client"
import { useGetUser } from "@/hooks/useGetUser";
import { useSpotifyAuthCall } from "@/hooks/useSpotifyAuthCall";
import { Button } from "./ui/button";

const AuthBtn = () => {
    const { login, logout } = useSpotifyAuthCall();
    const { data } = useGetUser();

    return (
        <div>
            {data ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Button onClick={login}>Login</Button>
            )}
        </div>
    );
}

export default AuthBtn;