import NextAuth, { type DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
import Spotify from "next-auth/providers/spotify";
import axios from "axios";

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";

/**
 * Refreshes the Spotify access token using the refresh token.
 *
 * This function sends a request to the Spotify API to obtain a new access token
 * when the current token has expired. It updates the token with the new access token,
 * expiration time, and refresh token (if provided).
 *
 * @param token - The current JWT token containing the refresh token.
 * @returns A promise that resolves to the updated JWT token.
 * @throws An error if the refresh token is not available or the request fails.
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        if (!token.refresh_token) {
            throw new Error("No refresh token available");
        }

        const basicAuth = Buffer.from(
            `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
        ).toString("base64");
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", token.refresh_token);

        const { data } = await axios.post(
            SPOTIFY_REFRESH_TOKEN_URL,
            params.toString(),
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 5000,
            }
        );

        return {
            ...token,
            access_token: data.access_token,
            access_token_expires: Date.now() + data.expires_in * 1000,
            refresh_token: data.refresh_token ?? token.refresh_token,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshTokenError",
        };
    }
}

const providers: Provider[] = [
    Spotify({
        clientId: process.env.AUTH_SPOTIFY_ID,
        clientSecret: process.env.AUTH_SPOTIFY_SECRET,
        authorization: {
            url: "https://accounts.spotify.com/authorize",
            params: {
                response_type: "code",
                scope: "user-top-read user-read-email playlist-modify-public playlist-modify-private user-read-private user-read-recently-played",
            },
        },
        checks: ["pkce", "state"],
        /**
         * Maps the Spotify profile data to the NextAuth user object.
         *
         * @param profile - The Spotify profile data.
         * @returns An object containing the user's ID, name, email, and profile image.
         */
        profile(profile) {
            return {
                id: profile.id,
                name: profile.display_name,
                email: profile.email,
                image: profile.images?.[0]?.url,
            };
        },
    }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        /**
         * Handles the JWT token lifecycle.
         *
         * This callback is triggered whenever a new token is created or updated.
         * It refreshes the token if it has expired and includes the user's profile
         * and authentication details.
         *
         * @param token - The current JWT token.
         * @param account - The account object from the authentication provider.
         * @param profile - The user's profile data.
         * @param user - The authenticated user object.
         * @returns A promise that resolves to the updated JWT token.
         */
        async jwt({ token, account, profile, user }) {
            if (account && user && account.access_token) {
                return {
                    provider: account.provider,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    access_token_expires: account.expires_at
                        ? account.expires_at * 1000
                        : Date.now() + 3600 * 1000,
                    user: profile,
                } satisfies JWT;
            }

            if (token.access_token_expires && Date.now() < token.access_token_expires) {
                return token;
            }

            if (token.error === "RefreshTokenError") {
                return await signOut({ redirectTo: "/" });
            }

            return await refreshAccessToken(token);
        },

        /**
         * Handles the session lifecycle.
         *
         * This callback is triggered whenever a session is created or updated.
         * It includes the access token and any errors in the session object.
         *
         * @param session - The current session object.
         * @param token - The JWT token associated with the session.
         * @returns The updated session object.
         */
        async session({ session, token }) {
            session.access_token = token.access_token;
            session.error = token.error;
            return session;
        },
    },
});

declare module "next-auth" {
    interface Session extends DefaultSession {
        /**
         * The access token for the authenticated session.
         */
        access_token?: string;

        /**
         * An error indicating issues with the refresh token.
         */
        error?: "RefreshTokenError";
    }
    interface Account {
        /**
         * The expiration time of the access token in seconds since the epoch.
         */
        expires_at?: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        /**
         * The access token for the authenticated session.
         */
        access_token: string;

        /**
         * The expiration time of the access token in milliseconds since the epoch.
         */
        access_token_expires?: number;

        /**
         * The refresh token used to obtain a new access token.
         */
        refresh_token?: string | null;

        /**
         * An error indicating issues with the refresh token.
         */
        error?: "RefreshTokenError";
    }
}