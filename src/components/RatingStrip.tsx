"use client";

export interface RatingStripAspect {
  label: string;
  icon: string;
  rating: number;
}

interface RatingStripProps {
  overall: number;
  aspects: RatingStripAspect[];
}

export function RatingStrip({ overall, aspects }: RatingStripProps) {
  return (
    <div className="flex items-center gap-3 bg-brand-surface rounded-lg px-3 py-2">
      {/* Overall score */}
      <div className="flex items-center gap-1.5 pr-3 border-r border-brand-border">
        <span className="text-xl font-serif font-bold text-brand-pin-past leading-none">
          {overall.toFixed(1)}
        </span>
        <span className="text-brand-pin-past text-sm">{"\u{2605}"}</span>
      </div>

      {/* Aspect mini bars */}
      <div className="flex-1 flex items-center gap-3">
        {aspects.map((a) => (
          <div key={a.label} className="flex items-center gap-1 min-w-0">
            <span className="text-xs">{a.icon}</span>
            <div className="w-10 h-1.5 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-pin-past rounded-full"
                style={{ width: `${(a.rating / 5) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-brand-text-secondary">
              {a.rating.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
