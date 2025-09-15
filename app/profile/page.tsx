// app/examples/profile/page.tsx
'use client'

import { UserProfileCard } from '@/components/user/UserProfileCard'
import { AchievementGrid } from '@/components/achievements/AchievementGrid'
import { useSession } from '@/hooks/useSession' // A hypothetical hook for auth session
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'


// A mock session hook until you implement full Supabase Auth
const useMockSession = () => ({
    session: { user: { id: 'YOUR_USER_ID_FROM_DB' } }, // Replace with a real user ID from your `User` table
    isLoading: false,
});


export default function ProfilePage() {
    // Replace useMockSession with your actual session hook
    const { session, isLoading } = useMockSession(); 

    if (isLoading) {
        return <div>Loading session...</div>
    }

    if (!session) {
        // Handle unauthenticated state
        return <div>Please log in to see your profile.</div>
    }
    
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto p-4 space-y-8">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <UserProfileCard userId={session.user.id} />
                
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
                    <AchievementGrid userId={session.user.id} />
                </div>
            </div>
        </QueryClientProvider>
    )
}