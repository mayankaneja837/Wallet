"use client"
import {AppBar} from "@repo/ui/appbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const AppBarClient=()=>{
    const router=useRouter()
    const session=useSession()

    return (
    <div>
        <AppBar onSignin={signIn} onSignout={async()=>{
            await signOut()
            router.push('/api/auth/signin') }}
            user={session?.data?.user} />
    </div>
    )
}