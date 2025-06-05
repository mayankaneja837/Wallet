"use client"
import { Button } from "@repo/ui/button";
import { Card} from "@repo/ui/card";
import {Center} from "@repo/ui/center"
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { createSendMoney } from "../app/lib/actions/SendMoney";

export function SendMoney(){
    const [amount,setAmount]=useState("")
    const [number,setNumber]=useState("")

    return <div className="h-screen">
        <Center>
            <Card title="Send Money">
               <div className="min-w-72  ">
                <TextInput label="Number" placeholder="Enter your number" onChange={(value)=>{
                    setNumber(value)
                }} />
                <TextInput label="Amount" placeholder="Amount" onChange={(value)=>{
                    setAmount(value)
                }} />
               </div>
               <div className="pt-4 w-full flex justify-center cursor-pointer">
                <Button onClick={async ()=>{
                    await createSendMoney((Number(amount)*100),number)
                    alert("Transaction successful")
                }} >Send</Button>
               </div>
            </Card>
        </Center>
                
            
    </div>
}