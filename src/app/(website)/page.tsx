import { PaymentCard } from "@/components/global/billing/card"
import Image from "next/image"
import { Hero } from "./_components/hero"

const Home = async () => {
    return (
        <div className="flex flex-col items-center py-20 gap-y-20">
            <Hero />
            <div className="relative p-0 w-full md:w-10/12 aspect-video rounded-xl overflow-hidden">
                <div className="absolute h-full w-full z-50 bg-gradient-to-b from-[transparent] to-zinc-950"></div>
                <Image
                    src="/snippet.png"
                    alt="snippet"
                    sizes="100vw"
                    fill
                    objectFit="contain"
                    objectPosition="top"
                />
            </div>
            <div className="flex flex-col items-start w-full lg:w-auto lg:items-center gap-y-5">
                <div className="flex flex-col w-full">
                    <h2 className="font-bold text-2xl">Pricing</h2>
                    <p className="text-sm text-text-secondary">
                        Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>
                <div className="flex gap-5 lg:flex-row flex-col w-full lg:w-auto">
                    <PaymentCard label="PRO" landing current="PRO" />
                    <PaymentCard label="FREE" landing current="PRO" />
                </div>
            </div>
        </div>
    )
}

export default Home
