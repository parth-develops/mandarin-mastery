"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/app/lib/data";

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
        
        if (currentUserChapter?.isCompleted) {
            return (
                <Badge className="ml-auto" title="You have completed this chapter" variant="success">Completed</Badge>
            )
        } else {
            const completeChapter = async (userId, chapterId) => {
                await markChapterAsComplete(userId, chapterId);
                const newUserSession = await fetchUserData(user.id);
                await update({ ...session, user: newUserSession });
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
        return <Badge className="ml-auto" title="Loading..." variant="outline">Loading...</Badge>
    }

}
