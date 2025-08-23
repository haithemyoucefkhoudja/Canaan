"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings,
  Compass,
  Trophy,
  Target,
  Star,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-leaflet";
import "@openhistoricalmap/maplibre-gl-dates";

interface HistoricalEvent {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  coordinates?: string;
  actualYear?: number;
  actualCoordinates?: [number, number];
  actorLinks?: Array<{
    role: string;
    actor: {
      name: string;
      actorType: string;
    };
  }>;
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
  isGameMode: boolean;
}

interface InteractiveHistoricalMapProps {
  events: HistoricalEvent[];
  selectedYear?: number;
  onYearChange?: (year: number) => void;
  className?: string;
  gameMode?: boolean;
}

export function InteractiveHistoricalMap({
  events: propEvents = [],
  selectedYear = 1800,
  onYearChange,
  className = "",
  gameMode = false,
}: InteractiveHistoricalMapProps) {
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showEventMarkers, setShowEventMarkers] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null
  );
  const [mapReady, setMapReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const maplibreMapRef = useRef<any>(null);
  const eventMarkersRef = useRef<L.Marker[]>([]);

  const [gameState, setGameState] = useState<GameState>({
    events: [],
    totalScore: 0,
    completedEvents: 0,
    isGameMode: gameMode,
  });

  const [showResults, setShowResults] = useState(false);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const gameEvents: GameEvent[] = [
    {
      id: "french-revolution",
      name: "French Revolution Begins",
      description:
        "The French Revolution started with the storming of the Bastille",
      actualYear: 1789,
      actualCoordinates: [48.8566, 2.3522], // Paris
      location: "Paris, France",
      isPlaced: false,
    },
    {
      id: "battle-waterloo",
      name: "Battle of Waterloo",
      description: "Napoleon's final defeat at the Battle of Waterloo",
      actualYear: 1815,
      actualCoordinates: [50.6799, 4.4116], // Waterloo, Belgium
      location: "Waterloo, Belgium",
      isPlaced: false,
    },
    {
      id: "congress-vienna",
      name: "Congress of Vienna",
      description: "European powers redraw the map of Europe after Napoleon",
      actualYear: 1815,
      actualCoordinates: [48.2082, 16.3738], // Vienna
      location: "Vienna, Austria",
      isPlaced: false,
    },
    {
      id: "industrial-revolution",
      name: "Industrial Revolution Peak",
      description: "The height of industrial development in Britain",
      actualYear: 1840,
      actualCoordinates: [53.4808, -2.2426], // Manchester
      location: "Manchester, England",
      isPlaced: false,
    },
    {
      id: "unification-italy",
      name: "Italian Unification",
      description: "The unification of Italy under the Kingdom of Sardinia",
      actualYear: 1861,
      actualCoordinates: [45.0703, 7.6869], // Turin
      location: "Turin, Italy",
      isPlaced: false,
    },
  ];

  useEffect(() => {
    if (gameMode) {
      setGameState((prev) => ({
        ...prev,
        events: [...gameEvents],
        isGameMode: true,
      }));
    }
  }, [gameMode]);

  const events: HistoricalEvent[] = gameMode ? gameState.events : propEvents;

  const getCurrentEvents = () => {
    if (gameMode) {
      return gameState.events.filter((event) => event.isPlaced);
    }
    return events.filter((event) => {
      if (!event.startDate) return false;
      const eventYear = new Date(event.startDate).getFullYear();
      return Math.abs(eventYear - currentYear) <= 5;
    });
  };

  const calculateScore = (
    event: GameEvent,
    userCoords: [number, number],
    userYear: number
  ): number => {
    if (!event.actualCoordinates || !event.actualYear) return 0;

    // Distance accuracy (max 50 points)
    const distance = Math.sqrt(
      Math.pow(event.actualCoordinates[0] - userCoords[0], 2) +
        Math.pow(event.actualCoordinates[1] - userCoords[1], 2)
    );
    const maxDistance = 10; // degrees
    const locationScore = Math.max(0, 50 - (distance / maxDistance) * 50);

    // Time accuracy (max 50 points)
    const yearDiff = Math.abs(event.actualYear - userYear);
    const maxYearDiff = 50; // years
    const timeScore = Math.max(0, 50 - (yearDiff / maxYearDiff) * 50);

    return Math.round(locationScore + timeScore);
  };

  const handleEventDragEnd = (
    eventId: string,
    draggedCoords: [number, number]
  ) => {
    const event = gameState.events.find((e) => e.id === eventId);
    if (!event) return;

    const score = calculateScore(event, draggedCoords, currentYear);

    setGameState((prev) => {
      const newEvents = prev.events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isPlaced: true,
              userCoordinates: draggedCoords,
              userYear: currentYear,
              score,
            }
          : e
      );

      const completedEvents = newEvents.filter((e) => e.isPlaced).length;

      return {
        ...prev,
        events: newEvents,
        totalScore: newEvents.reduce((total, ev) => total + (ev.score || 0), 0),
        completedEvents,
      };
    });

    if (
      gameState.events.filter((e) => e.isPlaced).length + 1 ===
      gameEvents.length
    ) {
      setTimeout(() => setShowResults(true), 1000);
    }
  };

  const handleEventSelect = (event: GameEvent) => {
    if (event.isPlaced || activeEvent) return;

    setActiveEvent(event);
    setTimer(30);

    const marker = L.marker(mapRef.current!.getCenter(), {
      icon: L.divIcon({
        className: "custom-event-marker",
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-8 h-8 bg-primary border-2 border-primary-foreground rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl">
              <div class="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      }),
      draggable: true,
    }).addTo(mapRef.current!);

    marker.on("dragend", (e) => {
      const { lat, lng } = e.target.getLatLng();
      handleEventDragEnd(event.id, [lat, lng]);
      mapRef.current?.removeLayer(marker);
      setActiveEvent(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    });

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          mapRef.current?.removeLayer(marker);
          setActiveEvent(null);
          // Handle timeout, maybe penalize the score
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentYear((prev) => {
          const next = prev + 1;
          if (next > 1900) {
            setIsPlaying(false);
            return 1900;
          }
          onYearChange?.(next);
          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, onYearChange]);

  useEffect(() => {
    if (activeEvent && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && activeEvent) {
      // Handle timeout
      setActiveEvent(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeEvent, timer]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 5); // Center on Europe
    mapRef.current = map;

    const gl = L.maplibreGL({
      style: "https://www.openhistoricalmap.org/map-styles/main/main.json",
      attributionControl:
        '<a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a>',
    } as any).addTo(map);

    const maplibreMap = gl.getMaplibreMap();
    maplibreMapRef.current = maplibreMap;
    console.log("[v0] OpenHistoricalMap initialized", maplibreMap);

    maplibreMap.once("styledata", () => {
      //@ts-ignore
      maplibreMap.filterByDate(`${currentYear}-01-01`);
      setMapReady(true);
      console.log("[v0] Map style loaded and date filtered to", currentYear);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [gameMode]);

  useEffect(() => {
    if (maplibreMapRef.current && mapReady) {
      maplibreMapRef.current.filterByDate(`${currentYear}-01-01`);
      console.log("[v0] Updated map to year:", currentYear);
    }
  }, [currentYear, mapReady]);

  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    eventMarkersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    eventMarkersRef.current = [];

    if (!showEventMarkers) return;

    const currentEvents = gameMode
      ? gameState.events.filter((event) => event.isPlaced)
      : getCurrentEvents();

    currentEvents.forEach((event) => {
      let position: [number, number] = [48.8566, 2.3522];

      if (gameMode && "userCoordinates" in event && event.userCoordinates) {
        //@ts-ignore
        position = event.userCoordinates;
      } else if (event.coordinates) {
        try {
          const coords = event.coordinates
            .split(",")
            .map((c) => Number.parseFloat(c.trim()));
          if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            position = [coords[0], coords[1]];
          }
        } catch (e) {
          console.log("[v0] Invalid coordinates for event:", event.name);
        }
      }

      const markerColor =
        gameMode && "score" in event
          ? //@ts-ignore
            event.score! > 70
            ? "bg-green-500"
            : //@ts-ignore
            event.score! > 40
            ? "bg-yellow-500"
            : "bg-red-500"
          : "bg-primary";

      const scrollIcon = L.divIcon({
        className: "custom-event-marker",
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-8 h-8 ${markerColor} border-2 border-primary-foreground rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl">
              <div class="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                <div class="w-2 h-2 ${markerColor} rounded-full"></div>
              </div>
            </div>
            ${
              gameMode && "score" in event
                ? `<div class="absolute -top-1 -right-1 w-5 h-5 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">${event.score}</div>`
                : '<div class="absolute -top-1 -right-1 w-3 h-3 bg-destructive border border-destructive-foreground rounded-full opacity-80"></div>'
            }
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      const marker = L.marker(position, {
        icon: scrollIcon,
        draggable: gameMode && !(event as GameEvent).isPlaced,
      })
        .bindPopup(
          `
          <div class="max-w-xs p-4 bg-card border-2 border-border rounded-lg shadow-xl">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L13 8H17L12 12L14 18L10 15L6 18L8 12L3 8H7L10 2Z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-card-foreground mb-2 text-lg leading-tight">${
                  event.name
                }</h4>
                ${
                  event.description
                    ? `<p class="text-muted-foreground text-sm mb-3 leading-relaxed">${event.description}</p>`
                    : ""
                }
                <div class="flex items-center gap-2">
                  ${
                    gameMode && "userYear" in event
                      ? `<span class="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">Your guess: ${event.userYear}</span>`
                      : ""
                  }
                  ${
                    gameMode && "actualYear" in event
                      ? `<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">Actual: ${event.actualYear}</span>`
                      : ""
                  }
                  ${
                    gameMode && "score" in event
                      ? `<span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">Score: ${event.score}</span>`
                      : ""
                  }
                  ${
                    !gameMode && event.startDate
                      ? `<span class="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">${new Date(
                          event.startDate
                        ).getFullYear()}</span>`
                      : ""
                  }
                  ${
                    event.location
                      ? `<span class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">${event.location}</span>`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `,
          {
            className: "custom-popup",
            closeButton: false,
            offset: [0, -10],
          }
        )
        .addTo(mapRef.current!);

      if (gameMode && !(event as GameEvent).isPlaced) {
        marker.on("dragend", (e) => {
          const { lat, lng } = e.target.getLatLng();
          handleEventDragEnd(event.id, [lat, lng]);
        });
      }

      marker.on("click", () => {
        setSelectedEvent(event);
      });
    });
  }, [events, currentYear, showEventMarkers, mapReady, gameState]);

  const handleYearChange = (value: number[]) => {
    const year = value[0];
    setCurrentYear(year);
    onYearChange?.(year);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimeline = () => {
    setIsPlaying(false);
    setCurrentYear(1700);
    onYearChange?.(1700);
  };

  const jumpToPeriod = (year: number) => {
    setIsPlaying(false);
    setCurrentYear(year);
    onYearChange?.(year);
  };

  const currentEvents = getCurrentEvents();

  const resetGame = () => {
    setGameState({
      events: [...gameEvents],
      totalScore: 0,
      completedEvents: 0,
      isGameMode: true,
    });
    setShowResults(false);
    setCurrentYear(1800);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <Card className="border-2 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {gameMode ? (
                  <Trophy className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Compass className="h-5 w-5 text-primary-foreground" />
                )}
              </div>
              <div>
                <div className="text-2xl font-black">
                  {gameMode ? "Historical Geography Game" : "Historical Atlas"}
                </div>
                <div className="text-lg font-normal text-muted-foreground">
                  {gameMode
                    ? `Score: ${gameState.totalScore} • Events: ${gameState.completedEvents}/${gameEvents.length}`
                    : `Year ${currentYear} • Ancient Territories`}
                </div>
              </div>
            </div>
            {gameMode && (
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Game
              </Button>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-2 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute top-4 right-4 z-[999] w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl">
                {activeEvent ? (
                  <div className="text-primary-foreground text-2xl font-bold">
                    {timer}
                  </div>
                ) : (
                  <svg
                    className="w-8 h-8 text-primary-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.5 8.5L22 12L15.5 15.5L12 22L8.5 15.5L2 12L8.5 8.5L12 2Z" />
                  </svg>
                )}
              </div>

              <div className="relative h-[500px] m-4 rounded-xl overflow-hidden border-4 shadow-inner">
                <div
                  ref={mapContainerRef}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  className={
                    mapReady
                      ? "relative z-0"
                      : "flex items-center justify-center bg-muted"
                  }
                >
                  {!mapReady && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                        <Compass className="h-8 w-8 text-primary-foreground animate-spin" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-xl font-bold">
                          Preparing Ancient Maps...
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Loading historical territories and boundaries
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                {gameMode ? (
                  <Star className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Users className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              {gameMode
                ? "Events to Place"
                : selectedEvent
                ? selectedEvent.name
                : "Historical Chronicles"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameMode ? (
              <div className="space-y-4">
                {showResults ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary text-primary-foreground rounded-lg">
                      <Trophy className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">Game Complete!</div>
                      <div className="text-lg">
                        Final Score: {gameState.totalScore}/500
                      </div>
                      <div className="text-sm mt-2">
                        Grade:{" "}
                        {gameState.totalScore > 400
                          ? "A"
                          : gameState.totalScore > 300
                          ? "B"
                          : gameState.totalScore > 200
                          ? "C"
                          : "D"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {gameState.events.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 bg-muted rounded-lg border"
                        >
                          <div className="font-semibold">{event.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Score: {event.score}/100
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground mb-4">
                      Drag events onto the map and use the timeline to guess
                      when they happened!
                    </div>
                    {gameState.events.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 bg-muted rounded-lg border hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg ${
                          event.isPlaced
                            ? "cursor-default bg-green-50 border-green-200"
                            : "cursor-pointer"
                        }`}
                        onClick={() => handleEventSelect(event)}
                      >
                        <h5 className="font-bold mb-2">{event.name}</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <Badge variant="outline">
                          {event.isPlaced ? "Placed" : "Drag me to the map"}
                        </Badge>
                      </div>
                    ))}

                    {gameState.events.filter((e) => e.isPlaced).length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          Completed Events
                        </h4>
                        {gameState.events
                          .filter((e) => e.isPlaced)
                          .map((event) => (
                            <div
                              key={event.id}
                              className="p-3 bg-green-50 border border-green-200 rounded-lg mb-2"
                            >
                              <div className="font-semibold">{event.name}</div>
                              <div className="text-sm text-green-600">
                                Score: {event.score}/100
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {selectedEvent ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        {selectedEvent.startDate
                          ? new Date(selectedEvent.startDate).getFullYear()
                          : "Unknown"}
                        {selectedEvent.endDate &&
                          ` - ${new Date(selectedEvent.endDate).getFullYear()}`}
                      </span>
                    </div>

                    {selectedEvent.description && (
                      <div className="p-4 bg-muted rounded-lg border-2">
                        <p className="text-sm leading-relaxed">
                          {selectedEvent.description}
                        </p>
                      </div>
                    )}

                    {selectedEvent.location && (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">
                          {selectedEvent.location}
                        </span>
                      </div>
                    )}

                    {selectedEvent.actorLinks &&
                      selectedEvent.actorLinks.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-bold flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Key Historical Figures
                          </h4>
                          <div className="space-y-2">
                            {selectedEvent.actorLinks.map((link, index) => (
                              <div
                                key={index}
                                className="p-3 bg-muted rounded-lg border"
                              >
                                <div className="font-semibold">
                                  {link.actor.name}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                  {link.role}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEvent(null)}
                      className="w-full"
                    >
                      Close Chronicle
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">
                        Year: {currentYear}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Active Chronicles ({currentEvents.length})
                      </h4>

                      {currentEvents.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {currentEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-4 bg-muted rounded-lg border cursor-pointer hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <h5 className="font-bold mb-2">{event.name}</h5>
                              {event.startDate && (
                                <Badge className="bg-primary text-primary-foreground">
                                  {new Date(event.startDate).getFullYear()}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 text-center bg-muted rounded-lg border-2">
                          <div className="w-12 h-12 bg-muted-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="h-6 w-6 text-background" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            No events recorded for this era.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xl font-black">Temporal Navigator</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {gameMode
                    ? "Guess when events happened!"
                    : "Journey Through History"}
                </div>
              </div>
            </div>
            {!gameMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEventMarkers(!showEventMarkers)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Settings className="h-4 w-4 mr-2" />
                {showEventMarkers ? "Hide" : "Show"} Chronicles
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!gameMode && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={resetTimeline}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset Era
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearChange([currentYear - 10])}
                >
                  <SkipBack className="h-3 w-3 mr-1" />
                  -10y
                </Button>
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  size="sm"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3 mr-1" />
                      Pause Journey
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Begin Journey
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearChange([currentYear + 10])}
                >
                  <SkipForward className="h-3 w-3 mr-1" />
                  +10y
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Temporal Speed:</span>
                {[0.5, 1, 2, 4].map((speed) => (
                  <Button
                    key={speed}
                    variant={playbackSpeed === speed ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(speed)}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Year: {currentYear}</span>
              {!gameMode && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => jumpToPeriod(1789)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Revolution Era
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => jumpToPeriod(1815)}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Napoleonic Era
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => jumpToPeriod(1848)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Spring of Nations
                  </Button>
                </div>
              )}
            </div>

            <div className="relative p-4 bg-muted rounded-xl border-2">
              <Slider
                value={[currentYear]}
                onValueChange={handleYearChange}
                min={1700}
                max={1900}
                step={1}
                className="w-full"
              />

              {showEventMarkers && !gameMode && (
                <div className="absolute top-4 left-4 right-4 h-full pointer-events-none">
                  {events
                    .filter((e) => e.startDate)
                    .map((event) => {
                      const eventYear = new Date(
                        event.startDate!
                      ).getFullYear();
                      if (eventYear < 1700 || eventYear > 1900) return null;
                      const position =
                        ((eventYear - 1700) / (1900 - 1700)) * 100;
                      return (
                        <div
                          key={event.id}
                          className="absolute top-0 transform -translate-x-1/2"
                          style={{ left: `${position}%` }}
                        >
                          <div className="w-2 h-8 bg-destructive rounded-full shadow-lg" />
                          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card border-2 rounded-lg px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity shadow-xl">
                            <div className="font-bold">{event.name}</div>
                            <div className="text-muted-foreground">
                              ({eventYear})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className="flex justify-between text-sm font-semibold text-muted-foreground relative">
              <span>1700</span>
              <span className="absolute left-1/4 transform -translate-x-1/2">
                1750
              </span>
              <span>1800</span>
              <span className="absolute left-3/4 transform -translate-x-1/2">
                1850
              </span>
              <span>1900</span>
            </div>
          </div>

          <div className="text-center p-4 bg-muted rounded-xl border-2 shadow-inner">
            <p className="text-sm leading-relaxed">
              <span className="font-bold">
                🗺️{" "}
                {gameMode
                  ? "Historical Geography Game"
                  : "Ancient Atlas Explorer"}
                :
              </span>
              {gameMode
                ? " Click on events to select them, then click on the map to place them. Use the timeline to guess when they happened!"
                : " Navigate through history using authentic period maps. Event markers reveal actual events from your chronicles. Use the temporal navigator to witness how territories evolved across centuries."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
