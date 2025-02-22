import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// export const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)
// const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)

export async function GET() {
    const user = await currentUser()

    if (!user) return NextResponse.json({ status: 404 })

    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],

        success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
    })

    if (session) {
        return NextResponse.json({
            status: 200,
            session_url: session.url,
        })
    }

    return NextResponse.json({ status: 400 })
}


// import { currentUser } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"
// import Stripe from "stripe"

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string, {
//   apiVersion: "2024-09-30.acacia", // Make sure to set the correct Stripe API version
// })

// export async function GET() {
//   const user = await currentUser()

//   // Return a 404 if the user is not authenticated
//   if (!user) return NextResponse.json({ status: 404 })

//   const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

//   // Check for missing priceId
//   if (!priceId) {
//     return NextResponse.json({ status: 400, error: "Price ID is missing" })
//   }

//   try {
//     // Create a Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
//     })

//     // Return the session URL if successful
//     return NextResponse.json({
//       status: 200,
//       session_url: session.url,
//     })
//   } catch (error) {
//     console.error("Stripe session creation failed", error)
//     return NextResponse.json({
//       status: 500,
//       error: "Stripe session creation failed",
//     })
//   }
// }
