import React, { useState } from 'react';
import type { Media } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';

interface MediaGalleryProps {
  media: Media[];
}

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) {
    return <Card><CardContent><p className="text-center text-muted-foreground py-10">No media available for this event.</p></CardContent></Card>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentMedia = media[currentIndex];

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
        
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <button onClick={goToPrevious} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <button onClick={goToNext} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
            <p className="text-white text-sm">{currentMedia.caption}</p>
        </div>
      </div>
      <div className="flex justify-center p-2 bg-muted/50 space-x-2 overflow-x-auto">
        {media.map((item, index) => (
            <button key={item.id} onClick={() => setCurrentIndex(index)} className={`relative w-16 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 ${index === currentIndex ? 'border-primary' : 'border-transparent'}`}>
                {item.type === 'image' && (
                    <Image src={item.url} alt={item.caption} className="object-cover" fill/>
                )}
                {item.type === 'video' && (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                        <VideoIcon className="w-4 h-4 text-white" />
                    </div>
                )}
            </button>
        ))}
      </div>
    </Card>
  );
};

export default MediaGallery;