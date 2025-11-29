import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    (await cookies()).delete({
        name: "auth_token",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return NextResponse.json({ success: true });
}
