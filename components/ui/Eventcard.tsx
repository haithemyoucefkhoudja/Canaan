// src/components/ui/EventCard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button'; // Assuming you have a Button component

// Define the type for a single event based on your page's usage
interface Event {
  id: string;
  name: string;
  startDate: string;
  description: string;
}

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
  isSelected: boolean;
}

export default function EventCard({ event, onSelect, isSelected }: EventCardProps) {
  return (
    <div className="transform transition-transform duration-300 ease-in-out hover:scale-105">
      <Card 
        className={`bg-slate-900 border-2 ${isSelected ? 'border-green-500' : 'border-slate-800'}`}
      >
        <CardHeader>
          <CardTitle className="text-slate-50">{event.name}</CardTitle>
          <CardDescription className="text-slate-400">
            {new Date(event.startDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 line-clamp-3 mb-4">{event.description}</p>
          <Button 
            onClick={() => onSelect(event)}
            variant="outline" 
            className="w-full text-green-400 border-green-500 hover:bg-green-500 hover:text-slate-900"
          >
            Read more
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}