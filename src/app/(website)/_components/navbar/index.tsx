"use client"

import { ClerkAuthState } from "@/components/global/clerk-auth-state"
import { Sheet } from "@/components/global/sheet"
import { useNavbar } from "@/hooks/use-nav"
import { cn } from "@/lib/utils"
import { Logo } from "@/svgs/logo"
import { Menu } from "lucide-react"
import { MenuItems } from "./menu"

export const Navbar = () => {
    const { scrolled } = useNavbar()
    return (
        <nav
            className={cn(
                "flex justify-between items-center bg-zinc-950 py-5",
                scrolled && "fixed w-full container right-0 left-0 z-50",
            )}
        >
            <div className="flex gap-x-3">
                <Sheet trigger={<Menu />} className="md:hidden inline">
                    <MenuItems isMoble />
                </Sheet>
                <Logo />
            </div>
            <MenuItems />
            <ClerkAuthState />
        </nav>
    )
}
