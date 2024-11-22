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
import chapter1Sounds from "@/data/chapter1Sounds";
import chapter2Sounds from "@/data/chapter2Sounds";
import React from "react";

export default async function ChapterTable({ slug }) {
    let chapterSounds;
    switch (slug) {
        case "chapter-1":
            chapterSounds = chapter1Sounds;
            break;

        case "chapter-2":
            chapterSounds = chapter2Sounds;
            break;

        default:
            break;
    }

    const { BARE_SOUNDS, BRAVE_SOUNDS, MORE_SOUNDS } = chapterSounds;

    const { user } = await auth();
    const chapter = await fetchChapterBySlug(slug);
    const chapterContent = chapter.content.toObject();

    return (
        <>
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
                                <TableRow key={point.english + index} id={point.english + index}>
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
                                        <div className="flex items-center justify-center gap-3">
                                            {
                                                BARE_SOUNDS[index]?.map((sound, soundIndex) => {
                                                    return <React.Fragment key={sound}>
                                                        <Sound id={sound} key={sound} audio={sound} />
                                                        {BARE_SOUNDS[index].length > 1 && soundIndex !== BARE_SOUNDS[index].length - 1 ? <span key={sound + soundIndex}>or</span> : ""}
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <tr><td className="font-bold pt-5 pb-3 text-lg">For brave ones</td></tr>
                        {
                            chapterContent.brave.map((point, index) => (
                                <TableRow key={point.english + index} id={point.english + index}>
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
                                        <div className="flex items-center justify-center gap-3">
                                            {
                                                BRAVE_SOUNDS[index]?.map((sound, soundIndex) => {
                                                    return <React.Fragment key={sound}>
                                                        <Sound id={sound} key={sound} audio={sound} />
                                                        {BRAVE_SOUNDS[index].length > 1 && soundIndex === 0 ? <span key={sound + soundIndex}>or</span> : ""}
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <tr><td className="font-bold pt-5 pb-3 text-lg">For those who want more</td></tr>
                        {
                            chapterContent.more.map((point, index) => (
                                <TableRow key={point.english + index} id={point.english + index}>
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
                                        <div className="flex items-center justify-center gap-3">
                                            {

                                                MORE_SOUNDS[index]?.map((sound, soundIndex) => {
                                                    return <React.Fragment key={sound}>
                                                        <Sound id={sound} key={sound} audio={sound} />
                                                        {MORE_SOUNDS[index].length > 1 && soundIndex === 0 ? <span key={sound + soundIndex}>or</span> : ""}
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
