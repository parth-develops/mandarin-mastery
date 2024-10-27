import { fetchQuizBySlug } from '@/app/lib/data';
import QuizUi from '@/app/ui/quiz/QuizUi';

export default async function QuizPage({ params }) {
    const { slug } = params;
    const quiz = await fetchQuizBySlug(slug);

    return <QuizUi quiz={quiz} />
}
