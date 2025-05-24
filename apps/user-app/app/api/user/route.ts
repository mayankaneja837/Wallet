import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET=async ()=>{
    try{
        const session=await getServerSession(authOptions)
    if(session.user){
        return NextResponse.json({
            user:session.user
        })
    }
    return NextResponse.json({
        message:"User is not logged In"
    },{
        status:400
    })
} catch(e){
    return NextResponse.json({
        message:"User is not logged in"
    })
}
}
    
    