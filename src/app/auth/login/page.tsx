"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setUser(data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login
  const handleDemoLogin = () => {
    setUser({
      id: "demo-user",
      email: "demo@travelapp.com",
      name: "Atlas Explorer",
      username: "atlas_explorer",
      avatarUrl: null,
      bio: "Slow traveler. 30+ countries. Always returning.",
      compassMiles: 3200,
      tier: 2,
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 md:pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-brand-text mb-2">Welcome back</h1>
          <p className="text-brand-text-muted">
            Sign in to continue your journey
          </p>
        </div>

        <div className="bg-brand-card rounded-[10px] border border-brand-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-brand-danger/10 border border-brand-danger/30 rounded-lg text-brand-danger text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg focus:outline-none focus:border-brand-navy transition-colors text-brand-text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg focus:outline-none focus:border-brand-navy transition-colors text-brand-text"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-navy text-parchment font-semibold rounded-lg hover:bg-brand-navy-hover transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-xs text-brand-text-muted">or</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full py-3 bg-transparent border border-brand-border text-brand-text font-medium rounded-lg hover:bg-brand-surface transition-colors"
          >
            Try Demo Account
          </button>

          <p className="text-center text-sm text-brand-text-muted mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-brand-navy hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
