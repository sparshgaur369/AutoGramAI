"use server"

import { generateTokens } from "@/lib/fetch"
import axios from "axios"
import { redirect } from "next/navigation"
import { onCurrentUser } from "../user"
import { createIntegration, getIntegration } from "./queries"

export const onOAuthInstagram = async (strategy: "INSTAGRAM" | "CRM") => {
    if (strategy === "INSTAGRAM")
        return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
}

export const onIntegrate = async (code: string) => {
    const user = await onCurrentUser()

    try {
        //check if integration exists
        const integration = await getIntegration(user.id)

        if (integration && integration.integrations.length === 0) {
            //generate new tokens
            const token = await generateTokens(code)

            console.log(token)

            if (token) {
                //get insta id for user
                const insta_id = await axios.get(
                    `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`,
                )
                //create a new integration

                //set expire date 60 days from today
                const today = new Date()
                const expire_date = today.setDate(today.getDate() + 60)

                const create = await createIntegration(
                    user.id,
                    token.access_token,
                    new Date(expire_date),
                    insta_id.data.user_id,
                )

                return { status: 200, data: create }
            }

            return { status: 401 }
        }

        return { status: 404 }
    } catch (error) {
        return { status: 500 }
    }
}
