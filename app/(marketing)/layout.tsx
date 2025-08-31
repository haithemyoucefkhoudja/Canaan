import { Header } from "@/components/layout/header";
import { Fragment } from "react";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const collections: any[] = [
		{ handle: "bingo-games", title: "Bingo Games" },
		{ handle: "historical-quizzes", title: "Historical Quizzes" },
		{ handle: "memory-games", title: "Memory Games" },
		{ handle: "puzzle-games", title: "Puzzle Games" },
		{ handle: "library", title: "Library" },
	];

	return (
		<Fragment>
			<Header collections={collections} />
			{children}
		</Fragment>
	);
}
