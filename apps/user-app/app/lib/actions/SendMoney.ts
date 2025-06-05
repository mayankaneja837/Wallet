"use server"
import {prisma} from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createSendMoney(amount:number,number:string){

    const session=await getServerSession(authOptions)
    const from =session?.user?.id
    if(!from){
        return {
            message:"User is not logged In!!"
        }
    }
    const toUser=await prisma.user.findFirst({
        where:{
            number:number
        }
    })

    if(!toUser){
        return {
            message:"The user to whom the money is sent does not exist"
        }
    }

    await prisma.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`;

        const fromBalance=await tx.balance.findUnique({
            where:{
                userId:Number(from)
            }
        })

        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insufficient funds")
        }

        await tx.balance.upsert({
            where:{
                userId:Number(from)
            },
            update:{
                amount:{
                    decrement:amount
                }
            },
            create:{
                userId:Number(from),
                amount:amount
            }
        })

        await tx.balance.upsert({
            where:{
                userId:Number(toUser.id)
            },
            update:{
                amount:{
                    increment:amount
                }
            },
            create:{
                userId:Number(toUser.id),
                amount:amount
            }
        })
    })
}