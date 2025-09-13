"use client";

import React from 'react';
import { useEvents } from '@/hooks/useEvents';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function EventsPage() {
  const { data: events, isLoading, isError, error } = useEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Events</h1>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Events</h1>
        {/* Added dark mode text color for errors */}
        <p className="text-destructive mt-4 dark:text-red-400">Failed to load events: {error.message}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
        <div>
            <h1 className="text-3xl font-bold">Events</h1>
            {/* Added dark mode text color */}
            <p className="text-muted-foreground mt-4 dark:text-slate-400">No events have been added to the database yet.</p>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          // This Card component is where the magic happens.
          // We add classes to define how it should look in dark mode.
          <Card key={event.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-50">{event.name}</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {new Date(event.startDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground dark:text-slate-400 line-clamp-3">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}