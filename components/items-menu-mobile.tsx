import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import AuthBtn from "./auth-btn";

export const ItemsMenuMobile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Menu className="h-8 w-8" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><Link href={'/track'}>Top tracks</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/artist'}>Top artists</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/genre'}>Top genres</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><AuthBtn /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ItemsMenuMobile;