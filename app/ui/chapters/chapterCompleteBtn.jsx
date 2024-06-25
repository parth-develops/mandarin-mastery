"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ChapterCompleteBtn({ userId, chapterId }) {
    const { data: session, update, status } = useSession();
    console.log("curr session", session);
    const userChapters = session?.user?.userChapters;
    const [user, setUser] = useState({});

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user)
            console.log("effect", session.user)
        }
    }, [session])

    if (status === "authenticated") {
        const currentUserChapterIndex = userChapters.findIndex(chap => chap.chapter === chapterId);
        const currentUserChapter = userChapters[currentUserChapterIndex];
        console.log("curr chap", currentUserChapter);
        if (currentUserChapter.isCompleted) {
            return (
                <Badge className="ml-auto" title="You have completed this chapter" variant="success">Completed</Badge>
            )
        } else {
            const completeChapter = async (userId, chapterId) => {
                const updatedChapters = [...userChapters];
                updatedChapters[currentUserChapterIndex] = {
                    ...currentUserChapter,
                    isCompleted: true,
                };

                // Update the user object
                const updatedSession = {
                    ...session,
                    user: { ...user, userChapters: updatedChapters },
                };

                console.log("Update session", updatedSession);

                // Call the update method with the modified user object
                await update(updatedSession);
                await markChapterAsComplete(userId, chapterId);
            }

            return (
                <Button className="ml-auto" title="Mark this chapter as completed"
                    onClick={() => completeChapter(userId, chapterId)}
                >
                    <FaCheckCircle className="mr-1" /> Mark as completed
                </Button>
            )
        }
    } else {
        return "LOADING...";
    }

}
