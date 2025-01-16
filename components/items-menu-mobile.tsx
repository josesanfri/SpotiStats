import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";
import LogoutBtn from "./logout-btn";
import LoginBtn from "./login-btn";
import { Session } from "next-auth";

interface ItemsMenuMobileProps {
    session: Session | null;
}

export const ItemsMenuMobile: React.FC<ItemsMenuMobileProps> = ({ session }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu className="h-8 w-8" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={"/track"}>Top tracks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={"/artist"}>Top artists</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={"/genre"}>Top genres</Link>
                </DropdownMenuItem>
                {session && (
                    <DropdownMenuItem>
                        <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {session ? <LogoutBtn /> : <LoginBtn />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ItemsMenuMobile;
