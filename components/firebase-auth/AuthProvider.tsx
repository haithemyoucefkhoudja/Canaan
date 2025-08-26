"use client";

import * as React from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { Claims } from "next-firebase-auth-edge/auth/claims";
import { setCustomUserClaims } from "@/lib/server/auth";
import { refreshToken } from "@/lib/server/refresh-token";
import { Card, CardContent } from "../ui/card";
import { AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export interface AuthProviderProps {
	user: IUser | null;
	children: React.ReactNode;
}
const checkClaims = async (
	userId?: string,
	customClaims?: Claims,
	token?: string
) => {
	if (!userId || !customClaims || !token) return false;
	if (!customClaims.app_role || customClaims.role) {
		const claimsResult = await setCustomUserClaims(userId);
		if (!claimsResult.success) {
			throw new Error(claimsResult.error);
		}
		await refreshToken(token);
	}
	return true;
};
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
	user,
	children,
}) => {
	const { isLoading, error, refetch } = useQuery({
		queryKey: ["claims"],
		queryFn: () => checkClaims(user?.id, user?.custom_claims, user?.id_token),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-4">
				<Card className="w-full max-w-md shadow-lg border-red-200">
					<CardContent className="p-8 text-center">
						<div className="flex justify-center mb-4">
							<div className="p-3 bg-red-100 rounded-full">
								<AlertCircle className="h-8 w-8 text-red-600" />
							</div>
						</div>

						<h2 className="text-xl font-semibold text-gray-900 mb-2">
							Authentication Error
						</h2>

						<p className="text-gray-600 mb-6 leading-relaxed">
							We encountered an issue while verifying your account. Please try
							again.
						</p>

						<div className="space-y-3">
							<Button
								onClick={() => refetch()}
								className="w-full bg-red-600 hover:bg-red-700 text-white"
							>
								<RefreshCw className="h-4 w-4 mr-2" />
								Try Again
							</Button>

							<Button
								variant="outline"
								onClick={() => window.location.reload()}
								className="w-full border-red-200 text-red-700 hover:bg-red-50"
							>
								Refresh Page
							</Button>
						</div>

						{process.env.NODE_ENV === "development" && (
							<details className="mt-4 text-left">
								<summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
									Error Details
								</summary>
								<pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
									{JSON.stringify(error, null, 2)}
								</pre>
							</details>
						)}
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
				<div className="text-center">
					<div className="flex justify-center mb-6">
						<div className="relative">
							<div className="w-16 h-16 border-4 border-green-200 rounded-full animate-pulse"></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<Loader2 className="h-8 w-8 text-green-600 animate-spin" />
							</div>
						</div>
					</div>

					<h2 className="text-xl font-semibold text-gray-900 mb-2">
						Verifying Account
					</h2>

					<p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
						Please wait while we verify your authentication credentials...
					</p>

					<div className="mt-6 flex justify-center">
						<div className="flex space-x-1">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
							<div
								className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
								style={{ animationDelay: "0.1s" }}
							></div>
							<div
								className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
								style={{ animationDelay: "0.2s" }}
							></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
