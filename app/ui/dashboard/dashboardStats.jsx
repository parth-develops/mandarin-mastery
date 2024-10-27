import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GoBook } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { RiProgress5Line } from "react-icons/ri";
import { fetchChaptersCount, fetchQuizCount } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function DashboardStats() {
    const totalChapters = await fetchChaptersCount();
    const totalQuizzes = await fetchQuizCount();
    const { user } = await auth();

    const chaptersCompleted = user.userChapters.filter(chapter => chapter.isCompleted).length;
    const quizzesCompleted = user.quizzes.filter(quiz => quiz.isPassed).length;
    const chaptersPercentage = Math.round((chaptersCompleted / totalChapters) * 100);
    const quizzesPercentage = Math.round((quizzesCompleted / totalQuizzes) * 100);

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-[10px]">
                            <GoBook size={22} color="#FFFFFF" />
                        </div>
                        <div>
                            <CardDescription className="text-xs">Chapters Completed</CardDescription>
                            <CardTitle className="text-xl">{chaptersCompleted} out of {totalChapters}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={chaptersPercentage} />
                </CardContent>
                <CardFooter>
                    <div className="text-base text-muted-foreground flex items-center gap-1">
                        <GiProgression size={16} className="text-primary" /> {chaptersPercentage}%
                    </div>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-[10px]">
                            <MdOutlineQuiz size={22} color="#FFFFFF" />
                        </div>
                        <div>
                            <CardDescription className="text-xs">Quiz Completed</CardDescription>
                            <CardTitle className="text-xl">{quizzesCompleted} out of {totalQuizzes}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={quizzesPercentage} />
                </CardContent>
                <CardFooter>
                    <div className="text-base text-muted-foreground flex items-center gap-1">
                        <GiProgression size={16} className="text-primary" /> {quizzesPercentage}%
                    </div>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-[10px]">
                            <RiProgress5Line size={22} color="#FFFFFF" />
                        </div>
                        <div>
                            <CardDescription className="text-xs">Overall Completion</CardDescription>
                            <CardTitle className="text-xl">{chaptersCompleted + quizzesCompleted} out of {totalChapters + totalQuizzes}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={Math.round(((chaptersCompleted + quizzesCompleted) / (totalChapters + totalQuizzes)) * 100)} />
                </CardContent>
                <CardFooter>
                    <div className="text-base text-muted-foreground flex items-center gap-1">
                        <GiProgression size={16} className="text-primary" /> {Math.round(((chaptersCompleted + quizzesCompleted) / (totalChapters + totalQuizzes)) * 100)}%
                    </div>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary p-[10px]">
                            <IoMdTime size={22} color="#FFFFFF" />
                        </div>
                        <div>
                            <CardDescription className="text-xs">Time Spent</CardDescription>
                            <CardTitle className="text-xl">5 hours 20 min</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={33} aria-label="25% increase" />
                </CardContent>
                <CardFooter>
                    <div className="text-base text-muted-foreground flex items-center gap-1">
                        <GiProgression size={16} className="text-primary" /> {Math.round((1 / 3) * 100)}%
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
