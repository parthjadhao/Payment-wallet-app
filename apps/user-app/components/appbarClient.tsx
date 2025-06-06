"use client"

import { Appbar } from "@payment-wallet-app/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function AppbarClient() {
    const session = useSession()
    const router = useRouter()

    return <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("api/auth/signin")
    }} user={session.data?.user}>
    </Appbar>
}