"use client";

import React from 'react';
import { useLocations } from '@/hooks/useLocations'; // Using the hook for locations
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LocationsPage() {
  const { data: locations, isLoading, isError, error } = useLocations();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Locations</h1>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Locations</h1>
        <p className="text-destructive mt-4">Failed to load locations: {error.message}</p>
      </div>
    );
  }

  if (!locations || locations.length === 0) {
    return (
        <div>
            <h1 className="text-3xl font-bold">Locations</h1>
            <p className="text-muted-foreground mt-4">No locations have been added to the database yet.</p>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Locations</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{location.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
    