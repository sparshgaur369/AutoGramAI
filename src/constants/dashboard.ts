import { generateUUID } from "@/lib/utils"

type Props = {
    id: string
    label: string
    subLabel: string
    description: string
}

export const DASHBOARD_CARDS: Props[] = [
    {
        id: generateUUID(),
        label: "Set-up Auto Replies",
        subLabel: "Deliver a product lineup through Instagram DM",
        description:
            "Get products in front of your followers in as many places",
    },
    {
        id: generateUUID(),
        label: "Answer Questions with AI",
        subLabel: "Identify and respond to queries with AI",
        description:
            "The intention of the message will be automatically detected",
    },
    {
        id: generateUUID(),
        label: "Answer Questions with AI",
        subLabel: "Identify and respond to queries with AI",
        description:
            "The intention of the message will be automatically detected",
    },
]
