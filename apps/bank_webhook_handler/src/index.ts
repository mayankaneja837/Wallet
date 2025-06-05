import express from "express"
import { prisma } from "@repo/db/client"
const port=3003
const app=express()

app.use(express.json())
app.post("/hdfcWebhook",async (req,res)=>{
       const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    console.log("Checking")
    console.log("Checking for UserId")
    console.log(paymentInformation.userId)
    console.log("Checking amount")
    console.log(paymentInformation.amount)
    if(!paymentInformation){
        res.status(411).json({
            message:"Payment Information is Incomplete!!!"
        })
    }

    console.log("Trying for a token")
    console.log(paymentInformation.token)
    console.log("After trying for a token")
    try{
        await prisma.$transaction([
            prisma.balance.upsert({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                update:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                },
                create:{
                    userId:Number(paymentInformation.userId),
                    amount:Number(paymentInformation.amount),
                    locked:0
                }
            }),

            prisma.onRampTransaction.updateMany({
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
        console.error(e)
        res.status(411).json({
            message:"Error while accessing the Webhook"
        })
    }
})

console.log(`Server is listening on port ${port}`)
app.listen(port)