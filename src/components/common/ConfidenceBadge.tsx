import React from 'react';

interface ConfidenceBadgeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showBar?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  label = 'Boundary Confidence',
  size = 'md',
  showBar = true
}) => {
  const isHigh = score >= 90;
  const isMedium = score >= 70 && score < 90;
  const isLow = score < 70;

  const statusText = isHigh 
    ? 'High confidence' 
    : isMedium 
    ? 'Moderate confidence' 
    : 'Manual verification recommended';

  const badgeColor = isHigh 
    ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/60' 
    : isMedium 
    ? 'text-amber-400 bg-amber-950/50 border-amber-800/60' 
    : 'text-rose-400 bg-rose-950/50 border-rose-800/60';

  const barColor = isHigh 
    ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' 
    : isMedium 
    ? 'bg-gradient-to-r from-amber-600 to-amber-400' 
    : 'bg-gradient-to-r from-rose-600 to-rose-400';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="font-mono text-sm font-semibold text-slate-100">
          {score}%
        </span>
      </div>

      {showBar && (
        <div className="w-full bg-gis-darkest h-2.5 rounded-full overflow-hidden border border-gis-border/80 p-0.5 mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${badgeColor}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isHigh ? 'bg-emerald-400' : isMedium ? 'bg-amber-400' : 'bg-rose-400'}`} />
          {statusText}
        </span>
      </div>
    </div>
  );
};
