import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://medi-store-eight.vercel.app"
})