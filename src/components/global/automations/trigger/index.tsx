"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AUTOMATION_TRIGGERS } from "@/constants/automation"
import { useTriggers } from "@/hooks/use-automations"
import { useQueryAutomation } from "@/hooks/use-queries"
import { cn } from "@/lib/utils"
import { Loader } from "../../loaders"
import { TriggerButton } from "../button"
import { ThenButton } from "../then"
import { ActiveTrigger } from "./active"
import { Keywords } from "./keyword"

type Props = {
    id: string
}

export const Trigger = ({ id }: Props) => {
    const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
    const { data } = useQueryAutomation(id)

    if (data?.data && data?.data?.trigger.length > 0) {
        return (
            <div className="flex flex-col gap-y-6 items-center">
                <ActiveTrigger
                    type={data.data.trigger[0].type}
                    keywords={data.data.keywords}
                />
                {data.data.trigger.length > 1 && (
                    <>
                        <div className="relative w-6/12">
                            <p className="absolute transform bg-background-90 px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                                or
                            </p>
                            <Separator
                                orientation="horizontal"
                                className="border-background-80 border-[1px]"
                            />
                        </div>
                        <ActiveTrigger
                            type={data.data.trigger[1].type}
                            keywords={data.data.keywords}
                        />
                    </>
                )}
                {!data.data.listener && <ThenButton id={id} />}
            </div>
        )
    }

    return (
        <TriggerButton label="Add Trigger">
            <div className="flex flex-col gap-y-2">
                {AUTOMATION_TRIGGERS.map((auto) => (
                    <div
                        key={auto.id}
                        onClick={() => onSetTrigger(auto.type)}
                        className={cn(
                            "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2",
                            !types?.find((t) => t === auto.type)
                                ? "bg-background-80"
                                : "bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]",
                        )}
                    >
                        <div className="flex gap-x-2 items-center">
                            {auto.icon}
                            <p className="font-bold">{auto.label}</p>
                        </div>
                        <p className="text-sm font-light">{auto.description}</p>
                    </div>
                ))}
                <Keywords id={id} />
                <Button
                    onClick={onSaveTrigger}
                    disabled={types?.length === 0}
                    className="bg-gradient-to-br from-[#3352CC] font-medium text-white to-[#1C2D70]"
                >
                    <Loader state={isPending}>Create Trigger</Loader>
                </Button>
            </div>
        </TriggerButton>
    )
}
