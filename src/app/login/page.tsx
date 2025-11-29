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
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
            {/* Abstract Wave Lines (CSS-based for simplicity) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400/30 via-transparent to-transparent blur-3xl" />
            </div>

            <div className="z-10 w-full max-w-md px-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-sans font-bold text-white tracking-wide">
                            Login
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/80 ml-1">User Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-300"
                                    placeholder="Enter your username"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/80 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm text-white/70">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                <div className={cn(
                                    "w-4 h-4 rounded border border-white/30 flex items-center justify-center transition-colors",
                                    rememberMe ? "bg-pink-500 border-pink-500" : "bg-transparent"
                                )}>
                                    {rememberMe && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                Remember Me
                            </label>
                            <button type="button" className="hover:text-white transition-colors hover:underline">
                                Forgot password?
                            </button>
                        </div>

                        {error && (
                            <div className="text-center text-xs font-bold text-red-300 bg-red-500/20 py-2 rounded-lg animate-pulse">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full bg-white text-blue-900 font-bold py-3.5 rounded-full shadow-lg hover:bg-white/90 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]",
                                loading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {loading ? "Authenticating..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
