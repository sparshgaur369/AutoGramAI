import { InstagramBlue, PlaneBlue } from "@/icons"

type Props = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string | null
    }[]
}

export const ActiveTrigger = ({ type, keywords }: Props) => {
    return (
        <div className="bg-background-80 p-3 rounded-xl w-full">
            <div className="flex gap-x-2 items-center">
                {type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}
                <p className="text-lg">
                    {type === "COMMENT"
                        ? "User comments on my post"
                        : "Sends me a dm"}
                </p>
            </div>
            <p className="text-text-secondary">
                Asking about where to get started or how should they proceed
            </p>
            <div className="flex gap-2 mt-5 flex-wrap">
                {keywords.map((word) => (
                    <div
                        className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
                        key={word.id}
                    >
                        <p>{word.word}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
