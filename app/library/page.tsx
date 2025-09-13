"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useEvent } from '@/hooks/useEvents';
import { useMedia } from '@/hooks/useMedia';
import { useSources } from '@/hooks/useSources';
import { useLocation } from '@/hooks/useLocations';
import EventCard from '@/components/library/EventCard';
import MediaGallery from '@/components/library/MediaGallery';
import SourceList from '@/components/library/SourceList';
import { Skeleton } from '@/components/library/Skeleton';
import { Card, CardContent } from '@/components/ui/Card';

const MapComponent = dynamic(() => import('@/components/library/MapComponent'), {
  ssr: false,
  loading: () => <Skeleton className="h-96 w-full" />,
});

const placeholderEvent = {
  id: '1',
  name: 'Loading Event Title...',
  description: 'Loading the event description from the database. This is a placeholder.',
  startDate: new Date().toISOString(),
  endDate: null,
  tags: ['loading'],
  locationId: '1',
  actorIds: [],
};

// 1. DEFINE A PLACEHOLDER LOCATION FOR AESTHETICS
// This object provides a beautiful default map view of Jerusalem.
const placeholderLocation = {
  id: 'default-location',
  name: 'Historic Jerusalem',
  description: 'A city of immense historical and cultural significance.',
  latitude: 31.7683,
  longitude: 35.2137,
};

export default function HomePage() {
  const eventId = '1';

  const { data: event, isLoading: isEventLoading, isError: isEventError } = useEvent(eventId);
  const { data: media, isLoading: isMediaLoading } = useMedia(eventId);
  const { data: sources, isLoading: isSourcesLoading } = useSources(eventId);
  const { data: location, isLoading: isLocationLoading } = useLocation(event?.locationId ?? null);

  // Determine what data to display for the event
  const displayEvent = event || placeholderEvent;

  // 2. DETERMINE WHICH LOCATION TO DISPLAY ON THE MAP
  // If the real location from the database exists, use it.
  // Otherwise, fall back to our beautiful placeholder location.
  const displayLocation = location || placeholderLocation;

  if (isEventLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {isEventError && (
        <Card className="mb-8 border-yellow-500 bg-yellow-50/50">
          <CardContent className="pt-6">
            <p className="text-center text-yellow-700">
              Could not load data from the database. Displaying placeholder structure.
            </p>
          </CardContent>
        </Card>
      )}

      <section className="mb-12">
        <EventCard event={displayEvent} />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Media Gallery</h2>
        {isMediaLoading ? <Skeleton className="h-48 w-full" /> : <MediaGallery media={media || []} />}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Historical Sources</h2>
        {isSourcesLoading ? <Skeleton className="h-48 w-full" /> : <SourceList sources={sources || []} />}
      </section>

      {/* 3. UPDATE THE MAP SECTION TO USE THE NEW LOGIC */}
      {/* This section will now show a skeleton while loading, and then ALWAYS show a map. */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Location on Map</h2>
        {isLocationLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <MapComponent location={displayLocation} event={displayEvent} />
        )}
      </section>
    </div>
  );
};