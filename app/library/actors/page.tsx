"use client";

import React from 'react';
import { useActors } from '@/hooks/useActors'; // Using the hook for actors
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// If you have an Avatar component, you could import it here
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

export default function ActorsPage() {
  const { data: actors, isLoading, isError, error } = useActors();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Actors</h1>
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Actors</h1>
        <p className="text-destructive mt-4">Failed to load actors: {error.message}</p>
      </div>
    );
  }

  if (!actors || actors.length === 0) {
    return (
        <div>
            <h1 className="text-3xl font-bold">Actors</h1>
            <p className="text-muted-foreground mt-4">No actors have been added to the database yet.</p>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Actors</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {actors.map((actor) => (
          <Card key={actor.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              {/* Optional: Add an avatar if you have one in your data */}
              {/* <Avatar> <AvatarImage src={actor.avatarUrl} /> <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback> </Avatar> */}
              <div className="flex-grow">
                <CardTitle>{actor.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4">{actor.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}