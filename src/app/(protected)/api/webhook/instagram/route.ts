import { findAutomation } from "@/actions/automations/queries"
import {
    createChatHistory,
    getChatHistory,
    getKeywordAutomation,
    getKeywordPost,
    matchKeyword,
    trackResponses,
} from "@/actions/webhook/queries"
import { sendDM } from "@/lib/fetch"
import { client } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import OpenAi from "openai"

const openai = new OpenAi({ apiKey: process.env.OPEN_AI_KEY })

//this get method is used to validate the webhook with our endpoint(only done once at the start)
export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get("hub.challenge")
    return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
    //we get the request payload
    const webhook_payload = await req.json()
    let matcher

    try {
        //first lets verfiy if a keyword was commented/dmed
        //this way we can see if we have an automation

        if (webhook_payload.entry[0].messaging) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].messaging[0].message.text,
            )
        }

        if (webhook_payload.entry[0].changes) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text,
            )
        }

        if (matcher && matcher.automationId) {
            //we have a keyword match
            //now we check if its a comment or a post
            //this way we can handle each path differently

            //first check dm
            if (webhook_payload.entry[0].messaging) {
                //this checks if the payload was a dm
                //this step has two possible paths
                //the customer can be a brand new user
                //or an existing customer trying to get a new automation

                //we need to get the automation based on the keyword
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true,
                )

                if (automation && automation.trigger) {
                    //if there is an automation trigger used
                    //we start the automation

                    //we check for the listener type
                    if (
                        automation.listener &&
                        automation.listener.listener === "MESSAGE"
                    ) {
                        //we now send the simple response set by user
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!,
                        )

                        if (direct_message.status === 200) {
                            //if successfully send we return

                            //we also track of the 1st time responses
                            const tracked = await trackResponses(
                                automation.id,
                                "DM",
                            )

                            if (tracked) {
                                return NextResponse.json(
                                    {
                                        message: "Message sent",
                                    },
                                    { status: 200 },
                                )
                            }
                        }
                    }

                    if (
                        automation.listener &&
                        automation.listener.listener === "SMARTAI" &&
                        automation.User?.subscription?.plan === "PRO"
                    ) {
                        //we can generate a response based on the prompt given
                        const smart_ai_message =
                            await openai.chat.completions.create({
                                model: "gpt-4o",
                                messages: [
                                    {
                                        role: "assistant",
                                        content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                                    },
                                ],
                            })

                        if (smart_ai_message.choices[0].message.content) {
                            //since were using smart ai theres a chance the customer
                            //can follow up with a response

                            //so we save a chat history
                            const reciever = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message
                                    .text,
                            )

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                            )

                            //we would still want to send a dm
                            //if the transaction fails we dont want to stop the
                            //flow
                            await client.$transaction([reciever, sender])

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!,
                            )

                            if (direct_message.status === 200) {
                                //if successfully send we return

                                const tracked = await trackResponses(
                                    automation.id,
                                    "DM",
                                )

                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: "Message sent",
                                        },
                                        { status: 200 },
                                    )
                                }
                            }
                        }
                    }
                }
            }

            if (
                webhook_payload.entry[0].changes &&
                webhook_payload.entry[0].changes[0].field === "comments"
            ) {
                //this checks if the payload is a comment
                //since comment is a one type event
                //we dont need to check for chat history

                //we now check if its the correct post

                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false,
                )

                const automation_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!,
                )

                //check if the trigger exists in the database
                //also that the post automation and keyword automation match
                if (automation && automation_post && automation.trigger) {
                    //if it does we look for the listener type
                    //we also check if the user add a reply block

                    //check if listener is a message
                    if (automation.listener) {
                        //well check for a reply set
                        // if (automation.listener.commentReply) {
                        //     //if we have a reply we post

                        //     const replied = await commentReplies(
                        //         webhook_payload.entry[0].changes[0].value.media
                        //             .id,
                        //         automation.listener.commentReply,
                        //     )

                        //     if (replied.status === 200) {
                        //         console.log("reply posted")
                        //     }
                        // }

                        //lets check if our listener is a message
                        if (automation.listener?.listener === "MESSAGE") {
                            //we send a dm to the customer
                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.from
                                    .id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!,
                            )

                            if (direct_message.status === 200) {
                                //if successfully send we return
                                const tracked = await trackResponses(
                                    automation.id,
                                    "COMMENT",
                                )

                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: "Message sent",
                                        },
                                        { status: 200 },
                                    )
                                }
                            }
                        }

                        //lets check if the listener is ai
                        //we also have to ensure the customer has pro plan
                        if (
                            automation.listener.listener === "SMARTAI" &&
                            automation.User?.subscription?.plan === "PRO"
                        ) {
                            //we can generate a response based on the prompt given
                            const smart_ai_message =
                                await openai.chat.completions.create({
                                    model: "gpt-4o",
                                    messages: [
                                        {
                                            role: "assistant",
                                            content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                                        },
                                    ],
                                })

                            if (smart_ai_message.choices[0].message.content) {
                                //since were using smart ai theres a chance the customer
                                //can follow up with a response

                                //so we save a chat history
                                const reciever = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value
                                        .from.id,
                                    webhook_payload.entry[0].changes[0].value
                                        .text,
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value
                                        .from.id,
                                    smart_ai_message.choices[0].message.content,
                                )

                                //we would still want to send a dm
                                //if the transaction fails we dont want to stop the
                                //flow
                                await client.$transaction([reciever, sender])

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value
                                        .from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!,
                                )

                                if (direct_message.status === 200) {
                                    //if successfully send we return

                                    const tracked = await trackResponses(
                                        automation.id,
                                        "COMMENT",
                                    )

                                    if (tracked) {
                                        return NextResponse.json(
                                            {
                                                message: "Message sent",
                                            },
                                            { status: 200 },
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {
            //there was no keyword match
            //we can check if its an existing customer
            //this could indicated a continued conversation
            //we check if a chat history exists for the customer
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].recipient.id,
                webhook_payload.entry[0].messaging[0].sender.id,
            )

            if (customer_history.history.length > 0) {
                //if there is a history found we can continue with the smart ai
                //remember we only saved conversation when smart ai was used

                const automation = await findAutomation(
                    customer_history.automationId!,
                )

                //we again verify that the automation and user has the permissions
                if (
                    automation?.User?.subscription?.plan === "PRO" &&
                    automation.listener?.listener === "SMARTAI"
                ) {
                    //we can generate a response based on the prompt given
                    const smart_ai_message =
                        await openai.chat.completions.create({
                            model: "gpt-4o",
                            messages: [
                                {
                                    role: "assistant",
                                    content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                                },
                                ...customer_history.history,
                                {
                                    role: "user",
                                    content:
                                        webhook_payload.entry[0].messaging[0]
                                            .message.text,
                                },
                            ],
                        })

                    if (smart_ai_message.choices[0].message.content) {
                        //since were using smart ai theres a chance the customer
                        //can follow up with a response

                        //so we save a chat history
                        const reciever = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text,
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                        )

                        //we would still want to send a dm
                        //if the transaction fails we dont want to stop the
                        //flow
                        await client.$transaction([reciever, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!,
                        )

                        if (direct_message.status === 200) {
                            //if successfully send we return

                            return NextResponse.json(
                                {
                                    message: "Message sent",
                                },
                                { status: 200 },
                            )
                        }
                    }
                }
            }

            return NextResponse.json(
                {
                    message: "No automation set",
                },
                { status: 200 },
            )
        }

        return NextResponse.json(
            {
                message: "No automation set",
            },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            { status: 200 },
        )
    }
}
