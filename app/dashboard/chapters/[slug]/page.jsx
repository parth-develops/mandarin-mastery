import ChapterTable from "@/app/ui/chapters/ChapterTable";

export default function ChapterPage({ params }) {
    const { slug } = params;

    return (
        <div className="flex flex-col flex-1">
            <ChapterTable slug={slug} />
        </div>
    )
}
