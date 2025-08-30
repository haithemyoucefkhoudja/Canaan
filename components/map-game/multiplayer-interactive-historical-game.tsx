// components/map-game/multiplayer-interactive-historical-game.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Compass, Trophy, Users, Clock, Star } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";
// @ts-ignore
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";


// --- Type Definitions (These should match src/types.ts on the backend) ---
interface PlayerState {
  id: string;
  score: number;
  hasAnswered: boolean;
}
interface GameEvent {
  id: string;
  name: string;
  description?: string;
}
interface GameState {
  gameId: string;
  gameType: 'map-game';
  players: PlayerState[];
  currentEventIndex: number;
  currentEvent?: GameEvent;
  roundStatus: "waiting" | "active" | "finished";
  roundTimer: number;
}
interface RoundResult {
  correctAnswer: { coordinates: [number, number]; year: number; };
  playerResults: Array<{
    id: string;
    scoreThisRound: number;
    answer?: { coordinates: [number, number]; year: number; };
  }>;
}
interface GameOver {
  finalScores: Array<{id: string; score: number}>;
}

interface ComponentProps {
    gameId: string;
    gameType: 'map-game';
}

// --- Component ---
export function MultiplayerInteractiveHistoricalMap({ gameId, gameType }: ComponentProps) {
  // All state is now driven by messages from the server
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [gameOver, setGameOver] = useState<GameOver | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null); // To identify ourselves

  // Local UI state (for user input before sending to server)
  const [currentYear, setCurrentYear] = useState(1800);
  const [mapReady, setMapReady] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Refs for WebSocket and map elements
  const ws = useRef<WebSocket | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const maplibreMapRef = useRef<any>(null);
  const answerMarkerRef = useRef<L.Marker | null>(null);
  const resultMarkersRef = useRef<L.LayerGroup | null>(null);

  // --- WebSocket Connection ---
  useEffect(() => {
    if (!gameId || !gameType) return;

    // Connect to the correct URL, including the gameType
    // IMPORTANT: In production, use wss://your-worker-url. For local dev, use ws://127.0.0.1:8787
    const wsUrl = `ws://127.0.0.1:8787/game/${gameType}/${gameId}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => console.log("WebSocket connected to", wsUrl);
    ws.current.onclose = () => console.log("WebSocket disconnected");

    // This is the core listener. It updates the UI based on server messages.
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      // On the very first message, we can find out our own player ID
      if (!playerId && message.type === "gameStateUpdate") {
          const players = message.payload.players as PlayerState[];
          if (players.length > 0) {
              setPlayerId(players[players.length - 1].id);
          }
      }

      // Handle the different types of messages from the server
      switch (message.type) {
        case "gameStateUpdate":
          setGameState(message.payload);
          setRoundResult(null); // Clear old results
          setGameOver(null);
          setHasSubmitted(false); // Reset submission status for new round
          if (resultMarkersRef.current) resultMarkersRef.current.clearLayers();
          // If the round is no longer active, remove the draggable answer marker
          if (answerMarkerRef.current && message.payload.roundStatus !== 'active') {
             mapRef.current?.removeLayer(answerMarkerRef.current);
             answerMarkerRef.current = null;
          }
          break;
        case "roundResult":
          setRoundResult(message.payload);
          if (answerMarkerRef.current) {
            mapRef.current?.removeLayer(answerMarkerRef.current);
            answerMarkerRef.current = null;
          }
          break;
        case "gameOver":
          setGameOver(message.payload);
          setGameState(null);
          setRoundResult(null);
          break;
      }
    };

    return () => {
      ws.current?.close(); // Clean up the connection when the component unmounts
    };
  }, [gameId, gameType, playerId]);


  // --- Map Setup and Event Handlers ---
  // Map initialization (remains the same)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 4);
    mapRef.current = map;
    resultMarkersRef.current = L.layerGroup().addTo(map);

    const gl = (L as any).maplibreGL({ style: "https://www.openhistoricalmap.org/map-styles/main/main.json" }).addTo(map);

    maplibreMapRef.current = gl.getMaplibreMap();
    maplibreMapRef.current.once("styledata", () => {
      filterByDate(maplibreMapRef.current, `${currentYear}-01-01`);
      setMapReady(true);
    });
  }, []);

  // Sync the map's year with the slider (remains the same)
  useEffect(() => {
    if (maplibreMapRef.current && mapReady) {
      filterByDate(maplibreMapRef.current, `${currentYear}-01-01`);
    }
  }, [currentYear, mapReady]);

  // Handle user clicks on the map to place/move their answer marker
  useEffect(() => {
    if (!mapRef.current) return;
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      // Only allow placing a marker if the round is active and we haven't submitted yet
      if (gameState?.roundStatus !== "active" || hasSubmitted) return;
      if (answerMarkerRef.current) {
        answerMarkerRef.current.setLatLng(e.latlng);
      } else {
        answerMarkerRef.current = L.marker(e.latlng, { draggable: true }).addTo(mapRef.current!);
      }
    };
    mapRef.current.on("click", handleMapClick);
    return () => { mapRef.current?.off("click", handleMapClick); };
  }, [gameState, hasSubmitted]);

  // Display markers for the round results
  useEffect(() => {
    if (!roundResult || !mapRef.current || !resultMarkersRef.current) return;
    resultMarkersRef.current.clearLayers();

    // Correct Answer Marker (e.g., green star)
    const correctIcon = L.divIcon({ className: "result-marker correct", html: `⭐` });
    L.marker(roundResult.correctAnswer.coordinates, { icon: correctIcon, zIndexOffset: 1000 }).addTo(resultMarkersRef.current);

    // Player Answer Markers
    roundResult.playerResults.forEach((p) => {
      if (!p.answer) return;
      const isSelf = p.id === playerId;
      const playerIcon = L.divIcon({
        className: `result-marker ${isSelf ? 'self' : 'other'}`,
        html: `📍 <span class="label">${p.id.substring(0,4)} (+${p.scoreThisRound})</span>`
      });
      L.marker(p.answer.coordinates, { icon: playerIcon }).addTo(resultMarkersRef.current!);
    });
  }, [roundResult, playerId]);

  // This function now sends the answer to the server instead of calculating score locally
  const handleSubmitAnswer = () => {
    if (!answerMarkerRef.current || ws.current?.readyState !== WebSocket.OPEN) return;
    const { lat, lng } = answerMarkerRef.current.getLatLng();
    ws.current.send(
      JSON.stringify({
        type: "submitAnswer",
        payload: { userCoordinates: [lat, lng], userYear: currentYear },
      })
    );
    setHasSubmitted(true); // Locally disable controls after submitting
  };

  // --- Render Logic ---
  if (gameOver) {
      return (
        <Card className="max-w-2xl mx-auto text-center p-8">
            <CardHeader>
                <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
                <CardTitle className="text-4xl font-bold">Game Over!</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="text-2xl font-semibold mb-4">Final Scores</h3>
                <ul className="space-y-3">
                    {gameOver.finalScores.sort((a, b) => b.score - a.score).map((player, index) => (
                        <li key={player.id} className="flex justify-between items-center p-3 bg-muted rounded-lg text-lg">
                            <span className="font-bold">{index + 1}. {player.id.substring(0, 8)}</span>
                            <span className="font-semibold">{player.score} pts</span>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => window.location.reload()} className="mt-8">Play Again</Button>
            </CardContent>
        </Card>
      );
  }

  return (
    <div className="space-y-8">
      {/* --- Top Status Bar --- */}
      <Card className="border-2 shadow-xl">
        <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl">
                <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                        <div className="text-2xl font-black">Historical Geography Game</div>
                        <div className="text-lg font-normal text-muted-foreground">
                            {!gameState ? "Connecting..." : gameState.roundStatus === "waiting" ? "Waiting for players..." : `Round ${(gameState.currentEventIndex ?? 0) + 1}`}
                        </div>
                    </div>
                </div>
                {gameState?.roundStatus === 'active' &&
                    <div className="text-right">
                        <div className="text-2xl font-bold">{gameState?.roundTimer}s</div>
                        <div className="text-sm text-muted-foreground">Time Remaining</div>
                    </div>
                }
            </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Map and Timeline --- */}
          <div className="lg:col-span-2 space-y-4">
              <Card className="border-2 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                      <div className="relative h-[500px]" ref={mapContainerRef}>
                          {!mapReady && <div className="text-center pt-20"><Compass className="h-8 w-8 mx-auto text-primary animate-spin" />Loading Map...</div>}
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
                  <CardContent>
                      <Slider value={[currentYear]} onValueChange={(v) => setCurrentYear(v[0])} min={1700} max={1900} step={1} disabled={hasSubmitted || gameState?.roundStatus !== 'active'}/>
                      <div className="font-bold text-center text-xl mt-2">{currentYear}</div>
                  </CardContent>
              </Card>
          </div>

          {/* --- Player and Event Info --- */}
          <div className="space-y-4">
              <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Users /> Players</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                      {gameState?.players.map(p => (
                          <div key={p.id} className={`flex justify-between p-2 rounded ${p.id === playerId ? 'bg-blue-100' : 'bg-muted'}`}>
                            <span>{p.id.substring(0,8)} {p.id === playerId && '(You)'}</span>
                            <Badge>{p.score} pts</Badge>
                            <span>{p.hasAnswered ? '✓ Ready' : '...'}</span>
                          </div>
                      ))}
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Star /> Current Event</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                      {gameState?.currentEvent ? (
                          <>
                              <h4 className="text-lg font-bold">{gameState.currentEvent.name}</h4>
                              <p className="text-muted-foreground">{gameState.currentEvent.description}</p>
                              {hasSubmitted ? (
                                  <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">Waiting for other players...</div>
                              ) : (
                                  <Button onClick={handleSubmitAnswer} className="w-full" disabled={!answerMarkerRef.current || gameState?.roundStatus !== 'active'}>Submit Answer</Button>
                              )}
                          </>
                      ) : (
                          <p className="text-muted-foreground text-center">{gameState?.roundStatus === "waiting" ? "Waiting for game to start..." : "Loading next event..."}</p>
                      )}
                  </CardContent>
              </Card>
              {roundResult && (
                  <Card className="border-2 border-blue-500">
                      <CardHeader><CardTitle className="text-xl text-blue-700">Round Results</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                          {roundResult.playerResults.map(p => (
                              <div key={p.id} className="flex justify-between">
                                  <span>{p.id.substring(0, 8)}</span>
                                  <span className="font-bold text-blue-600">+{p.scoreThisRound} pts</span>
                              </div>
                          ))}
                          <Progress value={((gameState?.roundTimer ?? 0) / 5) * 100} className="mt-4 h-2" />
                          <p className="text-xs text-center text-muted-foreground">Next round in {gameState?.roundTimer}s</p>
                      </CardContent>
                  </Card>
              )}
          </div>
      </div>
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