"use client"

import { logout } from "@/app/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi"
import { GoBook } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import clsx from "clsx";
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathName = usePathname();
    
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <LuMenu size={16} />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            Mandarin Mastery
                            <span className="sr-only">Mandarin Mastery</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                { "bg-muted": pathName === "/dashboard" },
                            )}
                        >
                            <FiHome size={16} /> Dashboard
                        </Link>
                        <Link
                            href="/dashboard/chapters"
                            className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                { "bg-muted": pathName === "/dashboard/chapters" },
                            )}
                        >
                            <GoBook size={16} /> Chapters
                        </Link>
                        <Link
                            href="/dashboard/quiz"
                            className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                { "bg-muted": pathName === "/dashboard/quiz" },
                            )}
                        >
                            Quiz
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <FaRegUserCircle size={20} />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <form action={logout} className="w-full">
                            <button className="w-full" >Logout</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
