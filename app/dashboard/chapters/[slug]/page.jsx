import { fetchChapterBySlug } from "@/app/lib/data"

export default async function ChapterPage({ params }) {

    const { slug } = params;
    const chapter = await fetchChapterBySlug(slug);
    const json = JSON.stringify(chapter);

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-semibold md:text-2xl mb-4">{chapter.title}</h1>
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                <pre className="max-w-full text-wrap">
                    {json}
                </pre>
            </div>
        </div>
    )
}
