"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { useSession } from "next-auth/react";

export default function ChapterCards({ chapters, user, userChapters }) {
    // const { data: session, status, update } = useSession();
    // console.log(session);
    const btnText = (chapterId) => {
        let string;

        userChapters.forEach((element) => {
            if (element.isCompleted) {
                string = "Explore Again";
            } else {
                string = element.chapter === chapterId ? "Resume" : "Enroll";
            }
        })

        return string;
    }

    return (
        chapters.map(chapter => {
            return (
                <div key={chapter.id}>
                    <h3 className="mb-2">{chapter.title}</h3>
                    <p className="mb-2">Description</p>
                    <Link href={`/dashboard/chapters/${chapter.slug}`} className="w-100">
                        <Button type="button"
                            onClick={() => enrollUserInChapter(user.id, chapter.id)}
                        >
                            {btnText(chapter.id)}
                        </Button>
                    </Link>
                </div>
            )
        }
        )
    )
}
