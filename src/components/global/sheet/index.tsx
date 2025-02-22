import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import React from "react"

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
}

export const Sheet = ({ trigger, children, className }: Props) => {
    return (
        <ShadcnSheet>
            <SheetTrigger className={className}>{trigger}</SheetTrigger>
            <SheetContent>{children}</SheetContent>
        </ShadcnSheet>
    )
}
