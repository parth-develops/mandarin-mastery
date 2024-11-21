import { fetchChapterBySlug } from "@/app/lib/data"
import ChapterCompleteBtn from "@/app/ui/chapters/ChapterCompleteBtn";
import Sound from "@/app/ui/chapters/Sound";
import { auth } from "@/auth";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TbBulb } from "react-icons/tb";

const BARE_SOUNDS = ["hello.mp3"];

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
                        <tr><td className="font-bold py-3 text-lg">Bare Minimum</td></tr>
                        {
                            chapterContent.minimum.map((point, index) => (
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
                                    <TableCell>
                                        <Sound audio={BARE_SOUNDS[0]} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <tr><td className="font-bold pt-5 pb-3 text-lg">For brave ones</td></tr>
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
                        <tr><td className="font-bold pt-5 pb-3 text-lg">For those who want more</td></tr>
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
