"use client"
import { Separator } from "@/components/ui/separator"
import { PAGE_BREAD_CRUMBS } from "@/constants/pages"
import { usePaths } from "@/hooks/use-nav"
import { HelpDuoToneWhite } from "@/icons"
import { LogoSmall } from "@/svgs/logo-small"
import { Menu } from "lucide-react"
import { MainBreadCrumb } from "../bread-crumbs/main"
import { ClerkAuthState } from "../clerk-auth-state"
import { CreateAutomation } from "../create-automation-button"
import { SubscriptionPlan } from "../feature-flags/subscription"
import { Notifications } from "../notifications"
import { Search } from "../search"
import { Sheet } from "../sheet"
import { Items } from "../sidebar/items"
import { UpgradeCard } from "../sidebar/upgrade"

type Props = {
    slug: string
}

export const Navbar = ({ slug }: Props) => {
    const { page } = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page === slug
    return (
        currentPage && (
            <div className="flex flex-col">
                <div className="flex gap-x-3 lg:gap-x-5 justify-end">
                    <span className="lg:hidden flex items-center flex-1 gap-x-2">
                        <Sheet trigger={<Menu />} className="lg:hidden">
                            <div className="flex flex-col py-10">
                                <div className="flex flex-col py-3">
                                    <Items page={page} slug={slug} />
                                </div>
                                <div className="px-16">
                                    <Separator
                                        orientation="horizontal"
                                        className="bg-[#5C5C5F]"
                                    />
                                </div>
                                <div className="px-3 flex flex-col gap-y-5 mt-5">
                                    <div className="flex gap-x-2">
                                        <ClerkAuthState />
                                        <p className="text-[#9B9CA0]">
                                            Profile
                                        </p>
                                    </div>
                                    <div className="flex gap-x-3">
                                        <HelpDuoToneWhite />
                                        <p className="text-[#9B9CA0]">Help</p>
                                    </div>
                                </div>
                                <SubscriptionPlan type="FREE">
                                    <div className="flex-1 flex flex-col justify-end">
                                        <UpgradeCard />
                                    </div>
                                </SubscriptionPlan>
                            </div>
                        </Sheet>
                        <LogoSmall />
                    </span>
                    <Search />
                    <CreateAutomation />
                    <Notifications />
                </div>
                <MainBreadCrumb
                    page={page === slug ? "Home" : page}
                    slug={slug}
                />
            </div>
        )
    )
}
