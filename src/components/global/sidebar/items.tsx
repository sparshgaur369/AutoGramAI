import { SIDEBAR_MENU } from "@/constants/menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
    page: string
    slug: string
}

export const Items = ({ page, slug }: Props) => {
    return SIDEBAR_MENU.map((item) => (
        <Link
            key={item.id}
            className={cn(
                "capitalize flex gap-x-2 rounded-full p-3",
                page === item.label && "bg-[#171717]",
                page === slug && item.label === "home"
                    ? "bg-[#171717]"
                    : "text-[#9B9CA0]",
            )}
            href={`/dashboard/${slug}/${item.label === "home" ? "/" : item.label}`}
        >
            {item.icon}
            {item.label}
        </Link>
    ))
}
