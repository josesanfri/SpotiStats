import MenuList from "./menu-list";
import ToggleTheme from "./toogle-theme";
import ItemsMenuMobile from "./items-menu-mobile";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <nav className="w-full z-20 top-0 start-0 border-b">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <section className="text-2xl sm:text-3xl font-bold">
                    <Link className="flex items-center" href="/">
                        <Image
                            src={"/images/logo.webp"}
                            alt="SpotiStats"
                            className="mr-1 w-8 h-8 object-contain"
                            width={500}
                            height={500}
                        />
                    </Link>
                </section>
                <section className="flex items-center justify-between gap-1">
                    <div className="hidden sm:flex">
                        <MenuList />
                    </div>
                    <div className="flex sm:hidden">
                        <ItemsMenuMobile />
                    </div>
                    <ToggleTheme />
                </section>
            </div>
        </nav>
    );
};

export default Header;
