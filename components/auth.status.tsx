"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { getFirebaseAuth } from "@/components/firebase-auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth } from "@/components/firebase-auth/AuthContext";
import { logout } from "@/api";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const navItems = [
	{
		label: "Login",
		href: "/login",
	},
	{
		label: "Register",
		href: "/register",
	},
];

export function AuthStatus({
	ItemsRender,
}: {
	ItemsRender?: () => JSX.Element;
}) {
	const router = useRouter();
	const { user } = useAuth();
	const isMobile = useIsMobile();

	const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
		const auth = getFirebaseAuth();
		await signOut(auth);
		await logout();
		router.push("/login?redirect=/");
	});

	if (!user) {
		if (!ItemsRender) return null;

		return ItemsRender();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* Removed variant, rounded, and focus ring styles */}
				<Button className="relative h-10 w-10">
					{/* Removed border and hover styles */}
					<Avatar className="h-10 w-10 transition-colors">
						{user?.photo_url ? (
							<AvatarImage
								className="object-cover"
								src={user.photo_url}
								alt={user.display_name || "User"}
							/>
						) : null}
						{/* Removed font weight, bg color, and text color */}
						<AvatarFallback>
							{user?.display_name?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			{/* Removed width, blur, shadow, and border */}
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className="px-3 py-2">
					<div className="flex flex-col space-y-1">
						{/* Removed text size, font weight, and color */}
						<p>{user?.display_name}</p>
						{/* Removed text size and color */}
						<p>{user?.email}</p>
						{/* Removed text size, font weight, capitalize, and color */}
						<p>
							{user &&
								(user?.custom_claims?.app_role as any) &&
								(user.custom_claims.app_role as string).toUpperCase()}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator /> {/* Removed bg color */}
				<DropdownMenuItem asChild> {/* Removed focus and cursor styles */}
					<Link href="/profile" className="flex items-center px-3 py-2"> {/* Removed text size */}
						<User className="mr-2 h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator /> {/* Removed bg color */}
				<DropdownMenuItem
					disabled={isLogoutLoading} // Removed focus, text color, and cursor styles
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						handleLogout();
					}}
				>
					<div className="flex items-center px-3 py-2"> {/* Removed text size */}
						<LogOut className="mr-2 h-4 w-4" />
						Log out
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}