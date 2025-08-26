import { Tokens } from "next-firebase-auth-edge";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { IAuthIdentity, IUser } from "@/types/user";
import { getOrCreateUserFromAuth } from "@/lib/supabase";
import { setCustomUserClaims } from "@/lib/server/auth";

import { refreshToken } from "@/lib/server/refresh-token";
const toAuthIdentity = ({
	token,
	customToken,
	decodedToken,
}: Tokens): IAuthIdentity => {
	const {
		uid,
		email,
		picture: photoURL,
		email_verified: emailVerified,
		name: displayName,
		source_sign_in_provider: signInProvider,
	} = decodedToken;

	return {
		id: uid,
		email: email ?? "Unknown",
		display_name: displayName ?? "Unknown",
		photo_url: photoURL ?? null,
		email_verified: emailVerified ?? false,
		provider_id: signInProvider,
		id_token: token,
		custom_token: customToken,
	};
};
export const toUser = async (token: Tokens): Promise<IUser> => {
	const authIdentity = toAuthIdentity(token);
	const customClaims = filterStandardClaims(token.decodedToken);

	const dbUser = await getOrCreateUserFromAuth(authIdentity);

	// `dbUser` now has: id, display_name, email, photo_url, xp, created_at, updated_at
	// It is a complete `User` object from Prisma.

	// 3. Combine the database user with the live token info to create the final IUser
	const fullUser: IUser = {
		...dbUser, // All the data from our database
		...authIdentity, // You can spread this again to ensure name/photo are the absolute latest
		email_verified: authIdentity.email_verified,
		provider_id: authIdentity.provider_id,
		custom_claims: customClaims,
	};
	return fullUser;
};
