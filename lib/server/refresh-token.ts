"use server";

import { authConfig } from "@/config/server-config";
import { refreshCookiesWithIdToken } from "next-firebase-auth-edge/next/cookies";
import { cookies, headers } from "next/headers";

export async function refreshToken(token: string) {
	"use server";
	await refreshCookiesWithIdToken(token, headers(), cookies(), authConfig);
}
