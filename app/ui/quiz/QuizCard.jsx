"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import one from "@/assets/img/one.png";
import two from "@/assets/img/two.png";
import QuizCardsSkeleton from "../skeletons/QuizCardsSkeleton";

const IMAGES = [one, two]

export default function QuizCard({ quiz, index }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "authenticated") {
        let userQuizzes = session?.user?.quizzes;

        const renderButton = () => {
            if (userQuizzes) {
                const currentUserQuiz = userQuizzes.find((element) => {
                    return element.quiz === quiz.id;
                });

                if (!currentUserQuiz) {
                    return <Button type="button" onClick={() => router.push(`/dashboard/quiz/${quiz.slug}`)}>Take Quiz</Button>
                }

                return currentUserQuiz.isTaken &&
                    <Button type="button" onClick={() => router.push(`/dashboard/quiz/${quiz.slug}`)}>Take Again</Button>
            } else {
                return <Button type="button" onClick={() => router.push(`/dashboard/quiz/${quiz.slug}`)}>Take Quiz</Button>
            }
        }

        return (
            <div className="text-center p-4 rounded-xl shadow border h-full">
                <div className="text-center pointer-events-none">
                    <Image src={IMAGES[index]} alt={index + 1} width={100} height={100} title={quiz.title} className="mx-auto" />
                </div>
                <h3 className="font-semibold">{quiz.title}</h3>
                <p className="my-3 text-[14px] opacity-80">{quiz.description}</p>
                {renderButton()}
            </div>
        )
    } else {
        return <QuizCardsSkeleton count={1} />
    }
}