"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DESTINATIONS, FRIEND_REVIEWS, type Budget, type Vibe, type ThemeKey, type DestinationMeta } from "@/data/destinationMeta";
import { RatingStrip } from "@/components/RatingStrip";
import { cn } from "@/lib/utils";

// User's visited countries (from demo data)
const VISITED = new Set(["Mexico", "Japan", "Italy", "Australia", "France", "Thailand", "Peru", "India", "Russia", "Kenya"]);

type Step = "budget" | "duration" | "month" | "priority" | "vibe" | "results";

interface Answers {
  budget: Budget | null;
  duration: string | null;
  month: number | null;
  priority: ThemeKey | null;
  vibe: Vibe | null;
}

const STEPS: Step[] = ["budget", "duration", "month", "priority", "vibe", "results"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function scoreDestination(dest: DestinationMeta, answers: Answers): number {
  let score = 0;
  if (answers.budget && dest.budget === answers.budget) score += 30;
  if (answers.month && dest.bestMonths.includes(answers.month)) score += 25;
  if (answers.priority) score += dest.scores[answers.priority] * 8;
  if (answers.vibe && dest.vibe.includes(answers.vibe)) score += 20;
  if (VISITED.has(dest.country)) score -= 40;
  return score;
}

export default function DiscoverPage() {
  const [step, setStep] = useState<Step>("budget");
  const [answers, setAnswers] = useState<Answers>({
    budget: null,
    duration: null,
    month: null,
    priority: null,
    vibe: null,
  });

  const stepIndex = STEPS.indexOf(step);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  };

  const select = (key: keyof Answers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(goNext, 300);
  };

  const recommendations = useMemo(() => {
    if (step !== "results") return [];
    const scored = DESTINATIONS.map((d) => ({ ...d, score: scoreDestination(d, answers) }));
    scored.sort((a, b) => b.score - a.score);
    const maxScore = scored[0]?.score || 1;
    return scored.slice(0, 3).map((d) => ({
      ...d,
      matchPct: Math.min(99, Math.max(60, Math.round((d.score / maxScore) * 100))),
    }));
  }, [step, answers]);

  const reset = () => {
    setAnswers({ budget: null, duration: null, month: null, priority: null, vibe: null });
    setStep("budget");
  };

  // Quiz questions
  if (step !== "results") {
    return (
      <div className="min-h-screen bg-brand-bg pt-16 md:pt-20 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.slice(0, 5).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i <= stepIndex ? "bg-brand-pin-past w-6" : "bg-brand-border"
                )}
              />
            ))}
          </div>

          {/* Back button */}
          {stepIndex > 0 && (
            <button onClick={goBack} className="mb-4 text-sm text-brand-text-muted hover:text-brand-text flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          )}

          {/* Q1: Budget */}
          {step === "budget" && (
            <QuizQuestion title="What's your travel style?">
              {[
                { value: "backpacker" as Budget, icon: "\u{1F392}", label: "Backpacker", desc: "Hostels, street food, $30/day" },
                { value: "mid-range" as Budget, icon: "\u{1F3E8}", label: "Mid-range", desc: "Hotels, local restaurants, $100/day" },
                { value: "luxury" as Budget, icon: "\u{2728}", label: "Luxury", desc: "Boutique hotels, fine dining, $250+/day" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={answers.budget === opt.value}
                  onClick={() => select("budget", opt.value)}
                />
              ))}
            </QuizQuestion>
          )}

          {/* Q2: Duration */}
          {step === "duration" && (
            <QuizQuestion title="How long are you going?">
              {[
                { value: "weekend", icon: "\u{26A1}", label: "Weekend", desc: "2-4 days" },
                { value: "week", icon: "\u{1F4C5}", label: "One week", desc: "7 days" },
                { value: "two-weeks", icon: "\u{1F5D3}", label: "Two weeks", desc: "14 days" },
                { value: "month", icon: "\u{1F30D}", label: "One month+", desc: "30+ days" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={answers.duration === opt.value}
                  onClick={() => select("duration", opt.value)}
                />
              ))}
            </QuizQuestion>
          )}

          {/* Q3: Month */}
          {step === "month" && (
            <QuizQuestion title="When are you going?">
              <div className="grid grid-cols-4 gap-2">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => select("month", i + 1)}
                    className={cn(
                      "py-3 rounded-xl text-sm font-medium transition-all",
                      answers.month === i + 1
                        ? "bg-brand-navy text-parchment"
                        : "bg-brand-surface ring-1 ring-brand-border text-brand-text hover:bg-brand-card"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </QuizQuestion>
          )}

          {/* Q4: Priority */}
          {step === "priority" && (
            <QuizQuestion title="What matters most?">
              {[
                { value: "eat" as ThemeKey, icon: "\u{1F37D}\u{FE0F}", label: "Eat", desc: "Food, restaurants, markets" },
                { value: "explore" as ThemeKey, icon: "\u{1F9ED}", label: "Explore", desc: "Nature, architecture, culture" },
                { value: "connect" as ThemeKey, icon: "\u{1F91D}", label: "Connect", desc: "People, nightlife, social" },
                { value: "live" as ThemeKey, icon: "\u{1F3E0}", label: "Live", desc: "Value, transit, ease" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={answers.priority === opt.value}
                  onClick={() => select("priority", opt.value)}
                />
              ))}
            </QuizQuestion>
          )}

          {/* Q5: Vibe */}
          {step === "vibe" && (
            <QuizQuestion title="What's the vibe?">
              {[
                { value: "beach" as Vibe, icon: "\u{1F3D6}\u{FE0F}", label: "Beach & Relax", desc: "Sun, sand, slow mornings" },
                { value: "city" as Vibe, icon: "\u{1F3D9}\u{FE0F}", label: "City & Culture", desc: "Museums, architecture, neighborhoods" },
                { value: "nature" as Vibe, icon: "\u{26F0}\u{FE0F}", label: "Nature & Adventure", desc: "Hiking, wildlife, landscapes" },
                { value: "food" as Vibe, icon: "\u{1F37B}", label: "Food & Nightlife", desc: "Street food, bars, local scene" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={answers.vibe === opt.value}
                  onClick={() => select("vibe", opt.value)}
                />
              ))}
            </QuizQuestion>
          )}
        </div>
      </div>
    );
  }

  // Results
  return (
    <div className="min-h-screen bg-brand-bg pt-16 md:pt-20 pb-20 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold font-serif text-brand-text mb-1">Your Top Matches</h1>
        <p className="text-sm text-brand-text-muted mb-6 tracking-wide">Based on your preferences</p>

        <div className="space-y-4">
          {recommendations.map((dest, i) => {
            const friendReview = FRIEND_REVIEWS[dest.country];
            return (
              <div key={dest.city} className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture card-hover">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dest.countryFlag}</span>
                      <h3 className="font-serif font-bold text-lg text-brand-text">{dest.city}</h3>
                    </div>
                    <p className="text-sm text-brand-text-secondary">{dest.country}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-brand-pin-past/10 text-brand-pin-past text-sm font-bold">
                    {dest.matchPct}%
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-sm text-brand-text-secondary italic mb-3">
                  &ldquo;{dest.tagline}&rdquo;
                </p>

                {/* Theme scores */}
                <div className="mb-3">
                  <RatingStrip
                    overall={Math.round(((dest.scores.eat + dest.scores.explore + dest.scores.connect + dest.scores.live) / 4) * 10) / 10}
                    aspects={[
                      { label: "Eat", icon: "\u{1F37D}\u{FE0F}", rating: dest.scores.eat },
                      { label: "Explore", icon: "\u{1F9ED}", rating: dest.scores.explore },
                      { label: "Connect", icon: "\u{1F91D}", rating: dest.scores.connect },
                      { label: "Live", icon: "\u{1F3E0}", rating: dest.scores.live },
                    ]}
                  />
                </div>

                {/* Friend review or expert tip */}
                <div className="mb-4 p-3 rounded-xl bg-brand-surface">
                  {friendReview ? (
                    <div className="flex items-start gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: friendReview.friendColor }}
                      >
                        {friendReview.friendName.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-brand-text">{friendReview.friendName}</span>
                        <p className="text-xs text-brand-text-secondary mt-0.5">&ldquo;{friendReview.quote}&rdquo;</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-xs shrink-0">
                        {"\u{1F9ED}"}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-brand-text">Expert Tip</span>
                        <p className="text-xs text-brand-text-secondary mt-0.5">{dest.expertTip}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/trips/new"
                  className="block w-full py-2.5 bg-brand-navy text-parchment font-medium rounded-xl text-sm text-center hover:bg-brand-navy-hover transition-colors btn-press"
                >
                  Plan This Trip
                </Link>
              </div>
            );
          })}
        </div>

        {/* Retake */}
        <button
          onClick={reset}
          className="mt-6 w-full py-2.5 rounded-xl ring-1 ring-brand-border text-sm font-medium text-brand-text-secondary hover:bg-brand-surface transition-colors btn-press"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

function QuizQuestion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold font-serif text-brand-text mb-6">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function OptionCard({
  icon,
  label,
  desc,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl ring-1 transition-all text-left btn-press",
        selected
          ? "bg-brand-navy text-parchment ring-brand-navy"
          : "bg-brand-surface ring-brand-border hover:bg-brand-card text-brand-text"
      )}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-semibold">{label}</div>
        <div className={cn("text-xs", selected ? "text-parchment/70" : "text-brand-text-muted")}>{desc}</div>
      </div>
    </button>
  );
}
