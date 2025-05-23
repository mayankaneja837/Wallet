import express from "express"
import { prisma } from "@repo/db/client"
const port=3003
const app=express()

app.post("/hdfcWebhook",async (req,res)=>{
    const paymentInformation={
        token:req.body.token,
        userId:req.body.userId,
        amount:req.body.amount
    }

    if(!paymentInformation){
        res.status(411).json({
            message:"Payment Information is Incomplete!!!"
        })
    }

    try{
        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),

            prisma.onRampTransaction.update({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])

        res.status(200).json({
            message:"Captured"
        })
    }catch(e){
        res.status(411).json({
            message:"Error while accessing the Webhook"
        })
    }
})

console.log(`Server is listening on port${port}`)
app.listen(port)