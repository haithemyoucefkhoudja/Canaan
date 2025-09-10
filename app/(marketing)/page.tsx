import { HomeSidebar } from "@/components/layout/sidebar/home-sidebar";
import { PageLayout } from "@/components/layout/page-layout";
import LevelDrop from "@/components/gamification/level-drop";
import { Landmark, HelpCircle, MapPin, Puzzle } from "lucide-react";

const gameCategories = [
	{ handle: "bingo-games", title: "Bingo Games" },
	{ handle: "historical-quizzes", title: "Historical Quizzes" },
	{ handle: "memory-games", title: "Memory Games" },
	{ handle: "puzzle-games", title: "Puzzle Games" },
	{ handle: "library", title: "Library" },
];

// --- Data ---
const featuredGames = [
	{
		id: "1",
		title: "Palastine Bingo",
		handle: "/games/bingo",
		description:
			"Test your knowledge of ancient history through interactive bingo.",
		icon: <Landmark />,
	},
	{
		id: "2",
		title: "History Quiz",
		handle: "/games/quiz",
		description: "Journey through time with this comprehensive history quiz.",
		icon: <HelpCircle />,
	},
	{
		id: "3",
		title: "Map Discovery",
		handle: "/games/map-discovery",
		description:
			"Learn about historical discoveries and significant places on the map.",
		icon: <MapPin />,
	},
	{
		id: "4",
		title: "Language Puzzle",
		handle: "/games/puzzle",
		description: "Decode ancient scripts and learn about historical languages.",
		icon: <Puzzle />,
	},
];
export default async function Home() {
	const collections = gameCategories;

	const [lastGame, ...restGames] = featuredGames;
	return (
		<PageLayout>
			<div className="flex">
				<div className="w-full">
					<LevelDrop />
					<section className="info-section">
						{/* <div className="left-part">
							<h1>
								<span className="d-flex">
									{["w", "e", " ", "m", "a", "k", "e"].map((char, index) => (
										<span
											key={index}
											className="char tracking-tighter"
											style={{ animationDelay: `${index * 0.08}s` }}
										>
											{char === " " ? "\u00A0" : char}
										</span>
									))}
								</span>
								<span className="text tracking-tighter">Welcome</span>
							</h1>
							<p className="lexend tracking-widest">
								We create classes every next month with our new talented AI
								builders
							</p>
							<a href="https://www.x.com/nocheerleader/" className="book-link">
								<span className="linktext tracking-tighter text-3xl">
									Start Building Now
								</span>
								<span className="arrow">
									<span></span>
								</span>
							</a>
						</div> */}
						<HomeSidebar games={featuredGames} />

						<div className="right-part">
							<img
								src="/olive-branch.png"
								alt="Olive Branch"
								className="hero-image"
							/>
							{/* <div className="particles-container">
								{Array.from({ length: 20 }, (_, i) => (
									<div
										key={i}
										className="particle"
										style={{
											width: `${Math.random() * 8}px`,
											height: `${Math.random() * 8}px`,
											left: `${Math.random() * 100}%`,
											top: `${Math.random() * 100}%`,
											animationDuration: `${Math.random() * 20 + 15}s`,
											animationDelay: `${Math.random() * 10}s`,
										}}
									/>
								))}
							</div> */}
							<div className="leaf-container">
								{Array.from({ length: 25 }, (_, i) => {
									const width = Math.random() * 15 + 5; // Leaves are 5px to 20px wide

									return (
										<div
											key={i}
											className="leaf"
											style={{
												// --- Leaf-like Properties ---
												width: `${width}px`,
												height: `${width * 0.4}px`, // Height is proportional to width
												transform: `rotate(${Math.random() * 360}deg)`,

												// --- Animation & Position Properties ---
												left: `${Math.random() * 100}%`,
												animationDuration: `${Math.random() * 15 + 10}s`, // 10s to 25s
												animationDelay: `${Math.random() * 10}s`,
											}}
										/>
									);
								})}
							</div>
						</div>
					</section>
				</div>
			</div>
		</PageLayout>
	);
}
