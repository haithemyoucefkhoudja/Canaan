
import React, { useState } from 'react';
import type { Media } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// --- Your Original Icons ---
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m15 18-6-6 6-6" /> </svg> );
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m9 18 6-6-6-6" /> </svg> );
const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 8-6 4 6 4V8Z" /> <rect width="14" height="12" x="2" y="6" rx="2" ry="2" /> </svg> );

// NEW: A set of hardcoded placeholder images for demonstration
const placeholderMedia: Media[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1579852988189-c4520cb5b8a0?q=80&w=1974&auto=format&fit=crop', caption: 'Dome of the Rock, Jerusalem', type: 'image' },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1628198349472-a4216262960f?q=80&w=2070&auto=format&fit=crop', caption: 'Ancient Streets of the Old City', type: 'image' },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1614545391165-2769c92a146e?q=80&w=1964&auto=format&fit=crop', caption: 'Olive Groves in the Countryside', type: 'image' },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1599333632904-d56221f7a3f3?q=80&w=1935&auto=format&fit=crop', caption: 'Shepherds in the Judean Hills', type: 'image' },
];

const MediaGallery: React.FC<{ media: Media[] }> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // NEW: If media from the database is available and not empty, use it. Otherwise, use our placeholders.
  const mediaToDisplay = (media && media.length > 0) ? media : placeholderMedia;

  if (mediaToDisplay.length === 0) {
    return <Card><CardContent><p className="text-center text-muted-foreground py-10">No media available for this event.</p></CardContent></Card>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? mediaToDisplay.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === mediaToDisplay.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentMedia = mediaToDisplay[currentIndex];

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        {currentMedia.type === 'image' && (
          <Image src={currentMedia.url} alt={currentMedia.caption} className="object-cover" fill priority={currentIndex === 0} />
        )}
        {currentMedia.type === 'video' && (
          <div className="w-full h-full bg-black flex items-center justify-center text-white flex-col">
            <VideoIcon className="w-16 h-16 text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Video Placeholder</p>
          </div>
        )}
        
        {/* Your original navigation buttons and caption overlay */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"> <button onClick={goToPrevious} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all"> <ChevronLeftIcon className="h-6 w-6" /> </button> </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10"> <button onClick={goToNext} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all"> <ChevronRightIcon className="h-6 w-6" /> </button> </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10"> <p className="text-white text-sm">{currentMedia.caption}</p> </div>
      </div>
      <div className="flex justify-center p-2 bg-muted/50 space-x-2 overflow-x-auto">
        {mediaToDisplay.map((item, index) => (
            <button key={item.id} onClick={() => setCurrentIndex(index)} className={`relative w-16 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 ${index === currentIndex ? 'border-primary' : 'border-transparent'}`}>
                {item.type === 'image' && ( <Image src={item.url} alt={item.caption} className="object-cover" fill/> )}
                {item.type === 'video' && ( <div className="w-full h-full bg-black flex items-center justify-center"> <VideoIcon className="w-4 h-4 text-white" /> </div> )}
            </button>
        ))}
      </div>
    </Card>
  );
};

export default MediaGallery;