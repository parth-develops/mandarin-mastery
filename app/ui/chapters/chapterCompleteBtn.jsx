"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";
import { useSession } from "next-auth/react";

export default function ChapterCompleteBtn({ userId, chapterId }) {
    const { data: session, status, update } = useSession();
    const currentUserChapter = session.user.userChapters.find(chap => chap.chapter === chapterId);

    const completeChapter = async (userId, chapterId) => {
        await markChapterAsComplete(userId, chapterId);

        if (currentUserChapter) {
            currentUserChapter.isCompleted = true;
            await update(session);
        }
    }

    return (
        <Button className="ml-auto" title="Mark this chapter as completed"
            onClick={() => completeChapter(userId, chapterId)}
        >
            <FaCheckCircle className="mr-1" /> Mark as completed
        </Button>
    )
}
