import { Skeleton } from "@/components/ui/skeleton";

export default function ChapterCardsSkeleton({ count }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="p-6 shadow border rounded-xl">
                    <Skeleton className="h-[84px] w-full" />
                    <Skeleton className="h-4 w-full mt-4" />
                    <Skeleton className="h-4 w-full mt-4" />
                    <Skeleton className="h-4 w-full mt-4" />
                    <Skeleton className="h-4 w-full mt-4" />
                </div>
            ))}
        </>
    )
}
