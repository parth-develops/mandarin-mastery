"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChapterCards({ chapters, user }) {
    const btnText = (chapterId) => {
        let string;

        user.chapters.forEach((element) => {
            console.log(element);
            if (element.isCompleted) {
                string = "Explore Again";
                return;
            } else {
                string = element.chapter === chapterId ? "Resume" : "Enroll";
            }
        })

        return string;
    }

    return (
        chapters.map(chapter => {
            console.log(user);
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
