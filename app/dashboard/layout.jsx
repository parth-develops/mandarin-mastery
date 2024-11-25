import Link from "next/link";
import { auth } from "@/app/auth";

import SideNav from "../ui/common/sideNav/SideNav";
import Header from "../ui/common/header/Header";
import SessionProvider from "../SessionProvider";
import UserInfo from "../ui/common/sideNav/UserInfo";
import GlobalProgressBar from "../ui/common/globalProgressBar/GlobalProgressBar";

export default async function Layout({ children }) {
    const session = await auth();

    if (!session.user) return null;

    return (
        <SessionProvider>
            <GlobalProgressBar />
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                                <span className="">Mandarin Mastery</span>
                            </Link>
                        </div>
                        <div className="flex flex-col flex-1">
                            <SideNav />
                            <UserInfo />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col overflow-auto">
                    <Header>
                        <UserInfo />
                    </Header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>
    )
}