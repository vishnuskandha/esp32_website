"use client";

import { LogEntry } from "@/lib/store";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ActivityLogProps {
    logs: LogEntry[];
}

export function ActivityLog({ logs }: ActivityLogProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel w-full max-w-2xl rounded-xl p-6 mt-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
                    System Activity Log
                </h3>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
            </div>

            <div
                ref={scrollRef}
                className="min-h-[12rem] max-h-[24rem] overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent transition-all duration-500 ease-in-out"
            >
                {logs.length === 0 && (
                    <div className="text-zinc-600 italic">Waiting for system events...</div>
                )}
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-zinc-500">[{log.timestamp}]</span>
                        <span
                            className={cn(
                                "font-bold",
                                log.type === "success" && "text-neon-green",
                                log.type === "warning" && "text-yellow-400",
                                log.type === "info" && "text-cyan-400"
                            )}
                        >
                            {">"} {log.message}
                        </span>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
        </div>
    );
}
