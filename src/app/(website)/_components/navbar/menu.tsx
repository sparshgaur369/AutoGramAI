import { MENU_ITEMS } from "@/constants/menu"
import { usePaths } from "@/hooks/use-nav"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
    isMoble?: boolean
}

export const MenuItems = ({ isMoble }: Props) => {
    let { page } = usePaths()

    if (page === "") {
        page = "home"
    }

    return (
        <div
            className={cn(
                isMoble
                    ? "flex flex-col gap-y-5 py-10"
                    : "hidden gap-x-20 md:flex",
            )}
        >
            {MENU_ITEMS.map((item) => (
                <Link
                    className={cn(
                        " px-3 py-2 rounded-full capitalize",
                        page === item.label
                            ? "bg-[#3352CC] text-white"
                            : "hover:text-white text-white/60",
                    )}
                    key={item.id}
                    href={item.label === "home" ? "/" : `/${item.label}`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    )
}
