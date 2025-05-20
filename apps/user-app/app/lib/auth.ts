import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "@repo/db/client"
import bcrypt from "bcrypt"

export const authOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                phone:{label:"Phone number" , placeholder:"122332",type:"text" },
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any){
                const hashedPassword=await bcrypt.hash(credentials.password,10)
                const existingUser=await prisma.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                })
                if(existingUser){
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            email:existingUser.email,
                            name:existingUser.name
                        }
                    }
                    return null
                }

                try{
                    const userDetails=await prisma.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    })

                    return {
                        id:userDetails.id.toString(),
                        name:userDetails.name,
                        number:userDetails.number
                    }
                } catch(e){
                    console.log(e)
                }
                return null
            }
        })
    ],
    secret:process.env.JWT_SECRET || "undefined",
    callbacks:{
        async session({token,session}:any){
            session.user.id=token.sub || "undefined"
            return session
        }
    }
}