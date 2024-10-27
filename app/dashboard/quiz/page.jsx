import { fetchQuizzes } from "@/app/lib/data";
import QuizCards from "@/app/ui/quiz/QuizCards";

export default async function Quiz() {
  const quizData = await fetchQuizzes();

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold md:text-2xl mb-4">Quizzes</h1>
        <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
          <QuizCards quizzes={quizData} />
        </div>
      </div>
    </div>
  )
}
