"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge"

export default function ChapterCompleteBtn({ userId, chapterId, userChapters }) {
    // const currentUserChapterIndex = userChapters.findIndex(chap => chap.chapter === chapterId);
    // const currentUserChapter = userChapters[currentUserChapterIndex];
    // console.log("curr chap", currentUserChapter);

    // if (currentUserChapter.isCompleted) {
    //     return (
    //         <Badge className="ml-auto" title="You have completed this chapter" variant="success">Completed</Badge>
    //     )
    // } else {
    // const completeChapter = async (userId, chapterId) => {
    //     await markChapterAsComplete(userId, chapterId);
    // }

    return (
        <Button className="ml-auto" title="Mark this chapter as completed"
            // onClick={() => completeChapter(userId, chapterId)}
        >
            <FaCheckCircle className="mr-1" /> Mark as completed
        </Button>
    )
    // }
}
