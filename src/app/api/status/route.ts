import { NextResponse } from "next/server";
import { buttonState } from "@/lib/store";

export async function GET() {
    return NextResponse.json(buttonState);
}
