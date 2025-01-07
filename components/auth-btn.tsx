"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { getAccessToken } from "@/lib/authCookies";
import { useSpotifyAuthCall } from "@/hooks/useSpotifyAuthCall";
import { Button } from "./ui/button";
import { useGetUser } from "@/hooks/useGetUser";

const AuthBtn = () => {
    const { login, logout } = useSpotifyAuthCall();
    const { data: user } = useGetUser();
    const token = getAccessToken();

    return (
        <div>
            {token && user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="focus:outline-none h-8 w-8"
                    >
                        <Image
                            src={user?.images[0].url}
                            alt="user profile image"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={"/profile"}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button onClick={logout}>Logout</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button onClick={login}>Login</Button>
            )}
        </div>
    );
};

export default AuthBtn;
