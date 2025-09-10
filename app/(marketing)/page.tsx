import { HomeSidebar } from "@/components/layout/sidebar/home-sidebar";
import { PageLayout } from "@/components/layout/page-layout";
import { GameCard } from "@/components/layout/home-page-elements/game-card";
import LevelDrop from "@/components/gamification/level-drop";

const gameCategories = [
	{ handle: "bingo-games", title: "Bingo Games" },
	{ handle: "historical-quizzes", title: "Historical Quizzes" },
	{ handle: "memory-games", title: "Memory Games" },
	{ handle: "puzzle-games", title: "Puzzle Games" },
	{ handle: "library", title: "Library" },
];

const featuredGames = [
	{
		id: "1",
		title: "Ancient Civilizations Bingo",
		handle: "bingo",
		description: "Test your knowledge of through interactive bingo",
		featuredImage: {
			url: "/bingo-game.png",
			altText: "Bingo Game",
		},
		priceRange: { minVariantPrice: { amount: "Free", currencyCode: "" } },
	},
	{
		id: "2",
		title: "Quiz",
		handle: "quiz",
		description: "Journey through  history with this comprehensive quiz",
		featuredImage: {
			url: "/quizz.png",
			altText: "Quiz",
		},
		priceRange: { minVariantPrice: { amount: "Free", currencyCode: "" } },
	},
	{
		id: "3",
		title: "Map Discovery",
		handle: "map",
		description: "learn about historical discoveries and places",
		featuredImage: {
			url: "/map-discovery-game.png",
			altText: "Map Discovery Game",
		},
		priceRange: { minVariantPrice: { amount: "Free", currencyCode: "" } },
	},
	{
		id: "4",
		title: "Puzzle",
		handle: "puzzle",
		description: "Decode ancient scripts and learn about historical languages",
		featuredImage: {
			url: "/puzzle-game.png",
			altText: "Ancient Languages Puzzle",
		},
		priceRange: { minVariantPrice: { amount: "Free", currencyCode: "" } },
	},
	{
		id: "5",
		title: "Library",
		handle: "library",
		description: "Discover Books and sources",
		featuredImage: {
			url: "/library.png",
			altText: "Books and sources",
		},
		priceRange: { minVariantPrice: { amount: "Free", currencyCode: "" } },
	},
];

export default async function Home() {
	const collections = gameCategories;

	const [lastGame, ...restGames] = featuredGames;
	return (
		<PageLayout>
			<div className="contents md:grid md:grid-cols-12 md:gap-sides">
				<HomeSidebar collections={collections} />
				<div className="flex relative flex-col grid-cols-2 col-span-8 w-full md:grid">
					<LevelDrop />
					{featuredGames.length > 0 && (
						<>
							<GameCard className="col-span-2" product={lastGame} principal />

							{restGames.map((product: any, index: number) => (
								<GameCard
									className="col-span-1"
									key={product.id}
									product={product}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</PageLayout>
	);
}
