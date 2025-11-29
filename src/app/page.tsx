"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
    const router = useRouter();

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

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-grid">
            {/* Background Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            {/* Logout Button - Fixed Position & High Z-Index */}
            <button
                onClick={handleLogout}
                style={{ position: 'fixed', top: '1.5rem', right: '1.5rem' }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 group z-[100] shadow-lg"
            >
                <span className="tracking-widest font-bold">LOGOUT</span>
                <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4 pt-20 pb-32">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        ESP32<span className="text-cyan-400">.</span>CONTROL
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
                        <span>System v2.0</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span>Secure Connection</span>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full place-items-center mb-12">
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
                <div className="w-full max-w-2xl">
                    <ActivityLog logs={state.logs} />
                </div>
            </div>

            {/* Footer Status - Fixed Bottom & High Contrast */}
            <div
                style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
                className="bg-black/80 backdrop-blur-sm border-t border-white/5 py-3 px-6 flex justify-start gap-8 text-[10px] font-mono tracking-widest text-zinc-500 uppercase z-40"
            >
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-zinc-400">Server Online</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <span className="text-zinc-400">Latency: 24ms</span>
                </div>
            </div>
        </main>
    );
}
