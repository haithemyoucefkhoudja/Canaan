import type React from "react";
import type { Metadata } from "next";
import { GameProgressProvider } from "@/providers/game-result-provider";

export const metadata: Metadata = {
	title: "Games Hub",
	description: "Manage complex historical data relationships and research",
};

export default function GamesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <GameProgressProvider>{children}</GameProgressProvider>;
}
