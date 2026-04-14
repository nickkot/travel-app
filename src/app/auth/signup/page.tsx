"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

function PasswordStrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  if (!password) return null;

  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-brand-danger",
    "bg-pin-past",
    "bg-brand-success",
    "bg-brand-success",
  ];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < score ? colors[score - 1] : "bg-brand-border"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs transition-colors duration-300 ${
          score <= 1
            ? "text-brand-danger"
            : score === 2
              ? "text-pin-past"
              : "text-brand-success"
        }`}
      >
        {labels[score - 1]}
      </p>
    </div>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const { setUser } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  // Debounced username availability check
  const checkUsername = useCallback(async (value: string) => {
    if (value.length < 2) {
      setUsernameStatus("idle");
      return;
    }
    setUsernameStatus("checking");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check-username", username: value }),
      });
      const data = await res.json();
      setUsernameStatus(data.available ? "available" : "taken");
    } catch {
      setUsernameStatus("idle");
    }
  }, []);

  useEffect(() => {
    if (!username || username.length < 2) {
      setUsernameStatus("idle");
      return;
    }
    const timer = setTimeout(() => checkUsername(username), 300);
    return () => clearTimeout(timer);
  }, [username, checkUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "signup",
          name,
          username,
          email,
          password,
          ...(ref ? { referredBy: ref } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setUser(data.user);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  const inputClass =
    "w-full px-4 py-2.5 bg-brand-surface ring-1 ring-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy/30 transition-colors text-brand-text placeholder:text-brand-text-muted/50";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 md:pt-24 pb-12">
      <div className="w-full max-w-md animate-slide-up">
        {/* Branded header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-brand-navy"
              fill="currentColor"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="font-serif text-xl font-semibold text-brand-text tracking-tight">
              Stampy
            </span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-brand-text mb-2">
            Start your journey
          </h1>
          <p className="text-brand-text-muted">
            Join a community of travelers, not tourists
          </p>
        </div>

        <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-6 shadow-sm noise-texture">
          {/* Referral banner */}
          {ref && (
            <div className="flex items-center gap-3 mb-5 p-3 bg-brand-navy/5 rounded-lg ring-1 ring-brand-navy/10">
              <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-parchment text-sm font-semibold shrink-0">
                {ref.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-brand-text-secondary">
                Invited by{" "}
                <span className="font-medium text-brand-navy">@{ref}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-brand-danger/10 ring-1 ring-brand-danger/30 rounded-lg text-brand-danger text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>

            {/* Username with @ prefix and availability check */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-muted text-sm select-none">
                  @
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                    )
                  }
                  placeholder="atlas_explorer"
                  required
                  className={`${inputClass} pl-8 pr-9`}
                />
                {usernameStatus !== "idle" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameStatus === "checking" && (
                      <svg
                        className="w-4 h-4 text-brand-text-muted animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          strokeDasharray="56"
                          strokeDashoffset="14"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {usernameStatus === "available" && (
                      <svg
                        className="w-4 h-4 text-brand-success"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {usernameStatus === "taken" && (
                      <svg
                        className="w-4 h-4 text-brand-danger"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </div>
              {usernameStatus === "available" && (
                <p className="text-xs text-brand-success mt-1">
                  Username available
                </p>
              )}
              {usernameStatus === "taken" && (
                <p className="text-xs text-brand-danger mt-1">
                  Username already taken
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            {/* Password with show/hide toggle and strength bar */}
            <div>
              <label className="block text-sm font-medium text-brand-text mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text transition-colors p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <PasswordStrengthBar password={password} />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-navy text-parchment font-semibold rounded-lg hover:bg-brand-navy-hover transition-colors disabled:opacity-50 btn-press"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Demo login divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-xs text-brand-text-muted">or</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full py-3 bg-transparent ring-1 ring-brand-border text-brand-text font-medium rounded-lg hover:bg-brand-surface transition-colors btn-press"
          >
            Try Demo Account
          </button>

          <p className="text-center text-sm text-brand-text-muted mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-brand-navy hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
