// components/achievements/AchievementGrid.tsx
'use client'

import { useAchievements, useUserAchievements } from '@/hooks/useAchievements'
import { AchievementBadge } from './AchievementBadge'
import { Skeleton } from '@/components/ui/skeleton'

interface AchievementGridProps {
  userId: string
}

export function AchievementGrid({ userId }: AchievementGridProps) {
    const { data: allAchievements, isLoading: isLoadingAll } = useAchievements()
    const { data: userAchievements, isLoading: isLoadingUser } = useUserAchievements(userId)

    if (isLoadingAll || isLoadingUser) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        )
    }

    const userAchievementIds = new Set(userAchievements?.map(ua => ua.achievement_id));

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allAchievements?.map(ach => (
                <AchievementBadge
                    key={ach.id}
                    achievement={ach}
                    isUnlocked={userAchievementIds.has(ach.id)}
                />
            ))}
        </div>
    )
}