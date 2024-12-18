import { fetchChapters } from "@/app/lib/data";
import { auth } from "@/app/auth";
import ChapterCard from "./ChapterCard";

export default async function ChapterCards() {
    const chapters = await fetchChapters();
    
    const { user } = await auth();

    const plainChapters = chapters.map(chapter => {
        const plainChapter = chapter.toObject();

        return {
            id: plainChapter._id.toString(),
            title: plainChapter.title,
            description: plainChapter.description,
            slug: plainChapter.slug,
        };
    });

    return (
        plainChapters.map((chapter, index) => {
            return (
                <>
                    <ChapterCard key={chapter.id} chapter={chapter} user={user} index={index} />
                </>
            )
        })
    )
}
