// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'
import { getUserProfile, getLeaderboard } from '@/lib/db/users'

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId, // Only run the query if userId is available
  })
}

export const useLeaderboard = (limit: number = 10) => {
    return useQuery({
        queryKey: ['leaderboard', limit],
        queryFn: () => getLeaderboard(limit),
    });
};