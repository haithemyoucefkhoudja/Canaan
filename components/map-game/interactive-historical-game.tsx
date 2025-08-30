// components/map-game/interactive-historical-game.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Link from 'next/link';

import {
  Trophy,
  Star,
  Clock,
  RotateCcw
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";
// @ts-ignore
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
// import Confetti from 'react-confetti';


// --- Type Definitions ---
interface HistoricalEvent {
  id: string;
  name: string;
  description?: string;
  actualYear?: number;
  actualCoordinates?: [number, number];
  location?: string;
  startDate?: string;
  endDate?: string;
  actorLinks?: any[];
}

interface GameEvent extends HistoricalEvent {
  isPlaced?: boolean;
  userCoordinates?: [number, number];
  userYear?: number;
  score?: number;
}

interface GameState {
  events: GameEvent[];
  totalScore: number;
  completedEvents: number;
}

interface InteractiveHistoricalMapProps {
  events: HistoricalEvent[];
  selectedYear?: number;
  gameMode?: boolean;
}


export function InteractiveHistoricalMap({
  events: propEvents = [],
  selectedYear = 1948,
  gameMode = false,
}: InteractiveHistoricalMapProps) {
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [mapReady, setMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const maplibreMapRef = useRef<any>(null);
  const eventMarkersRef = useRef<L.Marker[]>([]);
  
  const [gameState, setGameState] = useState<GameState>({
    events: [],
    totalScore: 0,
    completedEvents: 0,
  });
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    if (gameMode) {
      const initialEvents = propEvents.map(e => ({ ...e, isPlaced: false }));
      setGameState({
        events: initialEvents,
        totalScore: 0,
        completedEvents: 0,
      });
      setActiveEvent(initialEvents[0]);
    }
  }, [gameMode, propEvents]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current).setView([31.9522, 35.2332], 7);
    mapRef.current = map;
    const gl = (L as any).maplibreGL({ style: "https://www.openhistoricalmap.org/map-styles/main/main.json" }).addTo(map);
    maplibreMapRef.current = gl.getMaplibreMap();
    maplibreMapRef.current.once("styledata", () => {
      filterByDate(maplibreMapRef.current, `${currentYear}-01-01`);
      setMapReady(true);
    });
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (maplibreMapRef.current && mapReady) {
      filterByDate(maplibreMapRef.current, `${currentYear}-01-01`);
    }
  }, [currentYear, mapReady]);

  const calculateScore = (event: GameEvent, userCoords: [number, number], userYear: number): number => {
    if (!event.actualCoordinates || !event.actualYear) return 0;
    const R = 6371;
    const dLat = (event.actualCoordinates[0] - userCoords[0]) * Math.PI / 180;
    const dLon = (event.actualCoordinates[1] - userCoords[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(userCoords[0] * Math.PI / 180) * Math.cos(event.actualCoordinates[0] * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const maxDistance = 1000;
    const locationScore = Math.max(0, 50 - (distance / maxDistance) * 50);
    const yearDiff = Math.abs(event.actualYear - userYear);
    const maxYearDiff = 50;
    const timeScore = Math.max(0, 50 - (yearDiff / maxYearDiff) * 50);
    return Math.round(locationScore + timeScore);
  };

  const handleEventDragEnd = (eventId: string, draggedCoords: [number, number]) => {
    if (gameStatus !== 'playing') return;
    const eventToScore = gameState.events.find((e) => e.id === eventId);
    if (!eventToScore) return;

    const score = calculateScore(eventToScore, draggedCoords, currentYear);
    const isCorrect = score > 65;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    setTimeout(() => {
        setFeedback(null);
        const currentEventIndex = gameState.events.findIndex(e => e.id === eventId);
        
        setGameState((prev) => ({
            ...prev,
            events: prev.events.map((e) => e.id === eventId ? { ...e, isPlaced: true, userCoordinates: draggedCoords, userYear: currentYear, score } : e),
            totalScore: prev.totalScore + score,
            completedEvents: prev.completedEvents + 1,
        }));
        
        if (currentEventIndex >= gameState.events.length - 1) {
            setGameStatus('won');
        } else {
            setActiveEvent(gameState.events[currentEventIndex + 1]);
        }
    }, 1500);
  };

  // --- NEW Draggable Marker Logic ---
  useEffect(() => {
    if (!mapRef.current || !mapReady || gameStatus !== 'playing') return;

    // Clear any existing markers (both result and draggable)
    eventMarkersRef.current.forEach((marker) => marker.remove());
    eventMarkersRef.current = [];

    // If there's an active event, create a new draggable marker for it
    if (activeEvent && !activeEvent.isPlaced) {
        const marker = L.marker(mapRef.current.getCenter(), {
            draggable: true,
            icon: L.divIcon({
                className: 'bg-blue-500 text-white p-2 rounded-lg shadow-lg font-bold text-center border-2 border-white animate-pulse',
                html: `<span>${activeEvent.name}</span>`
            })
        }).addTo(mapRef.current);
        
        marker.on('dragend', () => {
            const { lat, lng } = marker.getLatLng();
            handleEventDragEnd(activeEvent.id, [lat, lng]);
            marker.remove(); // Remove the marker after it's been dropped
        });

        eventMarkersRef.current = [marker];
    }

    // Also, re-draw markers for already PLACED events
    gameState.events.forEach(event => {
        if (!event.isPlaced || !event.userCoordinates) return;
        const score = event.score || 0;
        const markerColor = score > 65 ? "bg-green-500" : score > 40 ? "bg-yellow-500" : "bg-red-500";
        const icon = L.divIcon({
            html: `<div class="relative"><div class="w-8 h-8 ${markerColor} rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold">${score}</div></div>`,
            className: ''
        });
        const resultMarker = L.marker(event.userCoordinates, { icon }).addTo(mapRef.current!);
        // We don't need to track these in the ref as they are static
    });

  }, [activeEvent, mapReady, gameStatus, gameState.events]);


  const resetGame = () => window.location.reload();

  if (!gameMode) {
      return <div>Explorer mode not implemented yet.</div>
  }
  
  return (
    <div className={`relative space-y-8 p-8`}>
      <Card className="border-2 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-black">Historical Geography Game</div>
                <div className="text-lg font-normal text-muted-foreground">
                    Score: {gameState.totalScore} • Event: {gameState.completedEvents + 1}/{gameState.events.length}
                </div>
              </div>
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Game
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-2 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="relative h-[500px] m-4 rounded-xl overflow-hidden border-4 shadow-inner">
                {/* Add a class to the map container for the cursor style */}
                <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} className={`game-map-container ${mapReady ? "relative z-0" : "flex items-center justify-center bg-muted"}`}>
                  {!mapReady && <div>Loading Map...</div>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="h-4 w-4" />
              Current Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeEvent ? (
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-md">
                    <h5 className="font-bold mb-2">{activeEvent.name}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{activeEvent.description}</p>
                    <Badge> Drag the marker on the map!</Badge>
                </div>
            ) : (
                <div className="p-4 text-center">
                    <p>Loading next event...</p>
                </div>
            )}
            
            <div className="mt-4">
              <h4 className="font-bold mb-2">Timeline</h4>
              <Slider value={[currentYear]} onValueChange={(v) => setCurrentYear(v[0])} min={1917} max={2024} step={1} />
              <div className="text-center font-bold text-2xl mt-4">{currentYear}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Feedback & Win/Loss Modals --- */}
      {feedback && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-8 rounded-lg shadow-2xl text-white text-4xl font-bold"
              style={{ backgroundColor: feedback === 'correct' ? '#22c55e' : '#ef4444' }}>
              {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
          </div>
      )}

      {gameStatus === 'won' && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          {/* <Confetti /> */}
          <div className="p-8 bg-white rounded-lg shadow-xl text-center">
            <Trophy size={48} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-500 mb-4">Level Complete!</h2>
            <p className="text-lg mb-6">Final Score: {gameState.totalScore}</p>
            <Link href={`/games/map`}>
              <Button className="px-8 py-4">Back to Main Menu</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});