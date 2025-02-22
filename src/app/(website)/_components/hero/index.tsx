import { GradientButton } from "@/components/global/gradient-button"
import { Button } from "@/components/ui/button"
import { Gradient } from "@/svgs/gradient"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
    return (
        <div className="flex flex-col items-start md:items-center gap-y-2 relative">
            <Gradient />
            <GradientButton
                type="LINK"
                href="#"
                className="flex gap-x-2 transition duration-150 bg-[#252525] py-2 px-4 text-white hover:bg-transparent"
            >
                Explore Smart AI
                <ArrowRight />
            </GradientButton>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold text-left md:text-center text-white">
                Lorem ipsum dolor sit <br className="hidden md:flex" /> amet
                consectetur
            </h1>
            <p className="text-[#9B9CA0] text-left md:text-center text-sm font-light">
                Lorem ipsum dolor sit amet consectetur. Varius hac odio enim a
                adipiscing sed suscipit porta. Quis ac{" "}
                <br className="hidden md:flex" /> molestie nunc viverra etiam
                mus lorem felis Varius hac odio enim
            </p>
            <div className="flex flex-col md:flex-row gap-y-5 gap-x-5 mt-10">
                <Link href="/">
                    <Button className="bg-gradient-to-r px-6 text-xl hover:opacity-85 py-6 md:py-0 md:text-base from-[#3352CC] to-[#1C2D70] text-white">
                        Get Started
                    </Button>
                </Link>
                <Link href="/">
                    <Button className="bg-[#252525] hover:bg-[#252525]/85 md:text-base text-xl py-6 md:py-0 px-6 text-[#9B9CA0]">
                        See clone in action
                    </Button>
                </Link>
            </div>
        </div>
    )
}
