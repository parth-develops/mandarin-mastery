import { fetchChapterBySlug } from "@/app/lib/data"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function ChapterPage({ params }) {

    const { slug } = params;
    const chapter = await fetchChapterBySlug(slug);
    const json = JSON.stringify(chapter);
    const chapterContent = chapter.content.toObject();
    console.log(chapterContent);

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-semibold md:text-2xl mb-4">{chapter.title}</h1>
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                <Table >
                    <TableBody>
                        {
                            chapterContent.minimum.map(point => (
                                <TableRow key={point._id.toString()}>
                                    <TableCell>{point.english}</TableCell>
                                    <TableCell>{point.chinese}</TableCell>
                                    <TableCell>{point.pinyin}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
