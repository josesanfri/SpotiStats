"use client";
import MenuList from "./menu-list";
import ToggleTheme from "./toogle-theme";
import ItemsMenuMobile from "./items-menu-mobile";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <nav className="flex items-center border-b border-gray-200 justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
            <h1 className="text-2xl sm:text-3xl font-bold">
                <Link className="flex items-center" href="/">
                    <Image
                        src={"/images/logo.webp"}
                        alt="SpotiStats"
                        className="mr-1 w-8 h-8"
                    />
                </Link>
            </h1>
            <section className="flex items-center justify-between gap-1">
                <div className="hidden sm:flex">
                    <MenuList />
                </div>
                <div className="flex sm:hidden">
                    <ItemsMenuMobile />
                </div>
                <ToggleTheme />
            </section>
        </nav>
    );
};

export default Header;
