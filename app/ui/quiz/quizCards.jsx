"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function QuizCards({ quizzes }) {
    quizzes.map(quiz => {
        return (
            <QuizCard key={quiz.id} quiz={quiz} />
        )
    })
}

function QuizCard() {
    const { data: session, status, update } = useSession();
    const router = useRouter()

    if (status === "authenticated") {
        let userChapters = session?.user?.userChapters;

        const renderButton = () => {
            const handleEnroll = async () => {
                await enrollUserInChapter(user.id, chapter.id, chapter.slug);
                const newUserSession = await fetchUserData(user.id);
                await update({ ...session, user: newUserSession });
                router.push(`/dashboard/chapters/${chapter.slug}`)
            }

            if (userChapters) {
                const currentUserChapter = userChapters.find((element) => {
                    return element.chapter === chapter.id;
                });

                if (!currentUserChapter) {
                    return <Button type="button" onClick={handleEnroll}>Enroll</Button>
                }

                return currentUserChapter.isCompleted ?
                    <Button type="button"
                        onClick={() => router.push(`/dashboard/chapters/${chapter.slug}`)}
                    >
                        Explore Again
                    </Button> :
                    <Button type="button"
                        onClick={() => router.push(`/dashboard/chapters/${chapter.slug}`)}
                    >
                        Resume
                    </Button>
            } else {
                return <Button type="button" onClick={handleEnroll}>Enroll</Button>
            }
        }

        return (
            <div key={chapter.id}>
                <h3 className="mb-2">{chapter.title}</h3>
                <p className="mb-2">Description</p>
                {renderButton()}
            </div>
        )
    } else {
        return "LOADING..."
    }
}