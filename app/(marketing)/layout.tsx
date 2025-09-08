import { Header } from "@/components/layout/header";
import { GridPattern } from "@/components/shapes/grid";
import { cn } from "@/lib/utils";

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
		<section className="relative photography-banner">
			{/* <div className="relative flex size-full  border bg-background"> */}
			<GridPattern
				x={-1}
				y={-1}
				className={cn(
					"[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
				)}
			/>
			<Header collections={collections} />
			{children}
			{/* </div> */}
		</section>
	);
}
