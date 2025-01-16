"use server";
import { auth, signIn, signOut, ISession } from "@/auth";

export const login = async (provider: string): Promise<void> => {
    await signIn(provider, { redirectTo: "/" });
    setTimeout(async () => {
        await signOut({ redirectTo: "/" });
    }, 3600000);
};

export const logout = async (): Promise<void> => {
    await signOut({ redirectTo: "/" });
};

export const getAccessToken = async () => {
    const session = await auth() as ISession;
    return session?.accessToken;
}
