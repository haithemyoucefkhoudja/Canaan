import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { authConfig } from "./config/server-config";

const PUBLIC_PATHS = [
  "/login",
  "/",
  "/register",
  "/join-us",
  "/about",
  "/posts", // For the /posts index page
  /^\/posts\/[^/]+$/, // Matches /posts/any-slug
  /^\/profile\/[^/]+$/, // Matches /profile/any-slug
];
export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    refreshTokenPath: "/api/refresh-token",
    debug: authConfig.debug,
    enableMultipleCookies: authConfig.enableMultipleCookies,
    enableCustomToken: authConfig.enableCustomToken,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    tenantId: authConfig.tenantId,
    dynamicCustomClaimsKeys: ["someCustomClaim"],
    handleValidToken: async ({ token, decodedToken, customToken }, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      // console.log("token:", token);
      // console.log("decodedToken:", decodedToken);
      // console.log("customToken:", customToken);
      // check token expiration
      if (request.nextUrl.pathname == "/auth/login")
        return redirectToHome(request);

      // how to parse slug
      if (
        PUBLIC_PATHS.some((path) => {
          if (path instanceof RegExp) {
            return path.test(request.nextUrl.pathname);
          }
          return path === request.nextUrl.pathname;
        })
      ) {
        return redirectToLogin(request, {
          path: "/auth/login",
          publicPaths: PUBLIC_PATHS,
        });
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (_reason) => {
      return redirectToLogin(request, {
        path: "/auth/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      return redirectToLogin(request, {
        path: "/auth/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
    "/api/refresh-token",
  ],
};
