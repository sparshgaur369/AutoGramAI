"use client"

import { Button } from "@/components/ui/button"
import { useCreateAutomation } from "@/hooks/use-automations"
import { AutomationDuoToneWhite } from "@/icons"
import { Loader } from "../loaders"

export const CreateAutomation = () => {
    const { mutate, isPending } = useCreateAutomation()

    return (
        <Button
            onClick={mutate}
            className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
        >
            <Loader state={isPending}>
                <AutomationDuoToneWhite />
                <p className="lg:inline hidden">Create an Automation</p>
            </Loader>
        </Button>
    )
}
