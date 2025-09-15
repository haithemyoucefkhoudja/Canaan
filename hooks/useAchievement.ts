// hooks/useAchievements.ts
import { useQuery } from '@tanstack/react-query'
import { getAllAchievements, getUserAchievements } from '@/lib/db/achievements'

export const useAchievements = () => {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAllAchievements,
  })
}

export const useUserAchievements = (userId: string) => {
  return useQuery({
    queryKey: ['userAchievements', userId],
    queryFn: () => getUserAchievements(userId),
    enabled: !!userId,
  })
}