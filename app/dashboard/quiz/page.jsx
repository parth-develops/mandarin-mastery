import { fetchQuizCount } from "@/app/lib/data";
import QuizCards from "@/app/ui/quiz/QuizCards";
import QuizCardsSkeleton from "@/app/ui/skeletons/QuizCardsSkeleton";
import { Suspense } from "react";

export default async function Quiz() {
  const quizCount = await fetchQuizCount();

  return (
    <div className="flex flex-col flex-1">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Suspense fallback={<QuizCardsSkeleton count={quizCount} />}>
          <QuizCards />
        </Suspense>
      </div>
    </div>
  )
}
