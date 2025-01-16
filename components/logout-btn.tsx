"use client";
import { Button } from "./ui/button";
import { logout } from "@/lib/auth";

const LogoutBtn = () => {
    const handleClick = async () => {
        await logout();
    }

    return (
        <Button onClick={handleClick}>Logout</Button>
    );
};

export default LogoutBtn;
