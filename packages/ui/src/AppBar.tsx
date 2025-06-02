import { Button } from "./button"
interface AppBarProps{
    user?:{
        name?:string | null
    }
    onSignin:any,
    onSignout:any
}
export const AppBar=({user,onSignin,onSignout}:AppBarProps)=>{
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center pl-2 cursor-pointer">
            PayTM
        </div>
        <div className="flex flex-col justify-around font-extrabold">
            This is a tailwind Test
        </div>
        <div className="flex flex-col justify-center pt-2 cursor-pointer pl-2">
            <Button onClick={user? onSignout: onSignin}>{user ? "Logout":"Log-In"}</Button>
        </div>
    </div>
}