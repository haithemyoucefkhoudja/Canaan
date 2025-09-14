import type React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Palestinian Historical Bingo",
	description:
		"Interactive bingo game featuring Palestinian historical events with traditional flag colors",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return { children };
}
