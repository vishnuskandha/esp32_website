"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
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
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black selection:bg-cyan-500/30">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Radial Gradient Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />

            <div className="z-10 w-full max-w-md px-6">
                <div className="glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                    {/* Header */}
                    <div className="text-center mb-8 space-y-3">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900/50 border border-white/10 mb-2 shadow-[0_0_30px_rgba(0,243,255,0.15)] group">
                            <ShieldCheck className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-zinc-400 mt-1">
                                Enter your credentials to access the control panel.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase ml-1">
                                Username
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-medium"
                                    placeholder="Enter your username"
                                    autoFocus
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-sm" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-medium tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-2">
                                <Lock className="w-3 h-3" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full group relative flex items-center justify-center gap-2 bg-white text-black hover:bg-cyan-50 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,243,255,0.3)]",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            <span>{loading ? "Authenticating..." : "Sign In"}</span>
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                            Secure Connection • ESP32 Controller
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
