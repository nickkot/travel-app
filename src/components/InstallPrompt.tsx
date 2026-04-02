"use client";

import { useState, useEffect } from "react";

export function InstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on iOS Safari, not in standalone mode, and not dismissed before
    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(navigator as any).standalone;
    const isSafari = /safari/i.test(navigator.userAgent) && !/crios|fxios|chrome/i.test(navigator.userAgent);
    const dismissed = localStorage.getItem("stampy-install-dismissed");

    if (isIos && isSafari && !dismissed) {
      // Delay showing to avoid jarring first-load experience
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("stampy-install-dismissed", "1");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-80 z-50 animate-slide-up">
      <div className="bg-brand-card rounded-2xl ring-1 ring-brand-border shadow-xl p-4 noise-texture">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-brand-pin-past text-lg shrink-0">
            {"\u{2733}"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-text">
              Add Stampy to Home Screen
            </p>
            <p className="text-xs text-brand-text-secondary mt-0.5 leading-relaxed">
              Tap{" "}
              <svg className="w-4 h-4 inline-block align-text-bottom text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" />
              </svg>
              {" "}then &ldquo;Add to Home Screen&rdquo;
            </p>
          </div>
          <button
            onClick={dismiss}
            className="text-brand-text-muted hover:text-brand-text shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
