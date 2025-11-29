import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { users } from "@/lib/users";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Validate input
        if (!username || !password) {
            return NextResponse.json({ success: false, message: "Username and password required" }, { status: 400 });
        }

        // Check credentials
        const validPassword = users[username as keyof typeof users];

        if (validPassword && validPassword === password) {
            // Set secure cookie
            (await cookies()).set("auth_token", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
