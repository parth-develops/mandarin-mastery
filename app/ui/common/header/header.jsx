"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link";
import { FiHome } from "react-icons/fi"
import { GoBook } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

export default function Header() {
    const pathname = usePathname();

    const generateBreadcrumbs = () => {
        const pathArray = pathname.split('/').filter((path) => path);
        const breadcrumbs = pathArray.map((path, index) => {
            const href = '/' + pathArray.slice(0, index + 1).join('/');
            return { href, label: path };
        });
        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

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
                                { "bg-muted": pathname === "/dashboard" },
                            )}
                        >
                            <FiHome size={16} /> Dashboard
                        </Link>
                        <Link
                            href="/dashboard/chapters"
                            className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                { "bg-muted": pathname.includes("chapters") },
                            )}
                        >
                            <GoBook size={16} /> Chapters
                        </Link>
                        <Link
                            href="/dashboard/quiz"
                            className={clsx(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                { "bg-muted": pathname.includes("quiz") },
                            )}
                        >
                            Quiz
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <Fragment key={index}>
                                {index !== 0 && <BreadcrumbSeparator />}
                                {index < breadcrumbs.length - 1 ? (
                                    <BreadcrumbItem>
                                        <BreadcrumbLink>
                                            <Link href={breadcrumb.href}>
                                                {breadcrumb.label.charAt(0).toUpperCase() + breadcrumb.label.slice(1)}
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {breadcrumb.label.charAt(0).toUpperCase() + breadcrumb.label.slice(1)}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
