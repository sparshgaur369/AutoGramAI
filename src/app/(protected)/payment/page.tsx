import { onSubscribe } from "@/actions/user"
import { redirect } from "next/navigation"

const CompletePaymentPage = async ({
    searchParams,
}: {
    searchParams: { session_id?: string; cancel?: boolean }
}) => {
    if (searchParams.session_id) {
        const customer = await onSubscribe(searchParams.session_id)

        if (customer.status === 200) {
            return redirect("/dashboard")
        }

        return (
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h4 className="text-5xl font-bold">404</h4>
                <p className="text-xl text-center">
                    Oops! Something went wrong
                </p>
            </div>
        )
    }

    if (searchParams.cancel) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h4 className="text-5xl font-bold">404</h4>
                <p className="text-xl text-center">
                    Oops! Something went wrong
                </p>
            </div>
        )
    }
}

export default CompletePaymentPage
