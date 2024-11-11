import { useGetUserData } from "@/api/useGetUserData";
import { useSpotifyAuthCall } from "@/hooks/useSpotifyAuthCall";
import { Button } from "./ui/button";

const AuthBtn = () => {
    const { login, logout } = useSpotifyAuthCall();
    const { dataUserProfile } = useGetUserData();

    return (
        <div>
            {dataUserProfile ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Button onClick={login}>Login</Button>
            )}
        </div>
    );
}

export default AuthBtn;