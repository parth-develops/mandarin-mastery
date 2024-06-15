import ChapterCards from "@/app/ui/chapters/chapterCards";
import { fetchChapters, fetchUserChapter } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function Chapters() {
    const chapters = await fetchChapters();
    const { user } = await auth();
    let userChapters = await fetchUserChapter(user.id);
    userChapters = userChapters.chapters.map(chapter => {
        const plainChapter = chapter.toObject();

        return {
            chapter: plainChapter.chapter.toString(),
            isCompleted: plainChapter.isCompleted,
        }
    })

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
            <h1 className="text-lg font-semibold md:text-2xl mb-4">Chapters</h1>
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                <ChapterCards chapters={plainChapters} user={user} userChapters={userChapters} />
            </div>
        </div>
    )
}
