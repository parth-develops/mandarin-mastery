import QuizCard from "./QuizCard"
import { fetchQuizzes } from "@/app/lib/data";

export default async function QuizCards() {
    const quizzes = await fetchQuizzes();

    return (
        quizzes.map((quiz, index) => {
            return (
                <QuizCard key={quiz.id} quiz={quiz} index={index} />
            )
        })
    )
}