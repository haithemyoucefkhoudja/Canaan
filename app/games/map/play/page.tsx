// app/games/map/play/page.tsx
"use client";

import { gameLevels } from "@/lib/levels-data";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';

// This dynamically imports your map component and disables Server-Side Rendering (SSR)
const DynamicMap = dynamic(
  () => import('@/components/map-game/interactive-historical-game').then(mod => mod.InteractiveHistoricalMap),
  { 
    ssr: false, // This is the crucial part that fixes map rendering
    loading: () => <div className="w-full h-screen flex items-center justify-center bg-gray-200 text-2xl">Loading Game...</div>
  }
);

export default function PlayGamePage() {
  // We will play the first level from our data file.
  const level = gameLevels[0];

  if (!level) {
    notFound();
  }

  // We render the dynamic component and pass the level events to it.
  return (
    <DynamicMap
      events={level.events}
      gameMode={true} // This activates the game logic in your component
    />
  );
}