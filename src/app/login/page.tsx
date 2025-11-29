"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Cpu } from "lucide-react";
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
        <main className="flex min-h-screen items-center justify-center bg-black selection:bg-cyan-500/30 p-4 md:p-0">
            {/* Animated Background Grid (Global) */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            <div className="z-10 w-full max-w-5xl h-full md:h-[600px] glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40 flex flex-col md:flex-row">

                {/* LEFT SIDE: Branding & Visuals */}
                <div className="relative w-full md:w-1/2 bg-zinc-900/50 p-10 md:p-16 flex flex-col justify-between overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,243,255,0.15),transparent_50%)]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-magenta-500/10 blur-[100px] rounded-full" />

                    {/* Logo/Icon */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black/50 border border-white/10 mb-6 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                            <Cpu className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
                            Control <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
                                Center
                            </span>
                        </h1>
                    </div>

                    {/* Stats / Info */}
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-4 text-zinc-400">
                            <div className="w-12 h-[1px] bg-zinc-700" />
                            <span className="text-xs font-mono tracking-[0.2em] uppercase">System v2.0</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                            Secure access point for ESP32 IoT infrastructure. Authorized personnel only.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-black/20 relative">
                    {/* Decorative Line */}
                    <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                    <div className="max-w-sm mx-auto w-full space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
                            <p className="text-sm text-zinc-400 mt-2">Enter your credentials to continue.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold tracking-wide text-zinc-500 uppercase ml-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 font-medium"
                                    placeholder="admin"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold tracking-wide text-zinc-500 uppercase ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 font-medium tracking-widest"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in fade-in slide-in-from-left-2">
                                    <ShieldCheck className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={cn(
                                    "w-full group relative flex items-center justify-center gap-2 bg-white text-black hover:bg-cyan-50 font-bold py-3.5 rounded-xl transition-all duration-300 mt-2",
                                    loading && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                <span>{loading ? "Verifying..." : "Access Dashboard"}</span>
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
