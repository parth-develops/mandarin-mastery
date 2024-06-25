"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ChapterCards({ chapters, user }) {
    return (
        chapters.map(chapter => {
            return (
                <ChapterCard key={chapter.id} chapter={chapter} user={user} />
            )
        })
    )
}

function ChapterCard({ chapter, user }) {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        let userChapters = session?.user?.userChapters;

        const btnText = () => {
            if (userChapters) {
                const currentUserChapter = userChapters.find((element) => {
                    return element.chapter === chapter.id;
                });

                if (!currentUserChapter) {
                    return "Enroll";
                }

                return currentUserChapter.isCompleted ? "Explore Again" : "Resume"
            } else {
                return "Enroll";
            }
        }

        return (
            <div key={chapter.id}>
                <h3 className="mb-2">{chapter.title}</h3>
                <p className="mb-2">Description</p>
                <Link href={`/dashboard/chapters/${chapter.slug}`} className="w-100">
                    <Button type="button"
                        onClick={() => enrollUserInChapter(user.id, chapter.id)}
                    >
                        {btnText()}
                    </Button>
                </Link>
            </div>
        )
    } else {
        return "LOADING..."
    }
}
