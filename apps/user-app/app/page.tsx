"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";
import { JSX } from "react";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      <AppBar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}