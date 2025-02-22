import {
    AutomationDuoToneWhite,
    HomeDuoToneWhite,
    RocketDuoToneWhite,
    SettingsDuoToneWhite,
} from "@/icons"
import { v4 as uuid } from "uuid"

type Props = {
    label: string
    id: string
}

type SideBarProps = {
    icon: React.ReactNode
} & Props

export const MENU_ITEMS: Props[] = [
    {
        id: uuid(),
        label: "home",
    },
    {
        id: uuid(),
        label: "pricing",
    },
    {
        id: uuid(),
        label: "contact",
    },
]

export const SIDEBAR_MENU: SideBarProps[] = [
    {
        id: uuid(),
        label: "home",
        icon: <HomeDuoToneWhite />,
    },
    {
        id: uuid(),
        label: "automations",
        icon: <AutomationDuoToneWhite />,
    },
    {
        id: uuid(),
        label: "integrations",
        icon: <RocketDuoToneWhite />,
    },
    {
        id: uuid(),
        label: "settings",
        icon: <SettingsDuoToneWhite />,
    },
]
