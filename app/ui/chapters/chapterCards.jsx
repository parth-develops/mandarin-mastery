"use client"

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from 'next-nprogress-bar';
import Image from "next/image";
import { useState } from "react";
import one from "@/assets/img/one.png";
import two from "@/assets/img/two.png";
import "./chapterCards.scss";

export default function ChapterCards({ chapters, user }) {
    return (
        chapters.map((chapter, index) => {
            return (
                <ChapterCard key={chapter.id} chapter={chapter} user={user} index={index} />
            )
        })
    )
}

const IMAGES = [one, two]

function ChapterCard({ chapter, user, index }) {
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
            <div key={chapter.id} className="text-center p-4 rounded-xl boxShadow h-fit w-1/6">
                <div className="text-center pointer-events-none">
                    <Image src={IMAGES[index]} alt={index + 1} width={100} height={100} title={chapter.title} className="mx-auto" />
                </div>
                <h3>{chapter.title}</h3>
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
