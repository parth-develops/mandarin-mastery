import ChapterCards from "@/app/ui/chapters/chapterCards";
import { fetchChapters, fetchUserChapter } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function Chapters() {
    const chapters = await fetchChapters();
    const { user } = await auth();

    const plainChapters = chapters.map(chapter => {
        const plainChapter = chapter.toObject();

        return {
            id: plainChapter._id.toString(),
            title: plainChapter.title,
            content: plainChapter.content,
            slug: plainChapter.slug,
        };
    });

    return (
        <div className="flex flex-col flex-1">
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                <ChapterCards chapters={plainChapters} user={user} />
            </div>
        </div>
    )
}
