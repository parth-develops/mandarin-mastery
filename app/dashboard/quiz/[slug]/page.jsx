import { fetchQuizBySlug } from '@/app/lib/data';
import QuizUi from '@/app/ui/quiz/quizUi';

export default async function QuizPage({ params }) {
    const { slug } = params;
    const quiz = await fetchQuizBySlug(slug);

    console.log(quiz);
    return <QuizUi quiz={quiz} />
}
