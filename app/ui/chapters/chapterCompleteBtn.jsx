"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";

export default function ChapterCompleteBtn({ userId, chapterId }) {
    return (
        <Button className="ml-auto" title="Mark this chapter as completed"
            onClick={() => markChapterAsComplete(userId, chapterId)}
        >
            <FaCheckCircle className="mr-1" /> Mark as completed
        </Button>
    )
}
