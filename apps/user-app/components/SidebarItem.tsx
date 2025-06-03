"use client"
import { usePathname,useRouter } from "next/navigation";
import React from "react";

export const SideBarItem=({href,title,icon}:{href:string,title:string,icon:React.ReactNode})=>{
    const pathname=usePathname()
    const router=useRouter()
    const selected = pathname===href

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer pl-8 p-2`} onClick={()=>{
        router.push(href)
    }}>
        <div className="pr-2">
            {icon}
        </div>

        <div className="font-bold">
            {title}
        </div>
    </div>
}