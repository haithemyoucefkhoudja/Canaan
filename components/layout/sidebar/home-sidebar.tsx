import { AppLinks } from "../app-links";

interface HomeSidebarProps {
	collections: any[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
	return (
		<aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
			<div className="space-y-6">
				<div className="space-y-4">
					<h1 className="text-lg font-bold tracking-tight text-foreground">
						Khazal Al-Majidi
					</h1>

					<div className="space-y-3 text-base leading-relaxed">
						<blockquote className="relative pl-4 border-l-2 border-primary/30">
							<p className="font-medium text-foreground italic">
								"Occupying history is more dangerous than occupying land. All
								knowledge is in favor of Palestine and its frank archaeological
								history."
							</p>
						</blockquote>
					</div>
				</div>
			</div>

			<div className="flex-1 mt-12 mb-8">
				<AppLinks collections={collections} />
			</div>
		</aside>
	);
}
