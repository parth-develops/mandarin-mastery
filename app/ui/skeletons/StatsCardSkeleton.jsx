import { Skeleton } from "@/components/ui/skeleton"

export default function StatsCardSkeleton() {
    return (
        <>
            <div className="p-6 shadow">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-[42px] w-[42px] rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-[42px] w-full" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
            </div>
            <div className="p-6 shadow">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-[42px] w-[42px] rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-[42px] w-full" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
            </div>
            <div className="p-6 shadow">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-[42px] w-[42px] rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-[42px] w-full" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
            </div>
            <div className="p-6 shadow">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-[42px] w-[42px] rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-[42px] w-full" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full mt-4" />
            </div>
        </>
    )
}
