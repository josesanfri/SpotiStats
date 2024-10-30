"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import AuthBtn from "./auth-btn"

const components: { title: string; href: string; }[] = [
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
]

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
              <ul className="flex items-center space-x-2 px-4">
                {components.map((component) => (
                    <Link  key={component.title} href={component.href} legacyBehavior passHref>
                        <NavigationMenuLink href="" className={navigationMenuTriggerStyle()}>
                            {component.title}
                        </NavigationMenuLink>
                    </Link>
                ))}
                <AuthBtn />
              </ul>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
};

export default MenuList;