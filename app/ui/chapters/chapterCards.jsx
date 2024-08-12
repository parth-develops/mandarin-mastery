"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from 'next-nprogress-bar';
import { useState } from "react";

export default function ChapterCards({ chapters, user }) {
    return (
        chapters.map(chapter => {
            return (
                <ChapterCard key={chapter.id} chapter={chapter} user={user} />
            )
        })
    )
}

function ChapterCard({ chapter, user }) {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    if (status === "authenticated") {
        let userChapters = session?.user?.userChapters;

        const renderButton = () => {
            const handleEnroll = async () => {
                setIsLoading(true);
                await enrollUserInChapter(user.id, chapter.id, chapter.slug);
                router.push(`/dashboard/chapters/${chapter.slug}?action=enroll`);
                setIsLoading(false);
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
                        onClick={() => {
                            setIsLoading(true);
                            router.push(`/dashboard/chapters/${chapter.slug}`);
                            setIsLoading(false);
                        }}
                        disabled={isLoading ? true : false}
                    >
                        Explore Again
                    </Button> :
                    <Button type="button"
                        onClick={() => {
                            setIsLoading(true);
                            router.push(`/dashboard/chapters/${chapter.slug}`)
                            setIsLoading(false);
                        }}
                        disabled={isLoading ? true : false}
                    >
                        Resume
                    </Button>
            } else {
                return <Button type="button" disabled={isLoading ? true : false} onClick={handleEnroll}>Enroll</Button>
            }
        }

        return (
            <div key={chapter.id}>
                <h3 className="mb-2">{chapter.title}</h3>
                <p className="mb-2">Description</p>
                <div>

                    {renderButton()}
                </div>
            </div>
        )
    } else {
        return "Skeleton loading here"
    }
}
