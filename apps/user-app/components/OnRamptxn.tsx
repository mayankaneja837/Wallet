import { Card } from "@repo/ui/card";

export const OnRamptxn=({transactions}:{
    transactions:{
        time:Date,
        amount:number,
        status:string,
        provider:string
    }[]
})=>{

    if(!transactions.length){
        return <Card title="Recent Transcations">
            <div className="text-center pt-8 pb-8">
                No recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t=><div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>

                    <div>
                        {t.time.toDateString()}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100} INR
                </div>
            </div>)}
        </div>
    </Card>
}