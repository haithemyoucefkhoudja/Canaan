import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShopLinksProps {
	collections: any[];
	align?: "left" | "right";
	label?: string;
	className?: string;
}
export function ShopLinks({
	collections,
	label = "Games",
	align = "left",
	className,
}: ShopLinksProps) {
	return (
		<div
			className={cn(align === "right" ? "text-right" : "text-left", className)}
		>
			<h4 className="text-lg font-extrabold md:text-xl">{label}</h4>

			<ul className="flex flex-col gap-1.5 leading-5 mt-5">
				{collections.map((item, index) => (
					<li key={`${item.handle}-${index}`}>
						<Link href={`/games/${item.handle}`} prefetch>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
