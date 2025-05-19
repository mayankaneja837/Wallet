import { JSX } from "react";
import {PrismaClient} from "@repo/db/client"

const client=new PrismaClient()
export default function Page():JSX.Element {
  return (
    <div className="text-2xl font-bold">
      Hello whats up motherfucker
    </div>
  )
}