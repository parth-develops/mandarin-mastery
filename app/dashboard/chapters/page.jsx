import { fetchChaptersCount } from "@/app/lib/data";
import ChapterCards from "@/app/ui/chapters/ChapterCards";
import ChapterCardsSkeleton from "@/app/ui/skeletons/ChapterCardsSkeleton";
import { Suspense } from "react";

export default async function Chapters() {
    const chaptersCount = await fetchChaptersCount();

    return (
        <div className="flex flex-col flex-1">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Suspense fallback={<ChapterCardsSkeleton count={chaptersCount} />}>
                    <ChapterCards />
                </Suspense>
            </div>
        </div>
    )
}
