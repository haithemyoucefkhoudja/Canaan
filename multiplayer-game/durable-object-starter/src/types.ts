// src/types.ts

// --- Generic and Shared Types ---
export interface Player {
    id: string;
    ws: WebSocket;
    score: number;
    currentAnswer?: GameAnswer; // This will now be a generic type
}

export type GameType = 'map-game' | 'quiz-game' | 'bingo-game'; // The different games we support

// --- Map Game Specific Types ---
export interface MapGameEvent {
    id: string;
    name: string;
    description?: string;
    actualYear: number;
    actualCoordinates: [number, number];
}

export interface MapGameAnswer {
    type: 'map-game';
    coordinates: [number, number];
    year: number;
    answeredAt: number; // Timestamp for speed bonus
}

// --- Quiz Game Specific Types (Example for the future) ---
export interface QuizGameEvent {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizGameAnswer {
    type: 'quiz-game';
    answer: string;
}

// --- Union Types for Flexibility ---
// A GameEvent can be any of our specific event types
export type GameEvent = MapGameEvent | QuizGameEvent; 
// A GameAnswer can be any of our specific answer types
export type GameAnswer = MapGameAnswer | QuizGameAnswer;