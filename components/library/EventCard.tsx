
import React from 'react';
import Link from 'next/link';
import type { Event } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /> <line x1="16" x2="16" y1="2" y2="6" /> <line x1="8" x2="8" y1="2" y2="6" /> <line x1="3" x2="21" y1="10" y2="10" /> </svg> );

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card className="hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground pt-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formatDate(event.startDate)}</span>
            {event.endDate && <span className="mx-2">-</span>}
            {event.endDate && <span>{formatDate(event.endDate)}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base text-foreground/80">{event.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {event.tags.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {/* UPDATED: Link now points to /library/events */}
        <Link href="/library/events" passHref className="w-full">
          <Button 
            variant="outline" 
            className="w-full mt-2 text-green-400 border-green-500 hover:bg-green-500 hover:text-slate-900 transition-colors"
          >
            Explore All Events
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;