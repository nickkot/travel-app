"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CountryPicker, CityPicker } from "./LocationPicker";

export interface EditProfileData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  baseCity: string | null;
  baseCountry: string | null;
  baseLat: number | null;
  baseLng: number | null;
  baseCity2: string | null;
  baseCountry2: string | null;
  baseLat2: number | null;
  baseLng2: number | null;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: EditProfileData;
  onSave: (data: EditProfileData) => void;
}

export function EditProfileModal({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [baseCountry, setBaseCountry] = useState(initialData.baseCountry ?? "");
  const [baseCity, setBaseCity] = useState(initialData.baseCity ?? "");
  const [baseLat, setBaseLat] = useState(initialData.baseLat ?? 0);
  const [baseLng, setBaseLng] = useState(initialData.baseLng ?? 0);
  const [baseCountry2, setBaseCountry2] = useState(initialData.baseCountry2 ?? "");
  const [baseCity2, setBaseCity2] = useState(initialData.baseCity2 ?? "");
  const [baseLat2, setBaseLat2] = useState(initialData.baseLat2 ?? 0);
  const [baseLng2, setBaseLng2] = useState(initialData.baseLng2 ?? 0);
  const [showSecondBase, setShowSecondBase] = useState(
    !!(initialData.baseCity2 || initialData.baseCountry2)
  );
  const [saving, setSaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name);
      setUsername(initialData.username);
      setBio(initialData.bio);
      setAvatarUrl(initialData.avatarUrl);
      setBaseCountry(initialData.baseCountry ?? "");
      setBaseCity(initialData.baseCity ?? "");
      setBaseLat(initialData.baseLat ?? 0);
      setBaseLng(initialData.baseLng ?? 0);
      setBaseCountry2(initialData.baseCountry2 ?? "");
      setBaseCity2(initialData.baseCity2 ?? "");
      setBaseLat2(initialData.baseLat2 ?? 0);
      setBaseLng2(initialData.baseLng2 ?? 0);
      setShowSecondBase(!!(initialData.baseCity2 || initialData.baseCountry2));
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      onSave({
        name,
        username,
        bio,
        avatarUrl,
        baseCity: baseCity || null,
        baseCountry: baseCountry || null,
        baseLat: baseCity ? baseLat : null,
        baseLng: baseCity ? baseLng : null,
        baseCity2: showSecondBase && baseCity2 ? baseCity2 : null,
        baseCountry2: showSecondBase && baseCountry2 ? baseCountry2 : null,
        baseLat2: showSecondBase && baseCity2 ? baseLat2 : null,
        baseLng2: showSecondBase && baseCity2 ? baseLng2 : null,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClearHomeBase = () => {
    setBaseCity("");
    setBaseCountry("");
    setBaseLat(0);
    setBaseLng(0);
  };

  const handleClearSecondBase = () => {
    setBaseCity2("");
    setBaseCountry2("");
    setBaseLat2(0);
    setBaseLng2(0);
    setShowSecondBase(false);
  };

  const nameInitial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-md bg-brand-bg rounded-2xl ring-1 ring-brand-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <h2 className="text-lg font-bold font-serif text-brand-text">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-text-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Avatar preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy text-xl font-bold flex-shrink-0 ring-2 ring-brand-border">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                nameInitial
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-brand-text-muted mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                value={avatarUrl || ""}
                onChange={(e) => setAvatarUrl(e.target.value || null)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
              className="w-full px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-brand-text-muted">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                required
                maxLength={30}
                className="w-full pl-7 pr-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-medium text-brand-text-muted mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={160}
              placeholder="Tell the world about your travels..."
              className="w-full px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-navy/30 resize-none"
            />
            <span className="text-[10px] text-brand-text-muted">{bio.length}/160</span>
          </div>

          {/* Home base(s) — power the Local Guide feature. Supports up to
              two cities so people who split their life across two places
              (a second home, a job-and-hometown split) can guide both. */}
          <div className="pt-1 border-t border-brand-border/60">
            <div className="mb-2 mt-4">
              <label className="block text-xs font-medium text-brand-text-muted">
                Home base
                <span className="ml-1.5 text-[10px] text-brand-text-muted/80">
                  (unlocks Local Guide · earn 300 miles per recommendation)
                </span>
              </label>
            </div>
            <div className="space-y-2">
              {/* First home base */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted">
                    Primary
                  </p>
                  {(baseCity || baseCountry) && (
                    <button
                      type="button"
                      onClick={handleClearHomeBase}
                      className="text-[10px] text-brand-text-muted hover:text-brand-text transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <CountryPicker
                    value={baseCountry}
                    onChange={(c) => {
                      setBaseCountry(c);
                      if (c !== baseCountry) {
                        setBaseCity("");
                        setBaseLat(0);
                        setBaseLng(0);
                      }
                    }}
                    placeholder="Country"
                  />
                  <CityPicker
                    country={baseCountry}
                    value={baseCity}
                    onChange={(c, lat, lng) => {
                      setBaseCity(c);
                      setBaseLat(lat);
                      setBaseLng(lng);
                    }}
                    placeholder="City you live in"
                  />
                </div>
              </div>

              {/* Second home base — collapsed behind a button until needed */}
              {!showSecondBase ? (
                <button
                  type="button"
                  onClick={() => setShowSecondBase(true)}
                  disabled={!baseCity}
                  className={cn(
                    "w-full mt-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors border border-dashed",
                    !baseCity
                      ? "border-brand-border/50 text-brand-text-muted/50 cursor-not-allowed"
                      : "border-brand-border text-brand-navy hover:bg-brand-surface"
                  )}
                >
                  + Add a second city
                </button>
              ) : (
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted">
                      Second city
                    </p>
                    <button
                      type="button"
                      onClick={handleClearSecondBase}
                      className="text-[10px] text-brand-text-muted hover:text-brand-text transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <CountryPicker
                      value={baseCountry2}
                      onChange={(c) => {
                        setBaseCountry2(c);
                        if (c !== baseCountry2) {
                          setBaseCity2("");
                          setBaseLat2(0);
                          setBaseLng2(0);
                        }
                      }}
                      placeholder="Country"
                    />
                    <CityPicker
                      country={baseCountry2}
                      value={baseCity2}
                      onChange={(c, lat, lng) => {
                        setBaseCity2(c);
                        setBaseLat2(lat);
                        setBaseLng2(lng);
                      }}
                      placeholder="Second city you know"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-sm font-medium text-brand-text hover:bg-brand-surface transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim() || !username.trim()}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-parchment transition-colors btn-press",
                saving || !name.trim() || !username.trim()
                  ? "bg-brand-navy/50 cursor-not-allowed"
                  : "bg-brand-navy hover:bg-brand-navy-hover"
              )}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
