import { Button } from "@/components/ui/button"
import {
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs"
import { User } from "lucide-react"
import { Loader } from "../loaders"

export const ClerkAuthState = () => {
    return (
        <>
            <ClerkLoading>
                <Loader state>
                    <></>
                </Loader>
            </ClerkLoading>
            <SignedOut>
                <SignInButton>
                    <Button className="rounded-xl bg-[#252525] text-white hover:bg-[#252525]/70">
                        <User />
                        Login
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton>
                    <UserButton.UserProfileLink
                        label="Dashboard"
                        url={`/dashboard`}
                        labelIcon={<User size={16} />}
                    />
                </UserButton>
            </SignedIn>
        </>
    )
}
