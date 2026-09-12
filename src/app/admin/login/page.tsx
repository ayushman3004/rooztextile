"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rooztextile.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials. Please verify your password.");
      }

      // Successful login
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E141D] text-[#FDFBF7] flex flex-col justify-between selection:bg-[#C5A265] selection:text-[#11161F]">
      {/* Top Bar */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C5A265] to-[#E5C98B] flex items-center justify-center text-[#11161F] font-serif font-bold text-base shadow-sm">
            R
          </div>
          <span className="font-serif-brand text-xl tracking-tight text-white group-hover:text-[#C5A265] transition">
            RoozTextile
          </span>
        </Link>
        <Link
          href="/products"
          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition"
        >
          Return to Storefront →
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#161F2C] border border-[#2D3A4B] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6F8FA8] via-[#C5A265] to-[#6F8FA8]" />

          <div className="text-center mb-8 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A265]">
              Institutional & Sartorial Atelier
            </span>
            <h1 className="font-editorial-heading text-3xl font-normal text-white">
              Admin Console
            </h1>
            <p className="text-xs text-neutral-400 font-light">
              Secure MongoDB portal for managing uniforms, mill textiles & specifications
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rooztextile.com"
                className="w-full px-4 py-3 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265] focus:ring-1 focus:ring-[#C5A265] transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-12 bg-[#0E141D] border border-[#2C3B4E] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A265] focus:ring-1 focus:ring-[#C5A265] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#C5A265] to-[#B08E52] text-[#11161F] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.99] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#11161F]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Verifying Session...
                </>
              ) : (
                "Authenticate Admin Access"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-neutral-400">
              Default credentials configured in <code className="text-[#C5A265]">.env.local</code>:
              <br />
              <span className="text-white font-mono">admin@rooztextile.com</span> / <span className="text-white font-mono">adminrooz2026!</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-neutral-500 border-t border-white/10">
        RoozTextile Administrative System • MongoDB Powered Engine
      </footer>
    </div>
  );
}
