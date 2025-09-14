"use client";

import { useState } from "react";
import BingoGame from "@/components/bingo-game";
import CharacterBingo from "@/components/character-bingo";
import { HeartsDisplay } from "@/components/hearts-display";
import { UserStats } from "@/components/user-stats";
import { AchievementsPanel } from "@/components/achievements-panel";
import { useGamification } from "@/hooks/use-gamification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trophy, BarChart3 } from "lucide-react";

export default function Page() {
	const [gameType, setGameType] = useState<"original" | "character" | null>(
		null
	);
	const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
	const [showStats, setShowStats] = useState(false);
	const [showAchievements, setShowAchievements] = useState(false);

	const { canPlayGame, user } = useGamification();

	const getGameTypeForLevel = (level: number): "original" | "character" => {
		if (level <= 2) {
			return "original"; // Level 1 and 2 are Events
		}

		// Starting from level 3, follow the pattern: Characters, Events, Events, Characters, Events, Events...
		const patternPosition = (level - 3) % 3;
		return patternPosition === 0 ? "character" : "original";
	};

	const handleLevelSelect = (level: number) => {
		if (!canPlayGame()) {
			return; // Prevent playing without hearts
		}

		setSelectedLevel(level);
		setGameType(getGameTypeForLevel(level));
	};

	const handleLevelComplete = (completedLevel: number, stars: number) => {
		const nextLevel = completedLevel + 1;
		setSelectedLevel(nextLevel);
		setGameType(getGameTypeForLevel(nextLevel));
	};

	const handleBack = () => {
		setGameType(null);
		setSelectedLevel(null);
		setShowStats(false);
		setShowAchievements(false);
	};

	// Show stats panel
	if (showStats) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-4">
				<div className="max-w-6xl mx-auto space-y-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-gray-800">
							Player Statistics
						</h1>
						<Button onClick={handleBack} variant="outline">
							Back to Menu
						</Button>
					</div>

					<HeartsDisplay />
					<UserStats />

					<Card className="bg-white shadow-lg border-2 border-gray-200">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								Game History
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
								<div>
									<div className="text-2xl font-bold text-blue-600">
										{user.totalGamesPlayed}
									</div>
									<div className="text-sm text-gray-600">Total Games</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-green-600">
										{user.gamesWon}
									</div>
									<div className="text-sm text-gray-600">Games Won</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-red-600">
										{user.gamesLost}
									</div>
									<div className="text-sm text-gray-600">Games Lost</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-purple-600">
										{user.longestStreak}
									</div>
									<div className="text-sm text-gray-600">Longest Streak</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	// Show achievements panel
	if (showAchievements) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-4">
				<div className="max-w-4xl mx-auto space-y-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-gray-800">Achievements</h1>
						<Button onClick={handleBack} variant="outline">
							Back to Menu
						</Button>
					</div>

					<HeartsDisplay />
					<AchievementsPanel />
				</div>
			</div>
		);
	}

	if (gameType === "character" && selectedLevel) {
		return (
			<CharacterBingo
				onBack={handleBack}
				level={selectedLevel}
				onLevelComplete={handleLevelComplete}
			/>
		);
	}

	if (gameType === "original" && selectedLevel) {
		return (
			<BingoGame
				onBack={handleBack}
				level={selectedLevel}
				onLevelComplete={handleLevelComplete}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">
						Palestinian Historical Bingo
					</h1>
					<p className="text-gray-600 text-lg">
						Test your knowledge of Palestinian history and culture
					</p>
				</div>

				<HeartsDisplay />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Button
						onClick={() => setShowStats(true)}
						className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl"
					>
						<BarChart3 className="h-6 w-6 mr-2" />
						View Statistics
					</Button>

					<Button
						onClick={() => setShowAchievements(true)}
						className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 rounded-xl"
					>
						<Trophy className="h-6 w-6 mr-2" />
						Achievements
					</Button>

					<Button
						onClick={() => handleLevelSelect(1)}
						disabled={!canPlayGame()}
						className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Heart className="h-6 w-6 mr-2" />
						{canPlayGame() ? "Start Playing" : "No Hearts Left"}
					</Button>
				</div>

				{!canPlayGame() && (
					<Card className="bg-red-50 border-red-200">
						<CardContent className="p-4 text-center">
							<p className="text-red-700 font-medium">
								You need hearts to play! Hearts regenerate every 2 hours.
							</p>
						</CardContent>
					</Card>
				)}

				<BingoGame onLevelSelect={handleLevelSelect} />
			</div>
		</div>
	);
}
