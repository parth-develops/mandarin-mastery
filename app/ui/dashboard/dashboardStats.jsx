import { Suspense } from 'react';
import StatsCardSkeleton from '../skeletons/StatsCardSkeleton';
import StatsCards from './StatsCards';

export default function DashboardStats() {
    return (
        <div className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Suspense fallback={<StatsCardSkeleton />}>
                <StatsCards />
            </Suspense>
        </div>
    )
}
