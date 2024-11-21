'use client'

import { enrollUserInChapter } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from 'next-nprogress-bar';
import Image from "next/image";
import { useState } from "react";
import one from "@/assets/img/one.png";
import two from "@/assets/img/two.png";
import ChapterCardsSkeleton from "../skeletons/ChapterCardsSkeleton";

const IMAGES = [one, two]

export default function ChapterCard({ chapter, user, index }) {
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
            <div className="text-center p-4 rounded-xl shadow border h-full">
                <div className="text-center pointer-events-none">
                    <Image src={IMAGES[index]} alt={index + 1} width={100} height={100} title={chapter.title} className="mx-auto" />
                </div>
                <h3 className="font-semibold">{chapter.title}</h3>
                <p className="my-3 text-[14px] opacity-80">{chapter.description}</p>
                <div>
                    {renderButton()}
                </div>
            </div>
        )
    } else {
        return <ChapterCardsSkeleton count={1} />
    }
}