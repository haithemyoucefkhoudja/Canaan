// components/map-game/interactive-historical-game.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

import {
  Compass,
  Trophy,
  Clock,
  Star,
  RotateCcw,
  RefreshCw,
  XCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2, 
  MapPin,
} from "lucide-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";
// @ts-ignore
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";

// --- Type Definitions (No Changes Here) ---
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
  score?: number;
}
interface GameState {
  events: GameEvent[];
  totalScore: number;
}
interface InteractiveHistoricalMapProps {
  events: HistoricalEvent[];
  levelId: number;
  gameMode?: boolean;
}

export function InteractiveHistoricalMap({
  events: propEvents = [],
  levelId,
  gameMode = false,
}: InteractiveHistoricalMapProps) {
  // --- All State and Refs (No Changes Here) ---
  const [currentYear, setCurrentYear] = useState(1948);
  const [mapReady, setMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const maplibreMapRef = useRef<any>(null);
  const activeMarkerRef = useRef<L.Marker | null>(null);
  const [gameState, setGameState] = useState<GameState>({ events: [], totalScore: 0 });
  const [selectedEventForPlacement, setSelectedEventForPlacement] = useState<GameEvent | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const passingScore = (propEvents.length * 100) * 0.6;
  const completedEvents = gameState.events.filter(e => e.isPlaced).length;
  const totalEvents = gameState.events.length;
  const progressPercentage = totalEvents > 0 ? (completedEvents / totalEvents) * 100 : 0;

  // --- All useEffect and handler functions (No Changes to Logic) ---
  useEffect(() => {
    if (gameMode) {
      setGameState({ events: propEvents.map(e => ({ ...e, isPlaced: false })), totalScore: 0 });
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

  const handleEventSelectForPlacement = (event: GameEvent) => {
    if (event.isPlaced || activeMarkerRef.current || feedback) return;
    setSelectedEventForPlacement(event);
    if (mapRef.current) {
        const marker = L.marker(mapRef.current.getCenter(), {
            draggable: true,
            // --- Color Change: Marker color is now our primary teal ---
            icon: L.divIcon({ className: 'w-6 h-6 bg-teal-500 rounded-full border-2 border-white shadow-lg cursor-move' })
        }).addTo(mapRef.current);
        activeMarkerRef.current = marker;
    }
  };

  const handleEventPlacement = () => {
    if (!activeMarkerRef.current || !selectedEventForPlacement || gameStatus !== 'playing') return;
    const { lat, lng } = activeMarkerRef.current.getLatLng();
    const userCoords: [number, number] = [lat, lng];
    const event = selectedEventForPlacement;
    const R = 6371;
    const dLat = (event.actualCoordinates![0] - userCoords[0]) * Math.PI / 180;
    const dLon = (event.actualCoordinates![1] - userCoords[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(userCoords[0] * Math.PI / 180) * Math.cos(event.actualCoordinates![0] * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const yearDiff = Math.abs(event.actualYear! - currentYear);
    const isLocationCorrect = distance < 200;
    const isYearCorrect = yearDiff < 25;
    const isCorrect = isLocationCorrect && isYearCorrect;
    const score = isCorrect ? 100 : 0;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    activeMarkerRef.current.remove();
    activeMarkerRef.current = null;
    setTimeout(() => {
      setFeedback(null);
      const newGameState = {
        ...gameState,
        events: gameState.events.map(e => e.id === selectedEventForPlacement.id ? { ...e, isPlaced: true, score } : e),
        totalScore: gameState.totalScore + score
      };
      setGameState(newGameState);
      setSelectedEventForPlacement(null);
      const allEventsPlaced = newGameState.events.every(e => e.isPlaced);
      if (allEventsPlaced) {
        if (newGameState.totalScore >= passingScore) {
          setGameStatus('won');
        } else {
          setGameStatus('lost');
        }
      }
    }, 1500);
  };

  const resetGame = () => window.location.reload();

  return (
    // --- Color Change: Warmer page background ---
    <div className="relative space-y-6 p-4 sm:p-6 bg-stone-100 min-h-screen">

      <Card className="border-2 shadow-lg">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/games/map/${levelId > 101 ? levelId - 1 : ''}`} className={levelId <= 101 ? 'pointer-events-none' : ''}>
              <Button variant="outline" size="icon" disabled={levelId <= 101}><ArrowLeft/></Button>
            </Link>
            <div className="text-center">
              {/* Color Change */}
              <div className="text-sm text-stone-500">Level</div>
              <div className="text-2xl font-bold">{levelId}</div>
            </div>
            <Link href={`/games/map/${levelId + 1}`}>
              <Button variant="outline" size="icon"><ArrowRight/></Button>
            </Link>
          </div>
          
          <div className="flex-grow max-w-xs mx-4">
              <div className="flex justify-between mb-1">
                  {/* Color Change */}
                  <span className="text-base font-medium text-teal-800">Progress</span>
                  <span className="text-sm font-medium text-teal-800">{completedEvents} / {totalEvents}</span>
              </div>
              {/* Color Change */}
              <div className="w-full bg-stone-200 rounded-full h-2.5">
                  <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
              </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
                {/* Color Change */}
                <div className="text-sm text-stone-500">Score</div>
                <div className="text-2xl font-bold text-teal-800 flex items-center gap-2">
                    {/* Color Change */}
                    <Star className="w-6 h-6 text-amber-500"/>
                    {gameState.totalScore}
                </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative h-[500px] lg:h-[620px] m-2 rounded-xl overflow-hidden border-4 shadow-inner">
                    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} className="bg-muted">
                        {/* Color Change */}
                        {!mapReady && <div className="p-4 flex items-center justify-center h-full"><Compass className="animate-spin h-8 w-8 text-teal-700" /> <span className="ml-4 text-lg">Loading Map...</span></div>}
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card className="border-2 shadow-xl">
            <CardHeader className="pb-2">
                {/* Color Change */}
                <CardTitle className="text-xl flex items-center gap-2"><MapPin className="h-5 w-5 text-teal-700" />Events to Place</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[450px] overflow-y-auto p-4">
                {gameState.events.map((event) => {
                const isSelected = event.id === selectedEventForPlacement?.id;
                {/* Color Change: Updated feedback colors */}
                const feedbackClass = feedback && isSelected ? (feedback === 'correct' ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500') : '';
                
                if (event.isPlaced) {
                    return (
                    // --- Color Change: Softer, earthy green for success ---
                    <div key={event.id} className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-emerald-900">{event.name}</h4>
                            <p className="text-sm font-bold text-emerald-700">Score: {event.score}pts</p>
                        </div>
                    </div>
                    );
                }
                
                return (
                    <div
                    key={event.id}
                    onClick={() => handleEventSelectForPlacement(event)}
                    // --- Color Change: New hover, selection, and default colors ---
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out hover:border-teal-600 hover:shadow-md
                        ${isSelected ? 'border-amber-500 scale-105 shadow-xl bg-white' : 'border-gray-200 bg-stone-50'}
                        ${feedbackClass}`}
                    >
                    <h4 className="font-bold">{event.name}</h4>
                    {/* Color Change */}
                    <p className="text-sm text-stone-600 mt-1">{event.description}</p>
                    </div>
                );
                })}
            </CardContent>
            </Card>

            <Card className="border-2 shadow-xl sticky top-6">
                <CardHeader className="pb-2"><CardTitle className="text-xl flex items-center gap-2"><Clock className="h-5 w-5" />Temporal Navigator</CardTitle></CardHeader>
                <CardContent className="space-y-4 pt-2 text-center">
                    {/* Color Change */}
                    <p className="text-sm text-stone-500">Select a year</p>
                    {/* Color Change */}
                    <div className="bg-stone-100 p-2 rounded-lg border">
                        {/* Color Change */}
                        <div className="text-center font-bold text-5xl text-teal-800 tracking-wider">{currentYear}</div>
                    </div>
                    <Slider value={[currentYear]} onValueChange={(v) => setCurrentYear(v[0])} min={1917} max={2024} step={1} />
                    <Button 
                        onClick={handleEventPlacement} 
                        size="lg"
                        className="w-full mt-2 text-lg" 
                        disabled={!activeMarkerRef.current || gameStatus !== 'playing'}
                    >
                        <MapPin className="mr-2 h-5 w-5"/>
                        Confirm Placement
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] transition-opacity duration-300">
          <Card className="w-full max-w-md m-4 text-center border-2 shadow-2xl animate-in fade-in-0 zoom-in-95">
            <CardHeader>
              {gameStatus === 'won' ? (
                <>
                  {/* Color Change */}
                  <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
                  {/* Color Change */}
                  <CardTitle className="text-4xl font-black text-emerald-700 mt-4">Level Complete!</CardTitle>
                </>
              ) : (
                <>
                  {/* Color Change */}
                  <XCircle className="w-16 h-16 text-rose-600 mx-auto" />
                  {/* Color Change */}
                  <CardTitle className="text-4xl font-black text-rose-700 mt-4">Level Failed</CardTitle>
                </>
              )}
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              {/* Color Change */}
              <div className="text-lg text-stone-600">
                <p>Your final score is:</p>
                {/* Color Change */}
                <p className="text-5xl font-bold text-teal-800 my-2">{gameState.totalScore}</p>
                <p className="text-sm">(Passing score was {passingScore})</p>
              </div>
              {gameStatus === 'won' ? (
                <div className="flex w-full gap-4">
                  <Button onClick={resetGame} variant="outline" className="w-1/2"><RefreshCw className="mr-2 h-4 w-4" />Retry</Button>
                  <Link href={`/games/map/${levelId + 1}`} className="w-1/2"><Button className="w-full">Next Level<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                </div>
              ) : (
                <Button onClick={resetGame} size="lg" className="w-full"><RotateCcw className="mr-2 h-4 w-4" />Try Again</Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// --- Leaflet Icon Fix (No Changes Here) ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});