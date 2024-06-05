import { fetchChapters } from "@/app/lib/data";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Chapters() {
    const chapters = await fetchChapters();
    const { user } = await auth();

    const enrollUser = (userId, chapterId) => {
    }

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-semibold md:text-2xl mb-4">Chapters</h1>
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                {
                    chapters.map(chapter =>
                        <div key={chapter.id}>
                            <h3 className="mb-2">{chapter.id} {chapter.title}</h3>
                            <p className="mb-2">Description</p>
                            <Button type="button">
                                <Link href={`/dashboard/chapters/${chapter.slug}`}>
                                    Enroll
                                </Link>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
