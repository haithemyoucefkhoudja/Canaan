
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface Event {
  id: string;
  name: string;
  startDate: string;
  description: string;
}

interface EventDetailsProps {
  event: Event | null;
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    // 'sticky top-24' ensures it stays in view while scrolling the timeline
    <div className="sticky top-24">
      {/* 
        NEW: We make the card a flex column with a max height.
        This allows the content area to grow and become scrollable.
      */}
      <Card className="bg-slate-950 border border-slate-800 flex flex-col max-h-[80vh]">
        <CardHeader>
          {event ? (
            <>
              <CardTitle className="text-2xl text-green-400">{event.name}</CardTitle>
              <CardDescription className="text-slate-400">
                {new Date(event.startDate).toLocaleDateString()}
              </CardDescription>
            </>
          ) : (
            <CardTitle className="text-slate-500">Select an Event</CardTitle>
          )}
        </CardHeader>

        {/* 
          NEW: 'overflow-y-auto' adds a vertical scrollbar ONLY if the content is too long.
        */}
        <CardContent className="overflow-y-auto">
          {event ? (
            <p className="text-slate-300 whitespace-pre-wrap">{event.description}</p>
          ) : (
            <p className="text-center text-slate-600 pt-10">Click "Read more" on an event to see its full details here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}