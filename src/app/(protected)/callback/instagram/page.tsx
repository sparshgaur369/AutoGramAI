import { onIntegrate } from "@/actions/integrations"
import { redirect } from "next/navigation"

const Page = async ({ searchParams }: { searchParams: { code: string } }) => {
    if (searchParams.code) {
        console.log(searchParams)
        const user = await onIntegrate(searchParams.code.split("#_")[0])
        if (user.status === 200)
            return redirect(
                `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`,
            )
    }

    return redirect("/sign-in")
}

export default Page
