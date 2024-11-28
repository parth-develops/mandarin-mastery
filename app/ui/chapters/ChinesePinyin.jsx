"use client"

import dynamic from 'next/dynamic'
const MediaQuery = dynamic(() => import('react-responsive'), {
    ssr: false
});
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TbBulb } from 'react-icons/tb';


export default function ChinesePinyin({ chineseText, pinyinText }) {
    return (
        <>
            <MediaQuery minWidth={992}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{chineseText}</TooltipTrigger>
                        <TooltipContent side="right"><p>{pinyinText}</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </MediaQuery>
            <MediaQuery maxWidth={991}>
                <Popover>
                    <PopoverTrigger>{chineseText}</PopoverTrigger>
                    <PopoverContent>{pinyinText}</PopoverContent>
                </Popover>
            </MediaQuery>
        </>
    )
}

export function Hint() {
    return <>
        <MediaQuery minWidth={992}>
            <TbBulb size={24} className="mr-1" /> Hover the chinese text to see the pinyin
        </MediaQuery>
        <MediaQuery maxWidth={991}>
            <TbBulb size={24} className="mr-1" /> Tap the chinese text to see the pinyin
        </MediaQuery>
    </>
}
