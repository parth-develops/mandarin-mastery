"use client";

import Link from "next/link";
import { GoBook } from "react-icons/go";
import clsx from "clsx";
import { FiHome } from "react-icons/fi"
import { usePathname } from 'next/navigation';

export default function SideNav() {
    const pathName = usePathname();

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="/dashboard"
                className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    {
                        'bg-muted': pathName === "/dashboard"
                    }
                )}
            >
                <FiHome size={16} /> Dashboard
            </Link>
            <Link
                href="/dashboard/chapters"
                className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    {
                        'bg-muted': pathName === "/dashboard/chapters"
                    }
                )}
            >
                <GoBook size={16} /> Chapters
            </Link>
            <Link
                href="/dashboard/quiz"
                className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    {
                        'bg-muted': pathName === "/dashboard/quiz"
                    }
                )}
            >
                Quiz
            </Link>
        </nav>
    )
}
