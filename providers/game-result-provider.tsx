import {
	GameConfig,
	GameState,
	GameProgressContextType,
} from "@/types/gamification";
import { GameResult } from "@prisma/client";
import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	useCallback,
} from "react";

// Define the initial configuration for a game
const initialGameConfig: GameConfig = {
	userId: "user-simulated-id",
	gameType: "Bingo",
	level: 5,
	winConditionScore: 500,
	mockCharacterPlacements: 1,
};

// Define the initial state for the game progress
const initialState: GameState = {
	status: "idle",
	score: 0,
	startTime: null,
	correctAnswers: 0,
	totalQuestions: 0,
	combo: 0,
	maxCombo: 0,
	gameResult: null,
	gameConfig: initialGameConfig,
};

// Define actions for the reducer
type Action =
	| { type: "START_GAME" }
	| { type: "ANSWER_QUESTION"; payload: { isCorrect: boolean } }
	| { type: "END_GAME" }
	| { type: "RESET_GAME" }
	| { type: "UPDATE_CONFIG"; payload: Partial<GameConfig> };

// The reducer function to manage game state
const gameProgressReducer = (state: GameState, action: Action): GameState => {
	switch (action.type) {
		case "START_GAME":
			return {
				...initialState,
				gameConfig: state.gameConfig, // Persist config across resets
				status: "playing",
				startTime: Date.now(),
			};

		case "ANSWER_QUESTION": {
			const { isCorrect } = action.payload;
			const newCombo = isCorrect ? state.combo + 1 : 0;
			const newScore = isCorrect
				? state.score + 100 + newCombo * 10
				: state.score;
			const newCorrectAnswers = isCorrect
				? state.correctAnswers + 1
				: state.correctAnswers;

			return {
				...state,
				score: newScore,
				combo: newCombo,
				maxCombo: Math.max(state.maxCombo, newCombo),
				correctAnswers: newCorrectAnswers,
				totalQuestions: state.totalQuestions + 1,
			};
		}

		case "END_GAME": {
			if (state.status !== "playing") return state;

			const endTime = Date.now();
			const timeSpent = Math.round((endTime - state.startTime!) / 1000);

			const speedBonus = timeSpent < 60 ? 200 : 0;
			const finalScore = state.score + speedBonus;

			const finalGameResult: GameResult = {
				id: crypto.randomUUID(),
				// Use values from gameConfig state instead of hardcoded ones
				user_id: state.gameConfig.userId,
				game_type: state.gameConfig.gameType,
				level: state.gameConfig.level,
				base_points: state.score,
				final_points: finalScore,
				time_spent: timeSpent,
				correct_answers: state.correctAnswers,
				total_questions: state.totalQuestions,
				is_win: finalScore > state.gameConfig.winConditionScore,
				speed_bonus: speedBonus,
				first_attempt_bonus: 0, // Not tracked in this simple simulation
				played_at: new Date(),
				extra: {
					combo: state.maxCombo,
					character_placements: state.gameConfig.mockCharacterPlacements,
				},
			};

			return {
				...state,
				status: "finished",
				gameResult: finalGameResult,
			};
		}

		case "RESET_GAME":
			return {
				...initialState,
				gameConfig: state.gameConfig, // Persist config so user doesn't have to re-enter it
			};

		case "UPDATE_CONFIG":
			return {
				...state,
				gameConfig: {
					...state.gameConfig,
					...action.payload,
				},
			};

		default:
			return state;
	}
};

// Create the context
const GameProgressContext = createContext<GameProgressContextType | undefined>(
	undefined
);

// The provider component
export const GameProgressProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(gameProgressReducer, initialState);

	const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);
	const answerQuestion = useCallback(
		(isCorrect: boolean) =>
			dispatch({ type: "ANSWER_QUESTION", payload: { isCorrect } }),
		[]
	);
	const endGame = useCallback(() => dispatch({ type: "END_GAME" }), []);
	const resetGame = useCallback(() => dispatch({ type: "RESET_GAME" }), []);
	const updateConfig = useCallback(
		(newConfig: Partial<GameConfig>) =>
			dispatch({ type: "UPDATE_CONFIG", payload: newConfig }),
		[]
	);

	const contextValue: GameProgressContextType = {
		...state,
		startGame,
		answerQuestion,
		endGame,
		resetGame,
		updateConfig,
	};

	return (
		<GameProgressContext.Provider value={contextValue}>
			{children}
		</GameProgressContext.Provider>
	);
};

// Custom hook to use the context
export const useGameProgress = (): GameProgressContextType => {
	const context = useContext(GameProgressContext);
	if (context === undefined) {
		throw new Error(
			"useGameProgress must be used within a GameProgressProvider"
		);
	}
	return context;
};
