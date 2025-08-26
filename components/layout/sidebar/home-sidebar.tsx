import { ShopLinks } from "../shop-links";

interface HomeSidebarProps {
	collections: any[];
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
	return (
		<aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
			<div>
				<p className="italic tracking-tighter text-base">Khazal Al-Majidi</p>
				<div className="mt-5 text-base leading-tight">
					<p>Occupying history is more dangerous than occupying land.</p>
					<p>
						All knowledge is in favor of Palestine and its frank archaeological
						history.
					</p>
				</div>
			</div>
			<ShopLinks collections={collections} />
		</aside>
	);
}
