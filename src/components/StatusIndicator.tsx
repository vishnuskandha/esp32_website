"use client";

import { cn } from "@/lib/utils";
import { Power } from "lucide-react";

interface StatusIndicatorProps {
    label: string;
    active: boolean;
    color: "cyan" | "magenta";
    onClick?: () => void;
}

export function StatusIndicator({ label, active, color, onClick }: StatusIndicatorProps) {
    return (
        <div
            className="flex flex-col items-center gap-6 group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative">
                {/* Glow Effect behind the button */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full blur-3xl transition-opacity duration-500",
                        active ? "opacity-60" : "opacity-0",
                        color === "cyan" ? "bg-cyan-500" : "bg-fuchsia-500"
                    )}
                />

                {/* 3D Button Container */}
                <div
                    className={cn(
                        "btn-3d relative flex h-40 w-40 items-center justify-center rounded-full border-4 transition-all duration-200",
                        "bg-zinc-900 border-zinc-800",
                        color === "cyan" && "btn-3d-cyan",
                        color === "magenta" && "btn-3d-magenta",
                        active && "active"
                    )}
                >
                    <Power
                        className={cn(
                            "h-16 w-16 transition-all duration-300",
                            active
                                ? "text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                : "text-zinc-700",
                        )}
                    />
                </div>
            </div>

            <div className="text-center space-y-1">
                <h2
                    className={cn(
                        "text-2xl font-black tracking-widest uppercase transition-colors duration-300",
                        active
                            ? color === "cyan" ? "text-cyan-400 text-glow-cyan" : "text-fuchsia-400 text-glow-magenta"
                            : "text-zinc-600"
                    )}
                >
                    {label}
                </h2>
                <p className={cn(
                    "text-xs font-mono tracking-[0.2em] transition-colors duration-300",
                    active ? "text-white" : "text-zinc-700"
                )}>
                    {active ? "ONLINE" : "OFFLINE"}
                </p>
            </div>
        </div>
    );
}
