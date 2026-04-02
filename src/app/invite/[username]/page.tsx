"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TIER_THRESHOLDS } from "@/lib/points";
import { TIER_BADGE_STYLES, TIER_ICONS } from "@/lib/tierStyles";
import { cn } from "@/lib/utils";

interface InviterProfile {
  name: string;
  username: string;
  avatarUrl: string | null;
  tier: number;
  compassMiles: number;
  _count?: { followers: number; following: number; trips: number };
}

export default function InvitePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<InviterProfile | null>(null);

  useEffect(() => {
    fetch(`/api/users?username=${username}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setProfile(data);
      })
      .catch(() => {
        // Fallback demo profile
        setProfile({
          name: username.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          username,
          avatarUrl: null,
          tier: 2,
          compassMiles: 3200,
          _count: { followers: 142, following: 89, trips: 14 },
        });
      });
  }, [username]);

  const tierDef = TIER_THRESHOLDS.find((t) => t.tier === (profile?.tier || 1));
  const tierStyle = TIER_BADGE_STYLES[profile?.tier || 1] || TIER_BADGE_STYLES[1];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-brand-navy">
            <span className="text-brand-pin-past">{"\u{2733}"}</span>
            <span className="font-serif">Stampy</span>
          </div>
          <p className="text-sm text-brand-text-muted mt-1">Travel Deeper</p>
        </div>

        {/* Inviter card */}
        {profile && (
          <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border p-6 mb-6 noise-texture">
            <div className="w-16 h-16 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-xl font-bold mx-auto mb-3">
              {profile.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold font-serif text-brand-text">{profile.name}</h2>
            <p className="text-sm text-brand-text-muted mb-3">@{profile.username}</p>

            {tierDef && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium",
                  tierStyle.bg,
                  tierStyle.text
                )}
              >
                {TIER_ICONS[tierDef.icon]} {tierDef.name}
              </span>
            )}

            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div>
                <div className="font-bold text-brand-text">{profile.compassMiles.toLocaleString()}</div>
                <div className="text-[10px] text-brand-text-muted">Compass Miles</div>
              </div>
              {profile._count && (
                <>
                  <div>
                    <div className="font-bold text-brand-text">{profile._count.trips}</div>
                    <div className="text-[10px] text-brand-text-muted">Trips</div>
                  </div>
                  <div>
                    <div className="font-bold text-brand-text">{profile._count.followers}</div>
                    <div className="text-[10px] text-brand-text-muted">Followers</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <p className="text-brand-text-secondary mb-6">
          {profile?.name || username} invited you to join Stampy
        </p>

        {/* CTA */}
        <Link
          href={`/auth/signup?ref=${username}`}
          className="block w-full py-3 bg-brand-navy text-parchment font-semibold rounded-2xl text-center hover:bg-brand-navy-hover transition-colors btn-press"
        >
          Join Stampy
        </Link>

        <p className="text-sm text-brand-text-muted mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-navy hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
