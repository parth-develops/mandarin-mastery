import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import { auth } from "@/auth";
import LogOut from "./LogOut";
import { logout } from "@/app/lib/actions";

export default async function UserInfo() {
    const { user } = await auth();
    return (
        <div className="mt-auto bg-muted p-2 md:p-4 flex items-center">
            <div className="userImg mr-3">{user.userImg ? <Image className="rounded-full w-[20px] md:w-[24px]" width={24} height={24} alt="User Image" src={user.userImg} /> : <RiShieldUserFill size={24} color="#666666" />}</div>
            <div className="name_email">
                <p className="text-xs md:text-sm font-semibold text-gray-700">{user.username}</p>
                <p className="text-[12px] md:text-xs text-gray-400">{user.email}</p>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div className="logout ml-auto cursor-pointer" title="Logout">
                        <MdOutlineLogout className="text-[20px] md:text-[24px]" color="#666666" />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="sr-only">Are you sure you want to logout?</AlertDialogDescription>
                    <AlertDialogFooter>
                        <form action={logout} className="w-fit">
                            <LogOut />
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
