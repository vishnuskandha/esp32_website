"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
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
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800">
            {/* Soft Background Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/30 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/30 blur-[100px]" />

            <div className="z-10 w-full max-w-[380px] px-4">
                <div className="relative">
                    {/* User Icon Circle (Top Center) */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#0f172a] flex items-center justify-center border-4 border-white/10 shadow-xl z-20">
                        <User className="w-10 h-10 text-white stroke-[1.5]" />
                    </div>

                    {/* Main Glass Card */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 pt-16 shadow-2xl relative z-10">

                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            {/* Username Input */}
                            <div className="flex items-center bg-[#1e293b]/80 rounded-sm overflow-hidden border border-white/5 group focus-within:ring-1 focus-within:ring-blue-400/50 transition-all">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#0f172a]/50 border-r border-white/5">
                                    <User className="w-5 h-5 text-white/70" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none"
                                    placeholder="Username"
                                    autoFocus
                                />
                            </div>

                            {/* Password Input */}
                            <div className="flex items-center bg-[#1e293b]/80 rounded-sm overflow-hidden border border-white/5 group focus-within:ring-1 focus-within:ring-blue-400/50 transition-all">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#0f172a]/50 border-r border-white/5">
                                    <Lock className="w-5 h-5 text-white/70" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>

                            {/* Options Row */}
                            <div className="flex items-center justify-between text-xs text-white/60 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                    <div className={cn(
                                        "w-4 h-4 rounded-sm border border-white/30 flex items-center justify-center transition-colors",
                                        rememberMe ? "bg-blue-500 border-blue-500" : "bg-transparent"
                                    )}>
                                        {rememberMe && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    Remember me
                                </label>
                                <button type="button" className="hover:text-white transition-colors italic">
                                    Forgot Password?
                                </button>
                            </div>

                            {error && (
                                <div className="text-center text-xs font-bold text-red-300 bg-red-500/20 py-2 rounded-md animate-pulse">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Login Button (Floating Bottom) */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] z-20">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className={cn(
                                "w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md border border-white/20 text-white font-bold tracking-widest py-4 rounded-2xl shadow-lg transition-all duration-300 uppercase text-sm",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
