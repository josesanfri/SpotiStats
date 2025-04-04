"use server";
import { auth, signIn, signOut } from "@/auth";
import { Session } from "next-auth";

/**
 * Logs in the user using the specified provider.
 *
 * This function initiates the sign-in process with the given provider and redirects
 * the user to the home page upon successful login.
 *
 * @param provider - The authentication provider to use for login (e.g., "spotify").
 * @returns A promise that resolves when the login process is complete.
 */
export const login = async (provider: string): Promise<void> => {
    await signIn(provider, { redirectTo: "/" });
};

/**
 * Logs out the current user.
 *
 * This function ends the user's session and redirects them to the home page.
 *
 * @returns A promise that resolves when the logout process is complete.
 */
export const logout = async (): Promise<void> => {
    await signOut({ redirectTo: "/" });
};

/**
 * Retrieves the access token for the current session.
 *
 * This function fetches the access token from the user's session, which is required
 * for making authenticated requests to the Spotify API.
 *
 * @returns A promise that resolves to the access token as a string, or `undefined` if no token is available.
 */
export const getAccessToken = async (): Promise<string | undefined> => {
    const session = await auth() as Session;
    return session?.access_token;
};