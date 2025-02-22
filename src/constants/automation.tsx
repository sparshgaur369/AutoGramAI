import { PlaneBlue, SmartAi, TinyInstagram } from "@/icons"
import { generateUUID } from "@/lib/utils"

export type AutomationsTriggerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: "COMMENT" | "DM"
}

export type AutomationListenerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: "SMARTAI" | "MESSAGE"
}

export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[] = [
    {
        id: generateUUID(),
        label: "User comments on my post",
        icon: <TinyInstagram />,
        description: "Select if you want to automate comments on your post",
        type: "COMMENT",
    },
    {
        id: generateUUID(),
        label: "Replies to my dms",
        icon: <TinyInstagram />,
        description: "Select if you want to automate DMs on your profile",
        type: "DM",
    },
]

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
    {
        id: generateUUID(),
        label: "User will be sent the message",
        icon: <PlaneBlue />,
        description: "Enter the message that you want to be sent to the clent",
        type: "MESSAGE",
    },
    {
        id: generateUUID(),
        label: "Let Smart AI take over",
        icon: <SmartAi />,
        description:
            "Tell AI about your project. (Upgrade to use this feature)",
        type: "SMARTAI",
    },
]
