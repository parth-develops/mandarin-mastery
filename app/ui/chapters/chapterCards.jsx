"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChapterCards({ chapters, user }) {
    return (
        chapters.map(chapter =>
            <div key={chapter.id}>
                <h3 className="mb-2">{chapter.id} {chapter.title}</h3>
                <p className="mb-2">Description</p>
                <Link href={`/dashboard/chapters/${chapter.slug}`} className="w-100">
                    <Button type="button"
                        onClick={() => enrollUserInChapter(user.id, chapter.id)}
                    >
                        Enroll
                    </Button>
                </Link>
            </div>
        )
    )
}
