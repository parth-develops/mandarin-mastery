import { fetchQuizzes } from "@/app/lib/data";
import QuizUi from "@/app/ui/quiz/quizUi";

export default async function Quiz() {
  const quizData = await fetchQuizzes();
  console.log("quizData", quizData);

  return (
    <div className="flex items-center">
      <QuizUi quiz={quizData} />
    </div>
  )
}
