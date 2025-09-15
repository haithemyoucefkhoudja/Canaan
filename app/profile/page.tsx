/'use client'

import { UserProfileCard } from '@/components/user/UserProfileCard'
import { AchievementGrid } from '@/components/achievements/AchievementGrid'
// Corrected import line below
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { useSession } from '@/hooks/useSession'
import { SimpleLoginForm } from '@/components/SimpleLoginForm'

export default function ProfilePageWrapper() {
    // This is a great pattern. It ensures the QueryClient is provided
    // to the page and all its children.
    return (
        <QueryClientProvider client={queryClient}>
            <ProfilePage />
        </QueryClientProvider>
    )
}

function ProfilePage() {
    const { data: session, isLoading } = useSession();

    if (isLoading) {
        return <div className="container mx-auto p-4">Loading user session...</div>
    }

    if (!session) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                <SimpleLoginForm />
            </div>
        )
    }

    // This logic is perfect. The page now renders dynamically
    // based on the logged-in user's ID.
    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <UserProfileCard userId={session.user.id} />
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
                <AchievementGrid userId={session.user.id} />
            </div>
        </div>
    )
}