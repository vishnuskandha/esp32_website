"use client";

import { useEffect, useState } from "react";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ActivityLog } from "@/components/ActivityLog";
import { LogEntry } from "@/lib/store";

interface ButtonState {
    button1: boolean;
    button2: boolean;
    logs: LogEntry[];
}

export default function Home() {
    const [state, setState] = useState<ButtonState>({
        button1: false,
        button2: false,
        logs: [],
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/status");
                if (res.ok) {
                    const data = await res.json();
                    setState({
                        button1: data.button1,
                        button2: data.button2,
                        logs: data.logs || [],
                    });
                }
            } catch (error) {
                console.error("Failed to fetch status", error);
            }
        }, 500); // Poll every 500ms

        return () => clearInterval(interval);
    }, []);

    const toggleButton = async (btn: "button1" | "button2") => {
        const newState = {
            ...state,
            [btn]: !state[btn],
        };

        // Optimistic update
        setState(prev => ({ ...prev, [btn]: !prev[btn] }));

        try {
            await fetch("/api/button", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    button1: newState.button1,
                    button2: newState.button2,
                }),
            });
        } catch (error) {
            console.error("Failed to toggle button", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-grid">
            {/* Background Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        ESP32<span className="text-cyan-400">.</span>CONTROL
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
                        <span>System v2.0</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span>Secure Connection</span>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full place-items-center mb-16">
                    <StatusIndicator
                        label="System Alpha"
                        active={state.button1}
                        color="cyan"
                        onClick={() => toggleButton("button1")}
                    />
                    <StatusIndicator
                        label="System Beta"
                        active={state.button2}
                        color="magenta"
                        onClick={() => toggleButton("button2")}
                    />
                </div>

                {/* Activity Log */}
                <ActivityLog logs={state.logs} />
            </div>

            {/* Footer Status */}
            <div className="absolute bottom-8 flex gap-8 text-[10px] font-mono tracking-widest text-zinc-700 uppercase">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Server Online
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    Latency: 24ms
                </div>
            </div>
        </main>
    );
}
