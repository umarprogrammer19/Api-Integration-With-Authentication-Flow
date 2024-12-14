import { NextResponse } from "next/server";

export function middleware(req: Request) {
    const authToken = req.headers.get("cookie")?.split("; ").find((c) => c.startsWith("auth_token="));

    if (!authToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/protected-route/:path*"],
};
