import { getAppCheck } from "@/app-check";
import { getToken } from "@firebase/app-check";
import { UserCredential } from "firebase/auth";

export async function login(token: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch("/api/login", {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  return response.json();
}

export async function loginWithCredential(credential: UserCredential) {
  try {
    const idToken = await credential.user.getIdToken();

    return await login(idToken);
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

export async function logout() {
  const headers: Record<string, string> = {};

  // This is optional. Use it if your app supports App Check – https://firebase.google.com/docs/app-check
  if (process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_KEY) {
    const appCheckTokenResponse = await getToken(getAppCheck(), false);

    headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
  }

  await fetch("/api/logout", {
    method: "GET",
    headers,
  });
}

export async function checkEmailVerification() {
  const headers: Record<string, string> = {};

  await fetch("/api/check-email-verification", {
    method: "GET",
    headers,
  });
}
