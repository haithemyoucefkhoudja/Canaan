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
import "@openhistoricalmap/maplibre-gl-dates";

// --- Type Definitions ---
interface PlayerState {
	id: string;
	score: number;
}

interface GameEvent {
	id: string;
	name: string;
	description?: string;
}

interface GameState {
	gameId: string;
	players: PlayerState[];
	currentEventIndex: number;
	currentEvent?: GameEvent;
	roundStatus: "waiting" | "active" | "finished";
	roundTimer: number;
}

interface RoundResult {
	correctAnswer: {
		coordinates: [number, number];
		year: number;
	};
	playerResults: Array<{
		id: string;
		scoreThisRound: number;
		answer?: {
			coordinates: [number, number];
			year: number;
		};
	}>;
}

interface GameOver {
	finalScores: PlayerState[];
}

export function MultiplayerInteractiveHistoricalMap({
	gameId,
}: {
	gameId: string;
}) {
	// Server-driven state
	const [gameState, setGameState] = useState<GameState | null>(null);
	const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
	const [gameOver, setGameOver] = useState<GameOver | null>(null);

	// Local UI state
	const [currentYear, setCurrentYear] = useState(1800);
	const [mapReady, setMapReady] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState(false);

	// Refs
	const ws = useRef<WebSocket | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<L.Map | null>(null);
	const maplibreMapRef = useRef<any>(null);
	const answerMarkerRef = useRef<L.Marker | null>(null);
	const resultMarkersRef = useRef<L.LayerGroup | null>(null);

	// --- WebSocket Connection ---
	useEffect(() => {
		if (!gameId) return;

		const wsUrl = `ws://127.0.0.1:8787/game/${gameId}`;

		ws.current = new WebSocket(wsUrl);

		ws.current.onopen = () => console.log("WebSocket connected");
		ws.current.onclose = () => console.log("WebSocket disconnected");

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case "gameStateUpdate":
					setGameState(message.payload);
					setRoundResult(null);
					setGameOver(null);
					setHasSubmitted(false);
					if (resultMarkersRef.current) {
						resultMarkersRef.current.clearLayers();
					}
					break;
				case "roundResult":
					setRoundResult(message.payload);
					setHasSubmitted(false);
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
			ws.current?.close();
		};
	}, [gameId]);

	// --- Map Initialization ---
	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		const map = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 4);
		mapRef.current = map;
		resultMarkersRef.current = L.layerGroup().addTo(map);

		const gl = (L as any)
			.maplibreGL({
				style: "https://www.openhistoricalmap.org/map-styles/main/main.json",
				attributionControl:
					'<a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a>',
			})
			.addTo(map);

		const maplibreMap = gl.getMaplibreMap();
		maplibreMapRef.current = maplibreMap;

		maplibreMap.once("styledata", () => {
			maplibreMap.filterByDate(`${currentYear}-01-01`);
			setMapReady(true);
		});

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	// --- Map Click Handler ---
	useEffect(() => {
		if (!mapRef.current) return;

		const handleMapClick = (e: L.LeafletMouseEvent) => {
			if (gameState?.roundStatus !== "active" || hasSubmitted) return;

			if (answerMarkerRef.current) {
				answerMarkerRef.current.setLatLng(e.latlng);
			} else {
				answerMarkerRef.current = L.marker(e.latlng, { draggable: true }).addTo(
					mapRef.current!
				);
			}
		};

		mapRef.current.on("click", handleMapClick);

		return () => {
			mapRef.current?.off("click", handleMapClick);
		};
	}, [gameState, hasSubmitted]);

	// --- Year Sync ---
	useEffect(() => {
		if (maplibreMapRef.current && mapReady) {
			maplibreMapRef.current.filterByDate(`${currentYear}-01-01`);
		}
	}, [currentYear, mapReady]);

	// --- Round Result Markers ---
	useEffect(() => {
		if (!roundResult || !mapRef.current || !resultMarkersRef.current) return;

		resultMarkersRef.current.clearLayers();

		const correctIcon = L.divIcon({ className: "..." });
		L.marker(roundResult.correctAnswer.coordinates, {
			icon: correctIcon,
		}).addTo(resultMarkersRef.current);

		roundResult.playerResults.forEach((p) => {
			if (!p.answer) return;
			const playerIcon = L.divIcon({ className: "..." });
			L.marker(p.answer.coordinates, { icon: playerIcon }).addTo(
				resultMarkersRef.current!
			);
		});
	}, [roundResult]);

	const handleSubmitAnswer = () => {
		if (!answerMarkerRef.current || ws.current?.readyState !== WebSocket.OPEN)
			return;

		const { lat, lng } = answerMarkerRef.current.getLatLng();
		ws.current.send(
			JSON.stringify({
				type: "submitAnswer",
				payload: {
					userCoordinates: [lat, lng],
					userYear: currentYear,
				},
			})
		);
		setHasSubmitted(true);
	};

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
						{gameOver.finalScores
							.sort((a, b) => b.score - a.score)
							.map((player, index) => (
								<li
									key={player.id}
									className="flex justify-between items-center p-3 bg-muted rounded-lg text-lg"
								>
									<span className="font-bold">
										{index + 1}. {player.id.substring(0, 8)}
									</span>
									<span className="font-semibold">{player.score} pts</span>
								</li>
							))}
					</ul>
					<Button onClick={() => window.location.reload()} className="mt-8">
						Play Again
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-8">
			<Card className="border-2 shadow-xl">
				<CardHeader>
					<CardTitle className="flex items-center justify-between text-2xl">
						<div className="flex items-center gap-3">
							<Trophy className="h-8 w-8 text-primary" />
							<div>
								<div className="text-2xl font-black">
									Historical Geography Game
								</div>
								<div className="text-lg font-normal text-muted-foreground">
									{!gameState
										? "Connecting..."
										: gameState.roundStatus === "waiting"
										? "Waiting for players..."
										: `Round ${(gameState.currentEventIndex ?? 0) + 1}`}
								</div>
							</div>
						</div>
						<div className="text-right">
							<div className="text-2xl font-bold">{gameState?.roundTimer}s</div>
							<div className="text-sm text-muted-foreground">
								Time Remaining
							</div>
						</div>
					</CardTitle>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-4">
					<Card className="border-2 shadow-2xl overflow-hidden">
						<CardContent className="p-0">
							<div className="relative h-[500px]">
								<div
									ref={mapContainerRef}
									style={{ height: "100%", width: "100%" }}
									className={
										!mapReady ? "flex items-center justify-center bg-muted" : ""
									}
								>
									{!mapReady && (
										<div className="text-center space-y-4">
											<Compass className="h-8 w-8 mx-auto text-primary animate-spin" />
											<div className="text-xl font-bold">Loading Map...</div>
										</div>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-3">
								<Clock className="h-5 w-5 text-primary" />
								Temporal Navigator
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Slider
								value={[currentYear]}
								onValueChange={(value) => setCurrentYear(value[0])}
								min={1700}
								max={1900}
								step={1}
								disabled={gameState?.roundStatus !== "active" || hasSubmitted}
							/>
							<div className="flex justify-between text-sm mt-2">
								<span>1700</span>
								<span className="font-bold text-lg">{currentYear}</span>
								<span>1900</span>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4">
					<Card className="border-2 shadow-xl">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Users className="h-5 w-5 text-primary" />
								Players
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{gameState?.players.map((p) => (
								<div
									key={p.id}
									className="flex justify-between items-center p-2 bg-muted rounded"
								>
									<span className="font-semibold">{p.id.substring(0, 8)}</span>
									<Badge variant="secondary">{p.score} pts</Badge>
								</div>
							)) ?? <p>Waiting for players...</p>}
						</CardContent>
					</Card>
					<Card className="border-2 shadow-xl">
						<CardHeader>
							<CardTitle className="text-xl flex items-center gap-2">
								<Star className="h-5 w-5 text-primary" />
								Current Event
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{gameState?.currentEvent ? (
								<>
									<h4 className="text-lg font-bold">
										{gameState.currentEvent.name}
									</h4>
									<p className="text-muted-foreground">
										{gameState.currentEvent.description}
									</p>
									{hasSubmitted ? (
										<div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">
											Waiting for other players...
										</div>
									) : (
										<Button
											onClick={handleSubmitAnswer}
											className="w-full"
											disabled={
												!answerMarkerRef.current ||
												gameState?.roundStatus !== "active"
											}
										>
											Submit Answer
										</Button>
									)}
								</>
							) : (
								<p className="text-muted-foreground">
									{gameState?.roundStatus === "waiting"
										? "Waiting for game to start..."
										: "Loading event..."}
								</p>
							)}
						</CardContent>
					</Card>
					{roundResult && (
						<Card className="border-2 border-blue-500 shadow-xl">
							<CardHeader>
								<CardTitle className="text-xl text-blue-700">
									Round Results
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{roundResult.playerResults.map((p) => (
									<div key={p.id} className="flex justify-between">
										<span>{p.id.substring(0, 8)}</span>
										<span className="font-bold text-blue-600">
											+{p.scoreThisRound} pts
										</span>
									</div>
								))}
								<Progress
									value={((gameState?.roundTimer ?? 0) / 5) * 100}
									className="mt-4 h-2"
								/>
								<p className="text-xs text-center text-muted-foreground">
									Next round in {gameState?.roundTimer}s
								</p>
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
	iconRetinaUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
