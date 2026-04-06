"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    username: string;
    bio: string;
    avatarUrl: string | null;
  };
  onSave: (data: { name: string; username: string; bio: string; avatarUrl: string | null }) => void;
}

export function EditProfileModal({ isOpen, onClose, initialData, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [saving, setSaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name);
      setUsername(initialData.username);
      setBio(initialData.bio);
      setAvatarUrl(initialData.avatarUrl);
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
      onSave({ name, username, bio, avatarUrl });
    } finally {
      setSaving(false);
    }
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
