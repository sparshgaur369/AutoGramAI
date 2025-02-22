import { Button } from "@/components/ui/button"
import { useSubscription } from "@/hooks/use-subscription"
import { Loader } from "../loaders"

export const PaymentButton = () => {
    const { onSubscribe, isProcessing } = useSubscription()
    return (
        <Button
            disabled={isProcessing}
            onClick={onSubscribe}
            className="bg-gradient-to-br text-white rounded-full from-[#9685DB] via-[#9434E6] font-bold to-[#CC3BD4]"
        >
            <Loader color="#000" state={isProcessing}>
                Update
            </Loader>
        </Button>
    )
}
