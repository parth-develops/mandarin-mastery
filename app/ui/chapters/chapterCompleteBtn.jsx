"use client"

import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { markChapterAsComplete } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/app/lib/data";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next-nprogress-bar';

export default function ChapterCompleteBtn({ userId, chapterId }) {
    const { data: session, update, status } = useSession();
    const userChapters = session?.user?.userChapters;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    async function updateSession(userId) {
        const newUserSession = await fetchUserData(userId);
        console.log("NEWSESS", newUserSession);
        await update({ ...session, user: newUserSession });
    }

    useEffect(() => {
        if (searchParams.size > 0) {
            if (searchParams.get("action") === "enroll") {
                updateSession(user.id);

                const currentUrl = window.location.pathname;
                router.replace(currentUrl);
            }
        }
    }, [])

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user)
        }
    }, [session])

    const currentUserChapterIndex = userChapters?.findIndex(chap => chap.chapter === chapterId);
    const currentUserChapter = userChapters && userChapters[currentUserChapterIndex];

    if (currentUserChapter?.isCompleted) {
        return (
            <Badge className="ml-auto" title="You have completed this chapter" variant="success">Completed</Badge>
        )
    } else {
        const completeChapter = async (userId, chapterId) => {
            setIsLoading(true);
            await markChapterAsComplete(userId, chapterId);
            const newUserSession = await fetchUserData(user.id);
            await update({ ...session, user: newUserSession });
            setIsLoading(false);
        }

        return (
            <Button className="ml-auto" loading={isLoading} disabled={status !== "authenticated" ? true : false} title="Mark this chapter as completed"
                onClick={() => completeChapter(userId, chapterId)}
            >
                <FaCheckCircle className="mr-1" /> Mark as completed
            </Button>
        )
    }

}
