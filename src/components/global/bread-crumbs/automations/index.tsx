"use client"

import { Input } from "@/components/ui/input"
import { useEditAutomation } from "@/hooks/use-automations"
import { useMutationDataState } from "@/hooks/use-mutation-data"
import { useQueryAutomation } from "@/hooks/use-queries"
import { PencilDuoToneBlack } from "@/icons"
import { ChevronRight } from "lucide-react"
import { ActivateAutomationButton } from "../../activate-automation-button"

type Props = {
    id: string
}

export const AutomationsBreadCrumb = ({ id }: Props) => {
    const { data } = useQueryAutomation(id)
    const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id)
    const { latestVariable } = useMutationDataState(["update-automation"])

    return (
        <div className="rounded-full w-full p-5 bg-[#18181B1A] flex justify-between items-center">
            <div className="flex items-center gap-x-3">
                <p className="text-[#9B9CA0]">Automations</p>
                <ChevronRight color="#5C75D6" />
                <span className="flex gap-x-3 items-center">
                    {edit ? (
                        <Input
                            ref={inputRef}
                            placeholder={
                                isPending
                                    ? latestVariable.variables
                                    : "Add a new name"
                            }
                            className="bg-transparent h-auto outline-none text-base border-none p-0"
                        />
                    ) : (
                        <p className="text-[#9B9CA0]">{data?.data?.name}</p>
                    )}
                    {edit ? (
                        <></>
                    ) : (
                        <span
                            onClick={enableEdit}
                            className="cursor-pointer hover:opacity-75 duration-100 transition"
                        >
                            <PencilDuoToneBlack />
                        </span>
                    )}
                </span>
            </div>
            <div className="flex gap-x-5">
                <p className="text-text-secondary/60 text-sm">
                    All updates are automatically saved
                </p>
                <div className="flex gap-x-5">
                    <p className="text-text-secondary text-sm">Changes Saved</p>
                    <p className="text-text-secondary text-sm">Undo | Redo</p>
                </div>
            </div>
            <ActivateAutomationButton id={id} />
        </div>
    )
}
