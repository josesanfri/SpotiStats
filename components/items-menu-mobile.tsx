"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import { getAccessToken } from "@/lib/authCookies";
import { useSpotifyAuthCall } from "@/hooks/useSpotifyAuthCall";
import { Button } from "./ui/button";

export const ItemsMenuMobile = () => {
        const token = getAccessToken();
            const { login, logout } = useSpotifyAuthCall();
        
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Menu className="h-8 w-8" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><Link href={'/track'}>Top tracks</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/artist'}>Top artists</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/genre'}>Top genres</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {token ? <Button onClick={logout}>Logout</Button> : <Button onClick={login}>Login</Button>}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ItemsMenuMobile;