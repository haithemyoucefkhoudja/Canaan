// src/durable-object.ts

import { GameState, Player, GameAnswer, GameEvent, MapGameAnswer, MapGameEvent } from './types'; // <-- IMPORT our new types

export interface Env {
    GAME_ROOM: DurableObjectNamespace;
}

export class GameRoom {
    state: DurableObjectState;
    players: Player[] = [];
    gameState!: GameState;
    roundInterval?: number;

    constructor(state: DurableObjectState, env: Env) {
        this.state = state;
        // This part remains the same
        this.state.blockConcurrencyWhile(async () => {
            const storedState = await this.state.storage.get<GameState>("gameState");
            this.gameState = storedState || this.initializeGameState();
        });
    }

    // UPDATED: Now initializes with a gameType
    initializeGameState(): GameState {
        return {
            gameId: '',
            gameType: 'map-game', // <-- NEW: Default game type
            players: [],
            events: this.loadMapGameEvents(), // <-- UPDATED: Loads specific game events
            currentEventIndex: -1,
            roundStatus: 'waiting',
            roundTimer: 0,
        };
    }

    async fetch(request: Request) {
        const upgradeHeader = request.headers.get('Upgrade');
        if (!upgradeHeader || upgradeHeader !== 'websocket') {
            return new Response('Expected Upgrade: websocket', { status: 426 });
        }

        const url = new URL(request.url);
        // NEW: We can get the game type from the URL, e.g., /game/map-game/123
        const pathParts = url.pathname.split('/');
        const gameType = pathParts[2];
        const gameId = pathParts[3];

        if (gameType === 'map-game') {
            this.gameState.gameType = 'map-game';
            this.gameState.events = this.loadMapGameEvents();
        } else {
            // In the future, you could load other game types
            // this.gameState.gameType = 'quiz-game';
            // this.gameState.events = this.loadQuizGameEvents();
            return new Response('Unknown Game Type', { status: 400 });
        }
        this.gameState.gameId = gameId;


        const webSocketPair = new WebSocketPair();
        const { 0: client, 1: server } = webSocketPair;

        server.accept();

        const playerId = request.headers.get('Sec-WebSocket-Key') || `player-${Math.random().toString(36).substr(2, 9)}`;
        this.handleSession(server, playerId);

        return new Response(null, {
            status: 101,
            webSocket: client,
        });
    }

    // UPDATED: Now handles different answer types
    async handleMessage(player: Player, message: any) {
        if (message.type === 'submitAnswer') {
            // Create a typed answer based on the game type
            if (this.gameState.gameType === 'map-game') {
                const answer: MapGameAnswer = {
                    type: 'map-game',
                    coordinates: message.payload.userCoordinates,
                    year: message.payload.userYear,
                    answeredAt: Date.now(), // <-- NEW: Store timestamp for speed bonus
                };
                player.currentAnswer = answer;
            }
            // In the future, you would add an else if for 'quiz-game' here

            const allPlayersAnswered = this.players.every(p => p.currentAnswer);
            if (allPlayersAnswered) {
                if(this.roundInterval) clearInterval(this.roundInterval);
                this.endRound();
            } else {
                this.broadcastGameState();
            }
        }
    }

    // ... handleSession and handleWebSocketClose remain mostly the same ...
    // NOTE: Make sure the existing handleSession and handleWebSocketClose functions are here.

    endRound() {
        if (this.roundInterval) clearInterval(this.roundInterval);
        this.gameState.roundStatus = 'finished';

        // --- NEW: Conditional Logic ---
        // The core of the new architecture. We check the game type.
        if (this.gameState.gameType === 'map-game') {
            const playerResults = this.calculateMapGameScores(); // <-- NEW: Call the specific scoring function

            const currentEvent = this.gameState.events[this.gameState.currentEventIndex] as MapGameEvent;

            this.broadcast('roundResult', {
                correctAnswer: {
                    coordinates: currentEvent.actualCoordinates,
                    year: currentEvent.actualYear,
                },
                playerResults,
            });
        }
        // In the future, you would add `else if (this.gameState.gameType === 'quiz-game')`

        setTimeout(() => {
            this.startRound();
        }, 5000);
    }
    
    // --- NEW: Map Game Specific Scoring Function ---
    calculateMapGameScores() {
        const event = this.gameState.events[this.gameState.currentEventIndex] as MapGameEvent;
        if (!event) return [];

        // Find who answered first for the speed bonus
        const sortedPlayers = [...this.players].sort((a, b) => {
            const aTime = (a.currentAnswer as MapGameAnswer)?.answeredAt || Infinity;
            const bTime = (b.currentAnswer as MapGameAnswer)?.answeredAt || Infinity;
            return aTime - bTime;
        });
        const fastestPlayerId = sortedPlayers[0]?.id;

        const playerResults = this.players.map(player => {
            const answer = player.currentAnswer as MapGameAnswer | undefined;
            if (!answer) {
                 return { id: player.id, scoreThisRound: 0, answer: undefined };
            }

            // --- Correctness Score (Max 90 points) ---
            const R = 6371;
            const dLat = (answer.coordinates[0] - event.actualCoordinates[0]) * Math.PI / 180;
            const dLon = (answer.coordinates[1] - event.actualCoordinates[1]) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(event.actualCoordinates[0] * Math.PI / 180) * Math.cos(answer.coordinates[0] * Math.PI / 180) * 
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            const maxDistance = 2000;
            const locationScore = Math.max(0, 45 - (distance / maxDistance) * 45);

            const yearDiff = Math.abs(event.actualYear - answer.year);
            const maxYearDiff = 100;
            const timeScore = Math.max(0, 45 - (yearDiff / maxYearDiff) * 45);

            const correctnessScore = Math.round(locationScore + timeScore);

            // --- Speed Bonus (10 points) ---
            const speedBonus = (player.id === fastestPlayerId) ? 10 : 0;
            
            // --- Final Score for the Round ---
            const scoreThisRound = correctnessScore + speedBonus;
            
            player.score += scoreThisRound;
            const playerState = this.gameState.players.find(p => p.id === player.id);
            if (playerState) playerState.score = player.score;

            return {
                id: player.id,
                scoreThisRound,
                answer,
            };
        });

        return playerResults;
    }

    // NEW: Function to load map game specific events
    loadMapGameEvents(): MapGameEvent[] {
         return [
            // Your existing list of map game events
            { id: "french-revolution", name: "French Revolution Begins", description: "...", actualYear: 1789, actualCoordinates: [48.8566, 2.3522] },
            // ... etc.
        ];
    }

    // ... All other functions (startRound, gameOver, broadcast, etc.) remain mostly the same.
    // NOTE: Ensure the existing functions are copied over. The structure provided here is a guide.
}