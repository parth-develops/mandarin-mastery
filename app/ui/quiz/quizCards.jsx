"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function QuizCards({ quizzes }) {
    return (
        quizzes.map(quiz => {
            return (
                <QuizCard key={quiz.id} quiz={quiz} />
            )
        })
    )
}

function QuizCard({ quiz }) {
    console.log(quiz);
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
            <div key={quiz.id}>
                <h3 className="mb-2">{quiz.title}</h3>
                <p className="mb-2">Description</p>
                {renderButton()}
            </div>
        )
    } else {
        return "LOADING..."
    }
}