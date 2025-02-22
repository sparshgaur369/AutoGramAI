import {
    AutomationDuoToneBlue,
    ContactsDuoToneBlue,
    HomeDuoToneBlue,
    RocketDuoToneBlue,
} from "@/icons"

type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_BREAD_CRUMBS: string[] = [
    "contacts",
    "automations",
    "integrations",
    "settings",
]

export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoToneBlue />,
    CONTACTS: <ContactsDuoToneBlue />,
    INTEGRATIONS: <RocketDuoToneBlue />,
    SETTINGS: <ContactsDuoToneBlue />,
    HOME: <HomeDuoToneBlue />,
}
