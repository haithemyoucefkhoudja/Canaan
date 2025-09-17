"use client";

import { Trophy, Lock, Star } from "lucide-react";
import { useGamification } from "../hooks/use-gamification";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function AchievementsPanel() {
	const { achievements } = useGamification();

	// This function now returns a simple class name for theming.
	const getRarityClass = (rarity: string) => {
		switch (rarity) {
			case "common":
				return "rarity-common";
			case "rare":
				return "rarity-rare";
			case "epic":
				return "rarity-epic";
			case "legendary":
				return "rarity-legendary";
			default:
				return "rarity-common";
		}
	};

	const getRarityIcon = (rarity: string) => {
		switch (rarity) {
			case "legendary":
				return <Star className="h-4 w-4" />;
			default:
				return <Trophy className="h-4 w-4" />;
		}
	};

	return (
		<Card> {/* Removed bg-white, shadow, and border styles */}
			<CardHeader className="p-4"> {/* Removed border-b */}
				<CardTitle className="flex items-center gap-2"> {/* Removed text-xl, font-semibold */}
					<Trophy className="h-6 w-6" /> {/* Removed text-yellow-600 */}
					Achievements
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<div className="grid gap-3">
					{achievements.map((achievement) => (
						<div
							key={achievement.id}
							className="p-3 transition-all" // Removed rounded, border, bg, and opacity styles
							data-unlocked={achievement.isUnlocked} // Added data-attribute for styling
						>
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3">
									<div
										className="p-2" // Removed rounded-full and bg colors
										data-unlocked={achievement.isUnlocked}
									>
										{achievement.isUnlocked ? (
											getRarityIcon(achievement.rarity)
										) : (
											<Lock className="h-4 w-4" /> // Removed text-gray-400
										)}
									</div>
									<div>
										<h3
											data-unlocked={achievement.isUnlocked} // Removed font and text color
										>
											{achievement.name}
										</h3>
										<p
											data-unlocked={achievement.isUnlocked} // Removed text size and color
										>
											{achievement.description}
										</p>
										{achievement.isUnlocked && achievement.unlockedAt && (
											<p className="mt-1"> {/* Removed text size and color */}
												Unlocked {achievement.unlockedAt.toLocaleDateString()}
											</p>
										)}
									</div>
								</div>
								<div className="flex flex-col items-end gap-2">
									<Badge className={getRarityClass(achievement.rarity)}>
										{achievement.rarity}
									</Badge>
									<div> {/* Removed text size, font weight, and color */}
										+{achievement.xpBonus} XP
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}