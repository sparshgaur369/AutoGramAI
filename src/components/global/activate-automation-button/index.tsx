import { activateAutomation } from "@/actions/automations"
import { Button } from "@/components/ui/button"
import { useMutationData } from "@/hooks/use-mutation-data"
import { useQueryAutomation } from "@/hooks/use-queries"
import { ActiveAutomation } from "@/icons/active-automation"
import { Loader } from "../loaders"

type Props = {
    id: string
}

export const ActivateAutomationButton = ({ id }: Props) => {
    const { data } = useQueryAutomation(id)
    const { mutate, isPending } = useMutationData(
        ["activate"],
        (data: { state: boolean }) => activateAutomation(id, data.state),
        "automation-info",
    )
    return (
        <Button
            onClick={() => mutate({ state: !data?.data?.active })}
            className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
        >
            <Loader state={isPending}>
                <ActiveAutomation />
                <p className="lg:inline hidden">
                    {data?.data?.active ? "Disable" : "Activate"}
                </p>
            </Loader>
        </Button>
    )
}
