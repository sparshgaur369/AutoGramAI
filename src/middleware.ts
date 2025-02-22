import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/api/payment(.*)",
    "/callback(.*)",
])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) auth().protect()
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
