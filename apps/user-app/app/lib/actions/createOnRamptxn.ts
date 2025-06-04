"use server"
import {prisma} from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export  async function createOnRamptxn(provider:string,amount:number){
    const session=await getServerSession(authOptions)
    if(!session?.user?.id || !session?.user){
        return {
            message:"Unauthenticated Request"
        }
    }

    const token=(Math.random()* 1000).toString()
    await prisma.onRampTransaction.create({
        data:{
            amount:amount*100,
            provider,
            startTime:new Date(),
            token:token,
            userId:Number(session?.user?.id),
            status:"Processing"
        }
    })
    
    return {
        message:"Done"
    }
}