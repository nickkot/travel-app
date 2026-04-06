"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DESTINATIONS, FRIEND_REVIEWS, type Budget, type Vibe, type ThemeKey, type DestinationMeta } from "@/data/destinationMeta";
import { RatingStrip } from "@/components/RatingStrip";
import { cn } from "@/lib/utils";

const VISITED = new Set(["United States", "Canada", "Mexico", "Japan", "Italy", "Australia", "France", "Thailand", "Peru", "India", "Russia", "Kenya"]);

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

interface DiscoverQuizProps {
  onClose: () => void;
}

export function DiscoverQuiz({ onClose }: DiscoverQuizProps) {
  const [step, setStep] = useState<Step>("budget");
  const [answers, setAnswers] = useState<Answers>({
    budget: null, duration: null, month: null, priority: null, vibe: null,
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

  // Quiz questions (inline card)
  if (step !== "results") {
    return (
      <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{"\u{1F9ED}"}</span>
            <span className="font-serif font-bold text-brand-text">Find Your Next Trip</span>
          </div>
          <button onClick={onClose} className="p-1 text-brand-text-muted hover:text-brand-text">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {STEPS.slice(0, 5).map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i <= stepIndex ? "bg-brand-pin-past w-6" : "bg-brand-border w-2"
              )}
            />
          ))}
        </div>

        {/* Back button */}
        {stepIndex > 0 && (
          <button onClick={goBack} className="mb-3 text-xs text-brand-text-muted hover:text-brand-text flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        )}

        {step === "budget" && (
          <QuizQuestion title="What's your travel style?">
            {[
              { value: "backpacker" as Budget, icon: "\u{1F392}", label: "Backpacker", desc: "$30/day" },
              { value: "mid-range" as Budget, icon: "\u{1F3E8}", label: "Mid-range", desc: "$100/day" },
              { value: "luxury" as Budget, icon: "\u{2728}", label: "Luxury", desc: "$250+/day" },
            ].map((opt) => (
              <OptionCard key={opt.value} {...opt} selected={answers.budget === opt.value} onClick={() => select("budget", opt.value)} />
            ))}
          </QuizQuestion>
        )}

        {step === "duration" && (
          <QuizQuestion title="How long?">
            {[
              { value: "weekend", icon: "\u{26A1}", label: "Weekend", desc: "2-4 days" },
              { value: "week", icon: "\u{1F4C5}", label: "One week", desc: "7 days" },
              { value: "two-weeks", icon: "\u{1F5D3}", label: "Two weeks", desc: "14 days" },
              { value: "month", icon: "\u{1F30D}", label: "One month+", desc: "30+ days" },
            ].map((opt) => (
              <OptionCard key={opt.value} {...opt} selected={answers.duration === opt.value} onClick={() => select("duration", opt.value)} />
            ))}
          </QuizQuestion>
        )}

        {step === "month" && (
          <QuizQuestion title="When?">
            <div className="grid grid-cols-4 gap-1.5">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => select("month", i + 1)}
                  className={cn(
                    "py-2.5 rounded-lg text-xs font-medium transition-all",
                    answers.month === i + 1
                      ? "bg-brand-navy text-parchment"
                      : "bg-brand-surface ring-1 ring-brand-border text-brand-text hover:bg-brand-bg"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </QuizQuestion>
        )}

        {step === "priority" && (
          <QuizQuestion title="What matters most?">
            {[
              { value: "eat" as ThemeKey, icon: "\u{1F37D}\u{FE0F}", label: "Eat", desc: "Food & markets" },
              { value: "explore" as ThemeKey, icon: "\u{1F9ED}", label: "Explore", desc: "Nature & culture" },
              { value: "connect" as ThemeKey, icon: "\u{1F91D}", label: "Connect", desc: "People & nightlife" },
              { value: "live" as ThemeKey, icon: "\u{1F3E0}", label: "Live", desc: "Value & ease" },
            ].map((opt) => (
              <OptionCard key={opt.value} {...opt} selected={answers.priority === opt.value} onClick={() => select("priority", opt.value)} />
            ))}
          </QuizQuestion>
        )}

        {step === "vibe" && (
          <QuizQuestion title="What's the vibe?">
            {[
              { value: "beach" as Vibe, icon: "\u{1F3D6}\u{FE0F}", label: "Beach & Relax", desc: "Sun & sand" },
              { value: "city" as Vibe, icon: "\u{1F3D9}\u{FE0F}", label: "City & Culture", desc: "Museums & streets" },
              { value: "nature" as Vibe, icon: "\u{26F0}\u{FE0F}", label: "Nature & Adventure", desc: "Hiking & wildlife" },
              { value: "food" as Vibe, icon: "\u{1F37B}", label: "Food & Nightlife", desc: "Street food & bars" },
            ].map((opt) => (
              <OptionCard key={opt.value} {...opt} selected={answers.vibe === opt.value} onClick={() => select("vibe", opt.value)} />
            ))}
          </QuizQuestion>
        )}
      </div>
    );
  }

  // Results (inline)
  return (
    <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-5 noise-texture">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-lg text-brand-text">Your Top Matches</h3>
        <button onClick={onClose} className="p-1 text-brand-text-muted hover:text-brand-text">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {recommendations.map((dest) => {
          const friendReview = FRIEND_REVIEWS[dest.country];
          return (
            <div key={dest.city} className="rounded-xl bg-brand-surface p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{dest.countryFlag}</span>
                    <h4 className="font-serif font-bold text-sm text-brand-text">{dest.city}</h4>
                  </div>
                  <p className="text-xs text-brand-text-secondary">{dest.country}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-brand-pin-past/10 text-brand-pin-past text-xs font-bold">
                  {dest.matchPct}%
                </span>
              </div>

              <p className="text-xs text-brand-text-secondary italic mb-2">
                &ldquo;{dest.tagline}&rdquo;
              </p>

              <div className="mb-2">
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
              <div className="mb-3 flex items-start gap-2">
                {friendReview ? (
                  <>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                      style={{ backgroundColor: friendReview.friendColor }}
                    >
                      {friendReview.friendName.charAt(0)}
                    </div>
                    <p className="text-[11px] text-brand-text-secondary">
                      <span className="font-semibold text-brand-text">{friendReview.friendName}:</span> &ldquo;{friendReview.quote}&rdquo;
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-xs shrink-0">{"\u{1F9ED}"}</span>
                    <p className="text-[11px] text-brand-text-secondary">{dest.expertTip}</p>
                  </>
                )}
              </div>

              <Link
                href="/trips/new"
                className="block w-full py-2 bg-brand-navy text-parchment font-medium rounded-lg text-xs text-center hover:bg-brand-navy-hover transition-colors btn-press"
              >
                Plan This Trip
              </Link>
            </div>
          );
        })}
      </div>

      <button
        onClick={reset}
        className="mt-3 w-full py-2 rounded-lg ring-1 ring-brand-border text-xs font-medium text-brand-text-secondary hover:bg-brand-surface transition-colors btn-press"
      >
        Retake Quiz
      </button>
    </div>
  );
}

function QuizQuestion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-bold font-serif text-brand-text mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function OptionCard({ icon, label, desc, selected, onClick }: {
  icon: string; label: string; desc: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl ring-1 transition-all text-left btn-press",
        selected
          ? "bg-brand-navy text-parchment ring-brand-navy"
          : "bg-brand-surface ring-brand-border hover:bg-brand-bg text-brand-text"
      )}
    >
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className={cn("text-[11px]", selected ? "text-parchment/70" : "text-brand-text-muted")}>{desc}</div>
      </div>
    </button>
  );
}
