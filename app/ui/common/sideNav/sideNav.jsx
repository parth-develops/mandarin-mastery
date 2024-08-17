"use client";

import Link from "next/link";
import { GoBook } from "react-icons/go";
import clsx from "clsx";
import { FiHome } from "react-icons/fi"
import { usePathname } from 'next/navigation';
import { MdOutlineQuiz } from "react-icons/md";

export default function SideNav() {
    const pathname = usePathname();

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="/dashboard"
                className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    {
                        'bg-muted': pathname === "/dashboard"
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
                        'bg-muted': pathname.includes("chapters")

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
                        'bg-muted': pathname.includes("quiz")
                    }
                )}
            >
                <MdOutlineQuiz size={16} /> Quiz
            </Link>
        </nav>
    )
}
