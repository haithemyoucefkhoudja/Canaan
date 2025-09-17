"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Star, Zap, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	xp_bonus: number;
}

interface AchievementModalProps {
	isOpen: boolean;
	onClose: () => void;
	achievements: Achievement[];
	totalXp: number;
}

export function AchievementModal({
	isOpen,
	onClose,
	achievements,
	totalXp,
}: AchievementModalProps) {
	if (achievements.length === 0) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			{/* Removed specific positioning, bg, border, and animation classes. */}
			{/* These should be styled globally on the DialogContent component. */}
			<DialogContent className="max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out">
				<DialogHeader className="pb-4">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
						<Trophy className="h-8 w-8" />
					</div>
					<DialogTitle> {/* Removed font and color styles */}
						{achievements.length === 1
							? "Achievement Unlocked!"
							: "Achievements Unlocked!"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{achievements.map((achievement, index) => (
						<div key={achievement.id}>
							{/* Removed rounded, bg, and border styles */}
							<div className="flex items-start gap-4 p-4">
								<div className="flex-shrink-0">
									<div className="flex h-12 w-12 items-center justify-center text-2xl">
										<Avatar>
											<AvatarImage
												src={achievement.icon}
												alt={achievement.name}
											/>
											<AvatarFallback>
												{achievement.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</div>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="truncate"> {/* Removed font and color */}
											{achievement.name}
										</h3>
										<Badge className="flex items-center gap-1"> {/* Removed variant */}
											<Star className="h-3 w-3" />
											{achievement.xp_bonus} XP
										</Badge>
									</div>
									<p> {/* Removed text size and color */}
										{achievement.description}
									</p>
								</div>
							</div>
							{index < achievements.length - 1 && (
								<Separator className="my-2" />
							)}
						</div>
					))}

					{totalXp > 0 && (
						<>
							<Separator />
							{/* Removed rounded, bg, and border styles */}
							<div className="flex items-center justify-center gap-2 p-4">
								<Zap className="h-5 w-5" />
								<span> {/* Removed font and color */}
									Total XP Gained: {totalXp}
								</span>
							</div>
						</>
					)}

					<div className="flex justify-center pt-4">
						<Button onClick={onClose}>
							<X className="h-4 w-4 mr-2" />
							Close
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}