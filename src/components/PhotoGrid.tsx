"use client";

import { useState } from "react";

interface Photo {
  id: string;
  url: string;
  caption: string | null;
}

interface PhotoGridProps {
  photos: Photo[];
  onUpload?: (files: FileList) => void;
  editable?: boolean;
}

export function PhotoGrid({ photos, onUpload, editable }: PhotoGridProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIdx(i)}
          >
            <img
              src={photo.url}
              alt={photo.caption || "Trip photo"}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}

        {/* Upload button */}
        {editable && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-brand-border hover:border-brand-navy/30 flex flex-col items-center justify-center cursor-pointer transition-colors">
            <svg className="w-8 h-8 text-brand-text-muted/40 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-xs text-brand-text-muted">Add photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && onUpload?.(e.target.files)}
            />
          </label>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setLightboxIdx(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          {lightboxIdx > 0 && (
            <button
              className="absolute left-4 text-white/60 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(lightboxIdx - 1);
              }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <img
            src={photos[lightboxIdx].url}
            alt={photos[lightboxIdx].caption || ""}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightboxIdx < photos.length - 1 && (
            <button
              className="absolute right-4 text-white/60 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(lightboxIdx + 1);
              }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Caption */}
          {photos[lightboxIdx].caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-brand-bg/80 backdrop-blur px-4 py-2 rounded-lg text-sm text-brand-text">
              {photos[lightboxIdx].caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
