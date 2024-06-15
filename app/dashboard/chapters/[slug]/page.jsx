import { fetchChapterBySlug } from "@/app/lib/data"
import ChapterCompleteBtn from "@/app/ui/chapters/chapterCompleteBtn";
import { auth } from "@/auth";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TbBulb } from "react-icons/tb";

export default async function ChapterPage({ params }) {

    const { slug } = params;
    const { user } = await auth();
    const chapter = await fetchChapterBySlug(slug);
    const chapterContent = chapter.content.toObject();

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-semibold md:text-2xl mb-4">{chapter.title}</h1>
            <div className="flex items-center mb-2">
                <div className="flex items-center">
                    <TbBulb size={24} className="mr-1" /> Hover the chinese text to see the pinyin
                </div>
                <ChapterCompleteBtn userId={user.id} chapterId={chapter.id} />
            </div>
            <div className="cards p-4 flex-auto h-0 flex gap-4 border rounded-lg shadow-sm">

                <Table className="mb-5">
                    <TableBody>
                        <h2 className="font-bold mb-4">Bare Minimum</h2>
                        {
                            chapterContent.minimum.map(point => (
                                <TableRow key={point._id.toString()}>
                                    <TableCell>{point.english}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {point.chinese}
                                                </TooltipTrigger>
                                                <TooltipContent side="right">
                                                    <p>{point.pinyin}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <h2 className="font-bold mt-5 mb-3">For brave ones</h2>
                        {
                            chapterContent.brave.map(point => (
                                <TableRow key={point._id.toString()}>
                                    <TableCell>{point.english}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {point.chinese}
                                                </TooltipTrigger>
                                                <TooltipContent side="right">
                                                    <p>{point.pinyin}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <h2 className="font-bold mt-5 mb-3">For those who want more</h2>
                        {
                            chapterContent.more.map(point => (
                                <TableRow key={point._id.toString()}>
                                    <TableCell>{point.english}</TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    {point.chinese}
                                                </TooltipTrigger>
                                                <TooltipContent side="right">
                                                    <p>{point.pinyin}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
