import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const useNavbar = () => {
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return { scrolled }
}

export const usePaths = () => {
    const pathname = usePathname()
    const path = pathname.split("/")
    let page = path[path.length - 1]
    return { page, pathname }
}
