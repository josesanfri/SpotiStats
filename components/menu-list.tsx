import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LoginBtn from "./login-btn";
import LogoutBtn from "./logout-btn";
import { Session } from "next-auth";
import { User } from "lucide-react";

const menu: { title: string; href: string }[] = [
    {
        title: "Top tracks",
        href: "/track",
    },
    {
        title: "Top artists",
        href: "/artist",
    },
    {
        title: "Top genres",
        href: "/genre",
    },
];

interface MenuListProps {
    session: Session | null;
}

const MenuList: React.FC<MenuListProps> = ({ session }) => {

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <ul className="flex items-center space-x-2 px-4">
                        {menu.map((item) => (
                            <li key={item.title}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            </li>
                        ))}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 p-2 rounded-full"
                                >
                                    <User />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href={"/profile"}>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogoutBtn />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <LoginBtn />
                        )}
                    </ul>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default MenuList;
