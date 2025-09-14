// app/games/map/[id]/page.tsx
"use client";

import { gameLevels } from "@/lib/levels-data";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Dynamically import BOTH of your game components to prevent SSR errors
const DynamicSinglePlayerMap = dynamic(
  () => import('@/components/map-game/interactive-historical-game').then(mod => mod.InteractiveHistoricalMap),
  { 
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center bg-gray-200 text-2xl">Loading Single Player Game...</div>
  }
);

const DynamicMultiplayerMap = dynamic(
  () => import('@/components/map-game/multiplayer-interactive-historical-game').then(mod => mod.MultiplayerInteractiveHistoricalMap),
  { 
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center bg-gray-800 text-white text-2xl">Connecting to Game Room...</div>
  }
);

export default function GamePage() {
  const params = useParams();
  const id = params.id as string;

  // --- Logic to decide which game mode to load ---
  const levelId = parseInt(id, 10);

  if (!isNaN(levelId)) {
    // --- This is a SINGLE PLAYER level (ID is a number) ---
    const level = gameLevels.find(l => l.id === levelId);
    if (!level) return notFound();
    return <DynamicSinglePlayerMap events={level.events} levelId={level.id} gameMode={true} />;
  } else {
    // --- This is a MULTIPLAYER game (ID is text, like "room123") ---
    const gameId = id;
    return <DynamicMultiplayerMap gameId={gameId} gameType="map-game" />;
  }
}