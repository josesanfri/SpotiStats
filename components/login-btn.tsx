"use client";
import { Button } from "./ui/button";
import { login } from "@/lib/auth";

const LoginBtn = () => {
    const handleClick = async () => {
        await login("spotify");
    }

    return (
        <Button onClick={handleClick}>Login</Button>
    );
};

export default LoginBtn;
