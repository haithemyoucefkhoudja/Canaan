"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navItems } from "./index";
import { SidebarLinks } from "../sidebar/product-sidebar-links";
import { ShopLinks } from "../shop-links";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { Hamburger, HamburgerIcon, Menu } from "lucide-react";

interface MobileMenuProps {
	collections: any[];
}

export default function MobileMenu({ collections }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const openMobileMenu = () => setIsOpen(true);
	const closeMobileMenu = () => setIsOpen(false);

	// Lock body scroll when menu is open
	useBodyScrollLock(isOpen);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isOpen]);

	// Close menu when route changes
	useEffect(() => {
		closeMobileMenu();
	}, [pathname]);

	return (
		<>
			<Button
				onClick={openMobileMenu}
				aria-label="Open mobile menu"
				variant="secondary"
				size="sm"
				className="uppercase md:hidden"
			>
				<Menu className="h-6 w-6" />
			</Button>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="fixed inset-0 z-50 bg-foreground/30"
							onClick={closeMobileMenu}
							aria-hidden="true"
						/>

						{/* Panel */}
						<motion.div
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="fixed top-0 bottom-0 left-0 flex w-full md:w-[400px] p-modal-sides z-50"
						>
							<div className="flex flex-col p-3 w-full rounded bg-muted md:p-4">
								<div className="flex justify-between items-baseline pl-2 mb-10">
									<p className="text-2xl font-semibold">Menu</p>
									<Button
										size="sm"
										variant="ghost"
										aria-label="Close cart"
										onClick={closeMobileMenu}
									>
										Close
									</Button>
								</div>

								<nav className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
									{navItems.map((item) => (
										<Button
											key={item.href}
											size="sm"
											variant="secondary"
											onClick={closeMobileMenu}
											className="justify-start uppercase bg-background/50"
											asChild
										>
											<Link href={item.href} prefetch>
												{item.label}
											</Link>
										</Button>
									))}
								</nav>

								<ShopLinks label="Categories" collections={collections} />

								<div className="mt-auto mb-6 text-sm leading-tight opacity-50">
									<p className="italic">Khazal Al-Majidi</p>
									<div className="mt-5">
										<p>
											Occupying history is more dangerous than occupying land.
										</p>
										<p>
											All knowledge is in favor of Palestine and its frank
											archaeological history
										</p>
									</div>
								</div>
								<SidebarLinks className="gap-2 w-full" />
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
