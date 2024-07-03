import { fetchQuizzes } from "@/app/lib/data";
import QuizCards from "@/app/ui/quiz/quizCards";

export default async function Quiz() {
  const quizData = await fetchQuizzes();
  console.log("quizData", quizData);

  return (
    <div className="flex items-center">
      <QuizCards quiz={quizData} />
    </div>
  )
}
