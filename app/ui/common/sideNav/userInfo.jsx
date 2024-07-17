"use client"

import { MdOutlineLogout } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { logout } from "@/app/lib/actions";
import {
    AlertDialog,
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
import { Skeleton } from "@/components/ui/skeleton"

export default function UserInfo() {
    const { data: session, status } = useSession();
    return (
        status === "authenticated" ?
            <div className="mt-auto bg-muted p-2 md:p-4 flex items-center">
                <div className="userImg mr-3">{session.user.userImg ? <Image className="rounded-full w-[20px] md:w-[24px]" width={24} height={24} alt="User Image" src={session.user.userImg} /> : <RiShieldUserFill size={24} color="#666666" />}</div>
                <div className="name_email">
                    <p className="text-xs md:text-sm font-semibold text-gray-700">{session.user.username}</p>
                    <p className="text-[12px] md:text-xs text-gray-400">{session.user.email}</p>
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
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form action={logout} className="w-fit">
                                <Button className="w-full" type="Submit">Yes</Button>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            : <div title="Loading userinfo" className="mt-auto p-4 flex items-center space-x-4">
                <Skeleton className="h-[28px] w-[28px] rounded-full" />
                <div className="space-y-2 w-full">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                </div>
            </div>
    )
}
