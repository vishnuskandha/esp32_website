import { NextResponse } from "next/server";
import { buttonState, updateButtonState } from "@/lib/store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { button1, button2 } = body;

        if (typeof button1 === "boolean" && typeof button2 === "boolean") {
            updateButtonState(button1, button2);
            return NextResponse.json({ success: true, state: buttonState });
        } else {
            return NextResponse.json(
                { success: false, error: "Invalid payload. Expected { button1: boolean, button2: boolean }" },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
    }
}
