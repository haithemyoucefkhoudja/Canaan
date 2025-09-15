// components/user/UserProfileCard.tsx
'use client'

import { useUserProfile } from '@/hooks/useUsers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

interface UserProfileCardProps {
  userId: string
}

export function UserProfileCard({ userId }: UserProfileCardProps) {
  const { data: user, isLoading, isError, error } = useUserProfile(userId)

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load user profile: {error.message}</AlertDescription>
        </Alert>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.photo_url ?? undefined} alt={user?.display_name} />
          <AvatarFallback>{user?.display_name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user?.display_name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span className="font-semibold">XP:</span>
          <span>{user?.xp}</span>
        </div>
      </CardContent>
    </Card>
  )
}