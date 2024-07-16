"use client"

import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { logout } from "@/app/lib/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
    const { data: session, status } = useSession();
    return (
        status === "authenticated" ?
            <div className="mt-auto bg-muted p-4 flex items-center">
                <div className="userImg mr-3">{session.user.userImg ? <Image className="rounded-full" alt="User Image" width={28} height={28} src={session.user.userImg} /> : <RiShieldUserFill size={24} color="#666666" />}</div>
                <div className="name_email">
                    <p className="text-sm font-semibold text-gray-700">{session.user.username}</p>
                    <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="logout ml-auto cursor-pointer" title="Logout">
                            <MdOutlineLogout size={24} color="#666666" />
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form action={logout} className="w-fit">
                                <Button className="w-full" type="Submit">Yes</Button>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            : "LOADING..."
    )
}
