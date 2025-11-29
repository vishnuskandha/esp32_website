"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/");
                router.refresh();
            } else {
                setError(data.message || "Access Denied");
            }
        } catch (err) {
            setError("System Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-grid">
            {/* Background Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

            <div className="z-10 w-full max-w-md px-4">
                <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10 space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-4 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                            <Lock className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
                            System Access
                        </h1>
                        <p className="text-xs font-mono tracking-[0.2em] text-zinc-500">
                            SECURE TERMINAL V2.0
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase ml-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-center text-xl tracking-[0.1em] font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                                placeholder="USERNAME"
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-center text-xl tracking-[0.5em] font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="text-center text-xs font-bold text-red-500 tracking-widest animate-pulse">
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full group relative flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all duration-300",
                                loading && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <span>{loading ? "Verifying..." : "Initialize"}</span>
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}

                            {/* Button Glow */}
                            <div className="absolute inset-0 rounded-lg bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
