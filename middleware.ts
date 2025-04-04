import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isAuthenticated = !!req.auth;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
});

export const config = {
    matcher: ["/artist", "/track", "/genre", "/profile"],
};
