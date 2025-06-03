import { AddMoney } from "../../../components/AddMoney"
import { BalanceCard } from "../../../components/BalanceCard"
import { OnRamptxn } from "../../../components/OnRamptxn"
import {prisma} from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

async function getBalance(){
    const session=await getServerSession(authOptions)
    const balance=await prisma.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return {
        amount:balance?.amount || 0,
        locked:balance?.locked || 0
    }
}

async function getOnRamptxn(){
    const session=await getServerSession(authOptions)
    const txns=await prisma.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    })

    return txns.map(t=>({
        time:t.startTime,
        amount:t.amount,
        status:t.status,
        provider:t.provider
    }))
}
export default async function(){
    const balance=await getBalance()
    const transactions=await getOnRamptxn()

    return <div className="w-300">
        <div className="text-4xl text-[#a51a6] pt-8 mb-8 font-bold pl-8">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-8 pt-15">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRamptxn transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}